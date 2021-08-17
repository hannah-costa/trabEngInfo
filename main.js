import { TfIdf } from "./tf-idf.js";
import promptSync from "prompt-sync";
const prompt = promptSync();
const tfIdf = new TfIdf();

for (let i = 1; i <= 26; i++) {
  let corpus = tfIdf.umDocParaCorpus("docsTXT/doc"+i+".txt");
}

console.log("Digite sua busca:");
let pesquisa = prompt();

var busca = tfIdf.ordenaDocsPorBusca(pesquisa);
console.log(busca);