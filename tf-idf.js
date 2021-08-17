import { readFileSync } from "fs";
import { words } from "./stopWord.js";
/*
*  Classe para recuperação de informação de um
*  conjunto de documentos utilizando o modelo de 
*  espaço vetorial.
*/
class TfIdf {
  constructor() {
    this.corpus = [],
      this.tracker = []
  }

  /*
  *  Recebe o caminho para o documento especí-
  *  fico (INDIVIDUAL) e o converte em um array.
  */
  umDocParaCorpus(caminho) {
    try {
      let data = readFileSync(caminho, { encoding: 'utf8' });

      data = data.replace(/[^A-z\u00C0-\u00ff]+/g," ");
      data = data.trim();
      data = data.split(" ");
      data = data.filter((item) =>{
        if(words.indexOf(item) === -1) return item;
      });

      this.corpus.push(data);
      this.tracker.push({
        index: this.corpus.length - 1,
        documento: caminho
      })
    } catch (err) {
      throw err
    }

    return this.corpus;
  }

  /*
  *  Recebe os caminhos para os documentos em um array
  *  e o converte em um array.
  */
  grupoDocsParaCorpus(docs) {
    //let corpus = []
    for (let i = 0; i < docs.length; i++) {
      try {
        let data = readFileSync(docs[i], { encoding: 'utf8' });

        data = data.replace(/[^A-z\u00C0-\u00ff]+/g," ");
        data = data.trim();
        data = data.split(" ");
        data = data.filter((item) =>{
          if(words.indexOf(item) === -1) return item;
        });

        this.corpus.push(data);
        this.tracker.push({
          index: this.corpus.length - 1,
          documento: docs[i]
        })
      } catch (err) {
        throw err
      }
    }
    return this.corpus
  }

  /*
  *  Calcula TF (Term Frequency) de um termo recebido 
  *  num documento.
  */
  calculaTF(termo, doc) {
    let numOcorrencias = 0;
    for (let i = 0; i < doc.length; i++) {
      if (doc[i].toLowerCase() == termo.toLowerCase()) {
        numOcorrencias++;
      }
    }
    return (numOcorrencias * 1.0 / (doc.length + 1))
  }

  /*
  *  Calcula IDF (Inverse Document Frequency) de um 
  *  documento do corpus.
  */
  calculaIDF(termo) {
    if (this.corpus == null) return -1;
    let numDocs = 0;
    for (let i = 0; i < this.corpus.length; i++) {
      for (let j = 0; j < this.corpus[i].length; j++) {
        if (this.corpus[i][j] == termo.toLowerCase()) {
          numDocs++;
          break;
        }
      }
    }

    return Math.log((this.corpus.length) / (numDocs + 1)) + 1;
  }

  /*
  *  Cria um vetor com valores de IDF a partir da
  *  busca.
  */
  criaModeloIDF(busca) {
    busca = Array.isArray(busca) ? busca: busca.split(" ");
    if (this.corpus == null) return null;
    let model = [];
    for(let i = 0; i < busca.length; i++){
      model.push(this.calculaIDF(busca[i]));
    }
    return model;
  }

  /*
  *  Calcula o grau de similaridade entre dois vetores.
  *  Utiliza a magnitude dos vetores de busca e do documento.
  */
  calculaGrauSimilaridade(busca, doc) {
    busca = Array.isArray(busca) ? busca : busca.split(" ");
    let vetor_busca = this.criaModeloEV(busca, busca);
    let vetor_doc = this.criaModeloEV(busca, doc);
    let grauSimilaridade = 0;
    for (let i = 0; i < busca.length; i++) {
      let toAdd = vetor_busca[i] * vetor_doc[i];
      if (isNaN(toAdd)) {
        grauSimilaridade += 0;
      } else {
        grauSimilaridade += toAdd;
      }
    }
    let busca_mag = this.calculaMagnitude(vetor_busca);
    let doc_mag = this.calculaMagnitude(vetor_doc);
    let similaridade = 1.0 * grauSimilaridade / (busca_mag * doc_mag);

    return isNaN(similaridade) ? 0 : similaridade
  }

  /*
  *  Recebe um array com o(s) termos de busca do usuário
  *  e cria o modelo espaço vetorial, calculando a
  *  similaridade entre cada termo da busca e o documento.
  */
  criaModeloEV(busca, doc) {
    busca = Array.isArray(busca) ? busca : busca.split(" ");
    if (this.corpus == null) return null;
    let tf = [];
    let modeloEV = []
    for (let i = 0; i < busca.length; i++) {
      tf.push(this.calculaTF(busca[i], doc));
    }
    let idf = this.criaModeloIDF(busca);
    for (let j = 0; j < idf.length; j++) {
      modeloEV[j] = idf[j] * tf[j];
    }
    this.modeloEV = modeloEV;

    return modeloEV
  }

  /*
  *  Calcula a magnitude (comprimento) de um vetor.
  */
  calculaMagnitude(vetor) {
    let magnitude = 0
    for (let i = 0; i < vetor.length; i++) {
      if (isNaN(vetor[i])) {
        magnitude += 0;
      } else {
        magnitude += vetor[i] * vetor[i];
      }
    }
    return Math.sqrt(magnitude);
  }

  /*
  *  Ranqueia os documentos do corpus utilizando
  *  o grau de similaridade de cada um.
  *  OBS.: documento no vetor ordenacao faz ele
  *  retornar todo o conteúdo do documento!!!
  *  Verificar se é possível retirar o documento 
  *  da ordenacao.
  */
  ordenaDocsPorBusca(busca) {
    busca = busca.split(" ");
    let ordenacao = [];
    for (let i = 0; i < this.corpus.length; i++) {
      ordenacao.push({
        documento: this.corpus[i],
        grauSimilaridade: this.calculaGrauSimilaridade(busca, this.corpus[i]),
        index: i,
      });
    }
    ordenacao.sort((a, b) => {
      return b.grauSimilaridade - a.grauSimilaridade;
    })
    return ordenacao;
  }

  /*
  *  Retorna os indíces dos documentos ordenados.
  */
  indicesDocs() {
    return this.tracker;
  }

}

export { TfIdf };
