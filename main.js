import { TfIdf } from "./tf-idf.js";
import { words } from "./stopWord.js";
import promptSync from "prompt-sync";
const prompt = promptSync();
const tfIdf = new TfIdf();

//console.log("oq procuras?")
//let a = prompt();

//let test = a.replace(/[^A-z\u00C0-\u00ff]+/g," ");

//console.log("resposta: "+ test);
var corpus = tfIdf.umDocParaCorpus("toDo.txt");