const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('crimes.csv');
const outstream = new Stream();
const rl = readline.createInterface(instream, outstream);

let finalData = [];

const storeBugglary = {};
const storeRobbery = {};
const storeRobbery1 = {};
const storeProperty = {};
const storeVehicle = {};
const storeState = {};

rl.on('line', (line) => {
  const res = line.replace(/, /g, ' ');
  const temp = res.split(',', 20);
  const x = temp[17];
  const x1 = temp[6];

  if (line.search('BURGLARY') !== -1) {
    if (Object.prototype.hasOwnProperty.call(storeBugglary, x)) {
      storeBugglary[x] += 1;
    } else {
      storeBugglary[x] = 1;
    }
  }
  if (line.search('ROBBERY') !== -1) {
    if (Object.prototype.hasOwnProperty.call(storeRobbery, x)) {
      storeRobbery[x] += 1;
    } else {
      storeRobbery[x] = 1;
    }
    if (Object.prototype.hasOwnProperty.call(storeRobbery1, x1)) {
      storeRobbery1[x1] += 1;
    } else {
      storeRobbery1[x1] = 1;
    }
  }
  if (line.search('CRIMINAL DAMAGE') !== -1) {
    if (line.search('TO PROPERTY') !== -1) {
      if (Object.prototype.hasOwnProperty.call(storeProperty, x)) {
        storeProperty[x] += 1;
      } else {
        storeProperty[x] = 1;
      }
    }
    if (line.search('TO VEHICLE') !== -1) {
      if (Object.prototype.hasOwnProperty.call(storeVehicle, x)) {
        storeVehicle[x] += 1;
      } else {
        storeVehicle[x] = 1;
      }
    }
    if (line.search('TO STATE SUP PROP') !== -1) {
      if (Object.prototype.hasOwnProperty.call(storeState, x)) {
        storeState[x] += 1;
      } else {
        storeState[x] = 1;
      }
    }
  }
});

rl.on('close', () => {
  for (let i = 0, keys = Object.keys(storeRobbery), ii = keys.length; i < ii; i += 1) {
    const store = {
      Year: 0,
      Robbery: '',
      Burglary: '',
    };
    store.Year = keys[i];
    store.Robbery = storeRobbery[keys[i]];
    store.Burglary = storeBugglary[keys[i]];
    finalData.push(store);
  }

  let store = {};
  store.CrimeData = finalData;
  let wr = fs.createWriteStream('./json/lineChart.json');
  wr.write(JSON.stringify(store));
  finalData = [];

  for (let i = 0, keys = Object.keys(storeRobbery1), ii = keys.length; i < ii; i += 1) {
    store = {
      Type: '',
      Total: 0,
    };
    store.Type = keys[i];
    store.Total = storeRobbery1[keys[i]];
    finalData.push(store);
  }

  wr = fs.createWriteStream('./json/pieChart.json');
  wr.write(JSON.stringify(finalData));
  finalData = [];

  for (let i = 0, keys = Object.keys(storeProperty), ii = keys.length; i < ii; i += 1) {
    const rData = {
      Year: '',
      toProperty: 0,
      toVehicle: 0,
      toState: 0,
    };
    rData.Year = keys[i];
    rData.toProperty = storeProperty[keys[i]];
    rData.toVehicle = storeVehicle[keys[i]];
    rData.toState = storeState[keys[i]];
    finalData.push(rData);
  }

  wr = fs.createWriteStream('./json/barChart.json');
  wr.write(JSON.stringify(finalData));
});
