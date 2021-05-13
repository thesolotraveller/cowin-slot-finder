const request = require("request-promise");
const nodemailer = require("nodemailer");

require('dotenv').config()

function getUrl(pincode = 474002) {
  const d = new Date();
  const dateFormatted = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;

  const baseUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin";
  const fullUrl = `${baseUrl}?pincode=${pincode}&date=${dateFormatted}`;

  return fullUrl;
}

async function checkSlotAvailability() {
  try {
    const url = getUrl(474002);
    const {centers = []} = await request(url, { json: true });
    const availableCenters = centers
      .filter(
        (center) =>
          center.sessions[0].min_age_limit === 45 && center.sessions[0].available_capacity > 0
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
      console.log("\n**** Slots are available", availableCenters);
      await sendEmail(availableCenters);
      console.log("\n**** Slots available. You have just been notified via email. Trying again in 15 seconds...");
      setTimeout(checkSlotAvailability, 15000);
    } else {
      console.log("\n**** Slots are not available. Trying again in 3 seconds...");
      setTimeout(checkSlotAvailability, 3000);
    }
  } catch (e) {
    console.log(e, "\n**** Something is wrong. Tracker stopped");
    process.exit()
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

  console.log("Message sent: %s", info.messageId);
}

checkSlotAvailability();
