const request = require("request-promise");
const nodemailer = require("nodemailer");

require("dotenv").config();

const { logInfo, logSuccess, logError } = require("./utils/logger");

function getUrlByPincode(pincode = 474002) {
  const d = new Date();
  const dateFormatted = `17-${d.getMonth() + 1}-${d.getFullYear()}`;

  const baseUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin";
  const fullUrl = `${baseUrl}?pincode=${pincode}&date=${dateFormatted}`;

  logInfo(`Checking for vaccine slots in "${pincode}" for "${dateFormatted}"`);

  return fullUrl;
}

function getUrlByDistrictId(districId = 313) {
  const d = new Date();
  const dateFormatted = `17-${d.getMonth() + 1}-${d.getFullYear()}`;

  const baseUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict";
  const fullUrl = `${baseUrl}?district_id=${districId}&date=${dateFormatted}`;

  logInfo(`Checking for vaccine slots in district with id "${districId}" for "${dateFormatted}"`);

  return fullUrl;
}

async function checkSlotAvailability() {
  try {
    const url = getUrlByDistrictId(313);
    const { centers = [] } = await request(url, { json: true });
    const availableCenters = centers
      .filter((center) => center.sessions[0].min_age_limit === 18 && center.sessions[0].available_capacity > 0)
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
      await sendEmail(availableCenters);
      logSuccess("Slots available. You have just been notified via email. Trying again in 15 seconds...\n");
      setTimeout(checkSlotAvailability, 15000);
    } else {
      logInfo("Slots are not available. Trying again in 3 seconds...\n");
      setTimeout(checkSlotAvailability, 3000);
    }
  } catch (e) {
    logError(e, "\nSomething is wrong. Tracker stopped\n");
    setTimeout(checkSlotAvailability, 3000);
  }
}

async function sendEmail(msg) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const receivers = ["09mohit1994@gmail.com", "readermohini@gmail.com"];

  let info = await transporter.sendMail({
    from: '"Mohit from Sahay" <mohit@sahay.club>',
    to: `${receivers.join(",")}`,
    subject: "CoWin vaccinces now available! Book your slot ! Hurry up !",
    html: `<b>List of vaccination centers</b><br/><p>${JSON.stringify(msg)}</p>`,
  });

  logInfo("\nMessage sent: %s", info.messageId);
}

checkSlotAvailability();
