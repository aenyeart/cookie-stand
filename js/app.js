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
const salesSheet = document.getElementById("sales-sheet"); // PARENT initialized to global

let hourlyGrandTotal = [];
let dailyGrandTotal = 0;

function Store(location, minCust, maxCust, avgSoldPer) { // Construct FUNCTION

  this.location = location,
    this.avgSoldPer = avgSoldPer,
    this.hourlySales = [],
    this.minCust = minCust,
    this.maxCust = maxCust,
    this.storeDailyTotal = 0,

    this.calcHourlySales();
  this.calcTotalSales();
  this.render();

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
    this.storeDailyTotal += this.hourlySales[i];
  }
}

Store.prototype.render = function () {
  const tableRow = document.createElement("tr"); // create ROW
  salesSheet.appendChild(tableRow);
  tableRow.setAttribute("id", `${this.location}`);

  const rowHeader = document.createElement("th"); // create row HEADER
  rowHeader.setAttribute("scope", "row");
  tableRow.appendChild(rowHeader);
  rowHeader.textContent = this.location;

  for (let i = 0; i <= storeHours.length; i++) { // create CELLS
    const tableCell = document.createElement("td");
    tableRow.appendChild(tableCell);

    if (i === storeHours.length) {
      tableCell.textContent = this.storeDailyTotal; // populates last cell with this stand's total sales today
    } else tableCell.textContent = this.hourlySales[i];
    if (hourlyGrandTotal[i] === undefined) {
      hourlyGrandTotal[i] = 0;
    } 
    hourlyGrandTotal[i] += this.hourlySales[i];
  }
}

function tableHeader() {
  const tableRow = document.createElement("tr"); // create ROW
  salesSheet.appendChild(tableRow);
  tableRow.setAttribute("id", "sales-sheet-header");

  for (let i = -1; i <= storeHours.length; i++) {

    const colHeader = document.createElement("th"); // create row HEADER
    tableRow.appendChild(colHeader);
    colHeader.setAttribute("scope", "row");
    if (i === -1) continue; // Leaves upper-left cell empty
    if (i === storeHours.length) colHeader.textContent = "Daily Totals"; 
    else colHeader.textContent = storeHours[i]; // Adds hours to header cells
  }
}
/**
 * Ideas:
 * - have tableFooter take `isNew` argument (true/false)
 * - assign class or id to row or elements to access their text content directly 
 * - set class (using location name) on each row in conjunction with .removeChild
**/
function tableFooter() { // create footer ROW OF TOTALS
  const tableRow = document.createElement("tr"); // create ROW
  salesSheet.appendChild(tableRow);
  tableRow.setAttribute("id", "footer-row");

  const rowHeader = document.createElement("th"); // create row HEADER
  tableRow.appendChild(rowHeader);
  rowHeader.setAttribute("scope", "row");
  rowHeader.textContent = "Totals";

  for (let i = 0; i <= storeHours.length; i++) { // create CELLS
    const tableCell = document.createElement("th");
    tableRow.appendChild(tableCell);
    if (i < storeHours.length) dailyGrandTotal += hourlyGrandTotal[i]; // prevents adding 'NaN' to dailyGrandTotal
    if (i === storeHours.length) {
      tableCell.textContent = dailyGrandTotal; // All-store daily total
    } else tableCell.textContent = hourlyGrandTotal[i];
  }
}

function addNewStore(event) {
  event.preventDefault();
  let footerRow = document.getElementById('footer-row');
  salesSheet.removeChild(footerRow);
  let newLoc = event.target[1].value;
  let newMinCust = parseInt(event.target[2].value);
  let newMaxCust = parseInt(event.target[3].value);
  let newAvgSoldPer = parseFloat(event.target[4].value);
  new Store(newLoc, newMinCust, newMaxCust, newAvgSoldPer);

  dailyGrandTotal = 0;
  tableFooter();
}

tableHeader();
const seattle = new Store("Seattle", 23, 65, 6.3);
const tokyo = new Store("Tokyo", 3, 24, 1.2);
const dubai = new Store("Dubai", 11, 38, 3.7);
const paris = new Store("Paris", 20, 38, 2.3);
const lima = new Store("Lima", 2, 16, 4.6);
tableFooter();

const newStoreForm = document.getElementById("new-store-form");
newStoreForm.addEventListener("submit", addNewStore);