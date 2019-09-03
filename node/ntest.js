
// Import bin, and scrap "use strict" to avoid error (hacky, but it works)
var fs = require("fs");
var source = fs.readFileSync("../bin.js")+"";
source = source.replace("use strict","");
eval(source);

// Import rom, modify the binary, export
var bin = fs.readFileSync("../../ff2_10CLEAN.smc");
modifyBin(bin);
fs.writeFile("../../ff2_10.smc",bin,function(){});
