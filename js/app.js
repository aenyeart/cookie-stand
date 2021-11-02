'use strict'

const storeHours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm"
];

function storeBuilder(location, minCust, maxCust, avgSoldPer) {
  const storeObj = { //
    location,
    minCust,
    maxCust,
    avgSoldPer,
    hourlySales: [],
    totalSales: 0
  };

  calcHourlySales(storeObj);
  calcTotalSales(storeObj);
  buildSalesSheet(storeObj);
} // END STOREBUILDER FUNCTION -- called at bottom of app.js

function calcTotalSales(storeObj) {
  for (let i = 0; i < storeObj.hourlySales.length; i++) {
    storeObj.totalSales += storeObj.hourlySales[i];
  }
}

function calcHourlySales(storeObj) {
  for (let i = 0; i < storeHours.length; i++) {
    let hourlyCust = randoNum(storeObj.minCust, storeObj.maxCust);
    storeObj.hourlySales[i] = Math.round(storeObj.avgSoldPer * hourlyCust);
  }
}

function randoNum(min, max) {
  let range = max - min + 1;
  return (Math.floor(Math.random() * range) + min);
}

function buildSalesSheet(storeObj) {
  const salesSheet = document.getElementById("sales-sheet");

  const location = document.createElement("h2");
  salesSheet.appendChild(location);
  location.textContent = storeObj.location;
  
  const listOfSales = document.createElement("ul");
  salesSheet.appendChild(listOfSales);

  for (let i = 0; i < storeHours.length; i++) {
    const listElem = document.createElement("li");
    let salesEntry = `${storeHours[i]}: ${storeObj.hourlySales[i]} cookies`;
    listOfSales.appendChild(listElem);
    listElem.textContent = salesEntry;
  }
  const totalCookies = document.createElement("li");
  listOfSales.appendChild(totalCookies);
  totalCookies.textContent = `Total: ${storeObj.totalSales} cookies`;
}

storeBuilder("Seattle", 23, 65, 6.3);
storeBuilder("Tokyo", 3, 24, 1.2);
storeBuilder("Dubai", 11, 38, 3.7);
storeBuilder("Paris", 20, 38, 2.3);
storeBuilder("Lima", 2, 16, 4.6);
