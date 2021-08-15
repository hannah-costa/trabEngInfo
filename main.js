const readline = require('readline');
let a = "";
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 
rl.setPrompt(`oq tu quer? `);
rl.prompt();
rl.on('line', (answer) => {
    a = answer;
    rl.close();
});

console.log("reposta: " + a);