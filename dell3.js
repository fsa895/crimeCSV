
// Create a pie-chart aggregate it over all the years for various types of Robbery.

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('crimes.csv');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
     
storeRobbery = {};

rl.on('line', function(line) {
    var res = line.replace(/, /g, " "); 
    var temp = res.split(",", 20);
    x = temp[17];
    
    if (line.search("ROBBERY")!=-1){ 
        if(storeRobbery.hasOwnProperty(x))
            {    storeRobbery[x] += 1;  } 
            else
            {    storeRobbery[x] = 1;   }                                              
        }
        
    
});

rl.on('close', function() {
    finalData = {"Robbery":{}};
    finalData.Robbery = storeRobbery;

    var wr = fs.createWriteStream("all2.json");
    wr.write(JSON.stringify(finalData));

});
