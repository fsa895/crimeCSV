// Create a pie-chart aggregate it over all the years for various types of Robbery.

const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('crimes.csv');
const outstream = new Stream();
const rl = readline.createInterface(instream, outstream);

const storeRobbery = {};
const finalData = [];

rl.on('line', (line) => {
  const res = line.replace(/, /g, ' ');
  const temp = res.split(',', 20);
  const x = temp[6];

  if (line.search('ROBBERY') !== -1) {
    if (Object.prototype.hasOwnProperty.call(storeRobbery, x)) {
      storeRobbery[x] += 1;
    } else {
      storeRobbery[x] = 1;
    }
  }
});

rl.on('close', () => {
  for (let i = 0, keys = Object.keys(storeRobbery), ii = keys.length; i < ii; i += 1) {
    const store = {
      Type: '',
      Total: 0,
    };
    store.Type = keys[i];
    store.Total = storeRobbery[keys[i]];
    finalData.push(store);
  }
  const wr = fs.createWriteStream('all3.json');
  wr.write(JSON.stringify(finalData));
});
