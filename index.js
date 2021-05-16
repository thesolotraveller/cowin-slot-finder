const readline = require("readline");

const { logInfo } = require("./services/logger");
const { checkSlotAvailability } = require("./services/slotAvailability");

const citiesList = require("./data/cities.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

global.subscriptionConfigs = new Map();

const promptFor = (questionType) => {
  switch (questionType) {
    case "City":
      rl.question("\nWhich district you are in, enter the name? (For example: Gwalior)\n", (city) => {
        if (!citiesList[city]) {
          logInfo("City not found. Please enter the exact name as on Cowin website");
          promptFor("City");
        } else {
          subscriptionConfigs.CITY = city;
          promptFor("AgeGroup");
        }
      });

    case "AgeGroup":
      rl.question("\nYou want to monitor for 45+ or for 18+, enter either 18 or 45?\n", (ageGroup) => {
        if (ageGroup !== "45" && ageGroup !== "18") {
          logInfo("Please enter the correct age group. Either 18 or 45");
          promptFor("AgeGroup");
        } else {
          subscriptionConfigs.AGE_GROUP = ageGroup;
          promptFor("DateOffset");
        }
      });

    case "DateOffset":
      rl.question(
        "\nEnter 0 if you want to monitor for today, enter 1 for tomorrow, 2 for day after tomorrow. Values accepted from 0-6\n",
        (dateOffset) => {
          if (dateOffset < 0 || dateOffset > 6) {
            logInfo("Please enter a value between 0 and 6 only");
            promptFor("DateOffset");
          } else {
            subscriptionConfigs.DATE_OFFSET = dateOffset;
            promptFor("EmailRecipients");
          }
        }
      );

    case "EmailRecipients":
      rl.question(
        "\nEnter comma(,) seperated list of email ids which need subscription? Press ENTER to skip this step.\n",
        (emails) => {
          subscriptionConfigs.EMAILS = emails.split(",").map((email) => email.trim());
          promptFor("SMTPServer");
        }
      );

    case "SMTPServer":
      rl.question(
        "\nEnter the concerned SMTP server (example: smtpout.secureserver.net)? Press ENTER to skip this step.\n",
        (smtpServer) => {
          subscriptionConfigs.SMTP_SERVER = smtpServer;
          promptFor("UserEmail");
        }
      );

    case "UserEmail":
      rl.question(
        "\nEnter an email from which you will be sending the email (example: test@gmail.com)? Press ENTER to skip this step.\n",
        (userEmail) => {
          subscriptionConfigs.USER_EMAIL = userEmail;
          promptFor("UserPassword");
        }
      );

    case "UserPassword":
      rl.question(
        "\nEnter to for email password (example: mysafepassword)? Press ENTER to skip this step.\n",
        (userPassword) => {
          subscriptionConfigs.USER_PASSWORD = userPassword;
          rl.close();
          const {EMAILS, SMTP_SERVER, USER_EMAIL, USER_PASSWORD} = subscriptionConfigs;
          if (!EMAILS || !SMTP_SERVER || !USER_EMAIL || !USER_PASSWORD) {
            logInfo("Keep an eye on notifations of this computer. You will not be notified by email as you have not configured any.")
          }
          console.log("\n\n ****  Monitoring started successfully ****\n\n");
          checkSlotAvailability(subscriptionConfigs.CITY, subscriptionConfigs.DATE_OFFSET);
        }
      );
  }
};

// starting the interactive mode
promptFor("City");
