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


let hourlyGrandTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Prevents 'NaN' bug in row of totals
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

  const rowHeader = document.createElement("th"); // create row HEADER
  rowHeader.setAttribute("scope", "row");
  tableRow.appendChild(rowHeader);
  rowHeader.textContent = this.location;

  for (let i = 0; i <= storeHours.length; i++) { // create CELLS
    const tableCell = document.createElement("td");
    tableRow.appendChild(tableCell);

    if (i === storeHours.length) {
      tableCell.textContent = this.storeDailyTotal; // populates last cell with this stand's total sales for today
    } else tableCell.textContent = this.hourlySales[i];
    // console.log(`this.hourlySales[${i}] is ${this.hourlySales[i]}`);
    hourlyGrandTotal[i] += this.hourlySales[i];
    // console.log(`current hourlyGrandTotal[${i}] is ${hourlyGrandTotal[i]}`)
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

function tableFooter() { // create footer ROW OF TOTALS
  const tableRow = document.createElement("tr"); // create ROW
  salesSheet.appendChild(tableRow);

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
tableHeader();
const seattle = new Store("Seattle", 23, 65, 6.3);
const tokyo = new Store("Tokyo", 3, 24, 1.2);
const dubai = new Store("Dubai", 11, 38, 3.7);
const paris = new Store("Paris", 20, 38, 2.3);
const lima = new Store("Lima", 2, 16, 4.6);
tableFooter();