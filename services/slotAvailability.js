const request = require("request-promise");

const { logInfo, logSuccess, logError } = require("./logger");
const { getUrlByDistrictName } = require("./url");
const { notify } = require("./notifier");

async function checkSlotAvailability(city, dateOffsetFromToday = 0) {
  try {
    const url = getUrlByDistrictName(city, dateOffsetFromToday);
    const { centers = [] } = await request(url, { json: true });
    const availableCenters = centers
      .filter(
        (center) =>
          center.sessions[0].min_age_limit === process.env.AGE_GROUP &&
          center.sessions[0].available_capacity > 0
      )
      .map((center) => {
        return {
          name: center.name,
          address: center.address,
          details: {
            capacity: center.sessions[0].available_capacity,
            slots: center.sessions[0].slots.join("  &  "),
          },
        };
      });

    if (availableCenters.length > 0) {
      logSuccess("\nSlots are available", availableCenters);
      await notify(availableCenters);
      logSuccess("Slots available. You have just been notified via email. Trying again in 60 seconds...\n");
      setTimeout(() => checkSlotAvailability(city, dateOffsetFromToday), 60000);
    } else {
      logInfo("Slots are not available. Trying again in 3 seconds...\n");
      setTimeout(() => checkSlotAvailability(city, dateOffsetFromToday), 3000);
    }
  } catch (e) {
    logError(e, "\nSomething is wrong. Tracker stopped\n");
    setTimeout(() => checkSlotAvailability(city, dateOffsetFromToday), 3000);
  }
}

module.exports = {
  checkSlotAvailability,
};
