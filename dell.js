
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('crimes.csv');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

var finalData = [];
                     
storeBugglary = {};
storeRobbery = {};

rl.on('line', function(line) {
    var res = line.replace(/, /g, " "); 
    var temp = res.split(",", 20);
    x = temp[17];
    
    if (line.search("BURGLARY")!=-1){ 
        if(storeBugglary.hasOwnProperty(x))
        {    storeBugglary[x] += 1;  } 
        else
        {    storeBugglary[x] = 1;   }                                              
    }
    if (line.search("ROBBERY")!=-1){ 
        if(storeRobbery.hasOwnProperty(x))
        {    storeRobbery[x] += 1;  } 
        else
        {    storeRobbery[x] = 1;   }                                              
    }

});

rl.on('close', function() {
    for(var prop in storeRobbery) {
        store = {"Year":0, "Robbery":"", "Burglary":""};
        store.Year = Number(prop);
        store.Robbery = storeRobbery[prop];
        store.Burglary = storeBugglary[prop];
        finalData.push(store);
    }
    var store = {};
    store['CrimeData'] = finalData;
    var wr = fs.createWriteStream("all.json");
    wr.write(JSON.stringify(store));

});
