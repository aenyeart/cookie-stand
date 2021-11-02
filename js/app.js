'use strict'

function calcTotalSales() {
  
}

const storeLocation = {
  storeHours: 14,
  minCust: 23,
  maxCust: 65,
  avgSoldPer: 6.3,
  hourlySales: [],
  calcHourlySales: function() {
    for (let i = 0; i < this.storeHours; i++) {
      let hourlyCust = randoNum(this.minCust, this.maxCust);
      this.hourlySales[i] = Math.round(this.avgSoldPer * hourlyCust);
    }
  },
};
storeLocation.calcHourlySales();

function randoNum(min, max) {
  let range = max - min + 1;
  return (Math.floor(Math.random() * range) + min);
}