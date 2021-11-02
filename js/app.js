'use strict'

function calcTotalSales(storeObj) {
  for (let i = 0; i < storeObj.hourlySales.length; i++) {
    storeObj.totalSales += storeObj.hourlySales[i];
  }
   
}

function calcHourlySales(storeObj) {
  for (let i = 0; i < storeObj.storeHours; i++) {
    let hourlyCust = randoNum(storeObj.minCust, storeObj.maxCust);
    storeObj.hourlySales[i] = Math.round(storeObj.avgSoldPer * hourlyCust);
  }
}

const storeLocation = { //really wish
  storeHours: 14,
  minCust: 23,
  maxCust: 65,
  avgSoldPer: 6.3,
  hourlySales: [],
  totalSales: 0
};
calcHourlySales(storeLocation);
calcTotalSales(storeLocation);

function randoNum(min, max) {
  let range = max - min + 1;
  return (Math.floor(Math.random() * range) + min);
}