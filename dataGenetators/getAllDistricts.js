const request = require("request-promise");
const fs = require("fs");

require("dotenv").config();

const { logInfo, logSuccess, logError } = require("../utils/logger");

async function getAllCitiesInAllStates() {
  try {
    const citiesForStatePromises = new Array();
    for (let i=1; i<=36; i++) {
        const getStateCitiesUrl = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${i}`;
        const citiesInStatePromise = request(getStateCitiesUrl, {json: true});
        citiesForStatePromises.push(citiesInStatePromise);
    }

    const allCitiesResponse = await Promise.all(citiesForStatePromises);
    const allCities = new Map();

    allCitiesResponse.forEach(cityList => {
        cityList.districts.forEach(city => allCities[city.district_name] = city.district_id)
    });
    logSuccess(`Data for ${Object.keys(allCities).length} cities fetched`);

    logInfo("Writing cities data to ../data/cities.json")
    fs.writeFileSync("../data/cities.json", JSON.stringify(allCities));
    logSuccess("Cities Data written to data/cities.json")
  } catch (e) {
    logError(e, "\nError fetching cities list\n");
  }
}

getAllCitiesInAllStates();
