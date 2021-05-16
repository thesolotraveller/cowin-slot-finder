require("dotenv").config();

const { checkSlotAvailability } = require("./services/slotAvailability");

// const readline = require("readline");
// const { execSync } = require("child_process");

// const { logInfo } = require("./services/logger");
// const citiesList = require("./data/cities.json");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const ask = (questionType) => {
//   switch (questionType) {
//     case "City":
//       rl.question(
//         "\nWhich district you are in, enter the name? (For example: Gwalior)\n",
//         (city) => {
//           if (!citiesList[city]) {
//             logInfo(
//               "City not found. Please enter the exact name as on Cowin website"
//             );
//             ask("City");
//           } else {
//             execSync(`export CITY=${city}`);
//             ask("AgeGroup");
//           }
//         }
//       );

//     case "AgeGroup":
//       rl.question(
//         "\nYou want to monitor for 45+ or for 18+, enter either 18 or 45?\n",
//         (ageGroup) => {
//           if (ageGroup !== "45" && ageGroup !== "18") {
//             logInfo("Please enter the correct age group. Either 18 or 45");
//             ask("AgeGroup");
//           } else {
//             execSync(`export AGE_GROUP=${ageGroup}`);
//             ask("DateOffset");
//           }
//         }
//       );

//     case "DateOffset":
//       rl.question(
//         "\nEnter 0 if you want to monitor for today, enter 1 for tomorrow, 2 for day after tomorrow. Values accepted from 0-6\n",
//         (dateOffset) => {
//           if (dateOffset < 0 || dateOffset > 6) {
//             logInfo("Please enter a value between 0 and 6 only");
//             ask("DateOffset");
//           } else {
//             execSync(`export DATE_OFFSET=${parseInt(dateOffset)}`);
//             checkSlotAvailability(process.env.CITY, process.env.DATE_OFFSET);
//           }
//         }
//       );
//   }
// };

// ask("City");

checkSlotAvailability("Gwalior", 0);
