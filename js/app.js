'use strict'

const storeLocation = {
  storeHours: 14,
  minCust: 0,
  maxCust: 0,
  avgCookiesPerSale: 0,
  hourlySales: function() {
    let salesArray = [];
    for (let i = 0; i < this.storeHours; i++) {
      let hourlyCust = randomNum(this.minCust, this.maxCust);
      console.log(hourlyCust);
    }
  return salesArray;
  },

};
storeLocation.hourlySales();

function randomNum(min, max) {
  let range = max - min + 1;
  return (Math.floor(Math.random() * range) + min);
}

function calcHourlySales(storeLocation) {
  let salesArray = [];
  

    for (let i = 0; i < this.storeHours; i++) {
      let hourlyCust = randomNum(this.minCust, this.maxCust);

    }


  return salesArray;
}

function calcTotalSales() {

}