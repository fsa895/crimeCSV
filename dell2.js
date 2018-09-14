const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('crimes.csv');
const outstream = new Stream();
const rl = readline.createInterface(instream, outstream);

const finalData = [];

const storeProperty = {};
const storeVehicle = {};
const storeState = {};

rl.on('line', (line) => {
  const res = line.replace(/, /g, ' ');
  const temp = res.split(',', 20);
  const x = temp[17];

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

  const wr = fs.createWriteStream('all2.json');
  wr.write(JSON.stringify(finalData));
});
