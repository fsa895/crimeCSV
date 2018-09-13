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
      if (storeProperty.hasOwnProperty(x)) {
        storeProperty[x] += 1;
      } else {
        storeProperty[x] = 1;
      }
    }
    if (line.search('TO VEHICLE') !== -1) {
      if (storeVehicle.hasOwnProperty(x)) {
        storeVehicle[x] += 1;
      } else {
        storeVehicle[x] = 1;
      }
    }
    if (line.search('TO STATE SUP PROP') !== -1) {
      if (storeState.hasOwnProperty(x)) {
        storeState[x] += 1;
      } else {
        storeState[x] = 1;
      }
    }
  }
});

rl.on('close', () => {
  for (const prop in storeProperty) {
    const rData = {
      Year: '',
      toProperty: 0,
      toVehicle: 0,
      toState: 0,
    };
    rData.Year = prop;
    rData.toProperty = storeProperty[prop];
    rData.toVehicle = storeVehicle[prop];
    rData.toState = storeState[prop];
    finalData.push(rData);
  }
  const wr = fs.createWriteStream('all2.json');
  wr.write(JSON.stringify(finalData));
});
