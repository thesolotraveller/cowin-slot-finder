const notifier = require("node-notifier");
const { logError } = require("./logger");
const { sendEmail } = require("./email");

async function notify(vaccinationCenters) {
  const { SMTP_SERVER, USER_EMAIL, USER_PASSWORD } = global.subscriptionConfigs;

  if (!SMTP_SERVER || !USER_EMAIL || !USER_PASSWORD) {
    logError("Email notifier not configured");
  } else {
    // send an email to notify user
    await sendEmail(vaccinationCenters);
  }

  notifier.notify({
    message:
      "Vaccination slots available now in your city | Hurry up and book a slot",
    title: "Vaccines Available",
  });
}

module.exports = {
  notify,
};
