const nodemailer = require("nodemailer");
const { logSuccess, logError } = require("./logger");

async function sendEmail(msg) {
  let transporter = nodemailer.createTransport({
    host: global.subscriptionConfigs.SMTP_SERVER,
    port: 587,
    secure: false,
    auth: {
      user: global.subscriptionConfigs.USER_EMAIL,
      pass: global.subscriptionConfigs.USER_PASSWORD,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"Mohit from Sahay" <mohit@sahay.club>',
      to: `${global.subscriptionConfigs.EMAILS.join(",")}`,
      subject: "Cowin vaccines now available | Book your slot",
      html: `<b>List of vaccination centers</b><br/><p>${JSON.stringify(msg)}</p>`,
    });

    logSuccess(info);
  } catch (error) {
    logError("Error in sending email", error);
    logError("Please restart this tracker with proper email configs (SMTPServer, UserEmail and Password)", error);
  }
}

module.exports = {
  sendEmail,
};
