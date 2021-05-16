const citiesList = require("../data/cities.json");
const { logInfo } = require("./logger");

function getUrlByPincode(pincode = 474002) {
  const d = new Date();
  const dateFormatted = `17-${d.getMonth() + 1}-${d.getFullYear()}`;

  const baseUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin";
  const fullUrl = `${baseUrl}?pincode=${pincode}&date=${dateFormatted}`;

  logInfo(`Checking for vaccine slots in "${pincode}" for "${dateFormatted}"`);

  return fullUrl;
}

function getUrlByDistrictName(districtName = "Gwalior", daysOffset = 0) {
  const d = new Date();
  const dateFormatted = `${d.getDate() + daysOffset}-${d.getMonth() + 1}-${d.getFullYear()}`;
  const districtId = citiesList[districtName];

  const baseUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict";
  const fullUrl = `${baseUrl}?district_id=${districtId}&date=${dateFormatted}`;

  logInfo(`Checking for vaccine slots in "${districtName}" for "${dateFormatted}"`);

  return fullUrl;
}

module.exports = {
  getUrlByDistrictName,
  getUrlByPincode
}