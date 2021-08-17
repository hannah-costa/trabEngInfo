import { TfIdf } from "./tf-idf.js";
import promptSync from "prompt-sync";
const prompt = promptSync();
const tfIdf = new TfIdf();

let corpus = tfIdf.grupoDocsParaCorpus(["docsTXT/A nova Califórnia.txt","docsTXT/A Sombra do Romariz.txt","docsTXT/Carta de um defunto rico.txt",
                    "docsTXT/Eficiência militar.txt","docsTXT/Fim de um sonho.txt","docsTXT/Foi buscar lã....txt",
                    "docsTXT/Lourenço, o Magnífico.txt","docsTXT/Manel Capineiro.txt","docsTXT/Milagre do Natal.txt",
                    "docsTXT/O falso d. Henrique V.txt","docsTXT/O filho de Gabriela.txt","docsTXT/O homem que sabia javanês.txt",
                    "docsTXT/O jornalista.txt","docsTXT/O meu carnaval.txt","docsTXT/O número da sepultura.txt",
                    "docsTXT/O pecado.txt","docsTXT/O tal negócio de prestações.txt","docsTXT/O único assassinato de Cazuza.txt",
                    "docsTXT/Quase ela deu o sim; mas....txt","docsTXT/Três gênios de secretaria.txt","docsTXT/Um especialista.txt",
                    "docsTXT/Um que vendeu a sua alma.txt"]);

console.log("Digite sua busca:");
let pesquisa = prompt();

var busca = tfIdf.ordenaDocsPorBusca(pesquisa);
console.log(busca);