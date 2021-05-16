require("dotenv").config();

const { checkSlotAvailability } = require("./services/slotAvailability");

checkSlotAvailability("Gwalior", 1);
