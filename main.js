const prompt = require('prompt-sync')({sigint: true});

console.log("oq procuras?")
const a = prompt();

let test = a.replace(/[^A-z\u00C0-\u00ff]+/g," ");

console.log("resposta: "+ test);