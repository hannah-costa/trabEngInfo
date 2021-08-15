var fs = require("fs");
let words = [];
try {  
    var data = fs.readFileSync('stopwords.txt', 'utf8');
    words = data.replace(/[ \t]/g, "").split("\n");
} catch(e) {
    console.log('Error:', e.stack);
}