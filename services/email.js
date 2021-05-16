const nodemailer = require("nodemailer");
const { logSuccess, logError } = require("./logger");
const subscribers = require("../data/subscribers.json");

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

  try {
    let info = await transporter.sendMail({
      from: '"Mohit from Sahay" <mohit@sahay.club>',
      to: `${subscribers.list.join(",")}`,
      subject: "CoWin vaccinces now available! Book your slot ! Hurry up !",
      html: `<b>List of vaccination centers</b><br/><p>${JSON.stringify(msg)}</p>`,
    });
  
    logSuccess("\nMessage sent: %s", info.messageId);
  } catch (error) {
    logError(error);
  }
}

module.exports = {
  sendEmail
}