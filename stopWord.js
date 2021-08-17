import { readFileSync } from "fs";

let words = [];
try {  
    var data = readFileSync('stopwords.txt', 'utf8');
    words = data.replace(/[ \t]/g, "").split("\n");
} catch(e) {
    console.log('Error:', e.stack);
}

export {words};