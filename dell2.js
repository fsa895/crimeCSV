
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('crimes.csv');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

// var finalData = [];
                     
storeProperty = {};
storeVehicle = {};
storeState = {};

rl.on('line', function(line) {
    var res = line.replace(/, /g, " "); 
    var temp = res.split(",", 20);
    x = temp[17];
    
    if (line.search("CRIMINAL DAMAGE")!=-1){ 
        if(line.search("TO PROPERTY")!=-1){
            if(storeProperty.hasOwnProperty(x))
            {    storeProperty[x] += 1;  } 
            else
            {    storeProperty[x] = 1;   }                                              
        }
        if(line.search("TO VEHICLE")!=-1){
            if(storeVehicle.hasOwnProperty(x))
            {    storeVehicle[x] += 1;  } 
            else
            {    storeVehicle[x] = 1;   }                                              
        }
        if(line.search("TO STATE SUP PROP")!=-1){
            if(storeState.hasOwnProperty(x))
            {    storeState[x] += 1;  } 
            else
            {    storeState[x] = 1;   }                                              
        }
    }
    
});

rl.on('close', function() {
    finalData = {"toProperty":{}, "toVehicle":{}, "toState":{} };
    finalData.toProperty = storeProperty;
    finalData.toVehicle = storeVehicle;
    finalData.toState = storeState;
    

    var wr = fs.createWriteStream("all1.json");
    wr.write(JSON.stringify(finalData));

});
