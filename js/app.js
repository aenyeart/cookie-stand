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

function Store(location, minCust, maxCust, avgSoldPer) { // Construct FUNCTION

  this.location = location, 
  this.minCust = minCust,
  this.maxCust = maxCust,
  this.avgSoldPer = avgSoldPer,
  this.hourlySales = [],
  this.totalSales = 0,

  this.calcHourlySales();
  this.calcTotalSales();
  this.buildSalesSheet();

} // END STOREBUILDER FUNCTION -- called at bottom of app.js

function randoNum(min, max) {
  let range = max - min + 1;
  return (Math.floor(Math.random() * range) + min);
}

Store.prototype.calcHourlySales = function () {
  for (let i = 0; i < storeHours.length; i++) {
    let hourlyCust = randoNum(this.minCust, this.maxCust);
    this.hourlySales[i] = Math.round(this.avgSoldPer * hourlyCust);
  }
}
Store.prototype.calcTotalSales = function () {
  for (let i = 0; i < this.hourlySales.length; i++) {
    this.totalSales += this.hourlySales[i];
  }
}

Store.prototype.buildSalesSheet = function () {
  const salesSheet = document.getElementById("sales-sheet"); // Grab PARENT 

  const location = document.createElement("h2"); // Create HEADING
  salesSheet.appendChild(location);
  location.textContent = this.location;

  const listOfSales = document.createElement("ul"); // Create LIST
  salesSheet.appendChild(listOfSales);

  for (let i = 0; i < storeHours.length; i++) { // Create LIST ITEMS
    const listElem = document.createElement("li");
    let salesEntry = `${storeHours[i]}: ${this.hourlySales[i]} cookies`;
    listOfSales.appendChild(listElem);
    listElem.textContent = salesEntry;
  }
  const totalCookies = document.createElement("li"); //  TOTAL
  listOfSales.appendChild(totalCookies);
  totalCookies.textContent = `Total: ${this.totalSales} cookies`;
}

const seattle = new Store("Seattle", 23, 65, 6.3);
const tokyo = new Store("Tokyo", 3, 24, 1.2);
const dubai = new Store("Dubai", 11, 38, 3.7);
const paris = new Store("Paris", 20, 38, 2.3);
const lima = new Store("Lima", 2, 16, 4.6);