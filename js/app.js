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
]

const salesSheet = document.getElementById("sales-sheet");


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

const storeObj = { //
  minCust: 23,
  maxCust: 65,
  avgSoldPer: 6.3,
  hourlySales: [],
  totalSales: 0
};

calcHourlySales(storeObj);
calcTotalSales(storeObj);
buildSalesSheet(storeObj);

function randoNum(min, max) {
  let range = max - min + 1;
  return (Math.floor(Math.random() * range) + min);
}

function buildSalesSheet() {
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