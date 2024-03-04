const fs = require('fs');
const path = require('path');

// Carregando arquivo .json para uma lista
const caminhoArquivo = 'data.json';
function carregarArquivoJSON(caminho) {
  try {
    const conteudoArquivo = fs.readFileSync(caminho, 'utf-8');
    const listaObjetos = JSON.parse(conteudoArquivo);
    return listaObjetos;
  } catch (erro) {
    console.error('Erro ao carregar o arquivo JSON:', erro);
    return null;
  }
}
const listaObjetos = carregarArquivoJSON(caminhoArquivo);

////////////////////////////////////// EXERCICIOS //////////////////////////////////////

// Função para exibir lista de PINI  "Residencial"
function obterPINIsResidenciais(lista) {
  return lista.filter(objeto => objeto.Nome.includes("Residencial"));
}
const pinisResidenciais = obterPINIsResidenciais(listaObjetos);
salvarListaEmNovaPasta(pinisResidenciais, 'pinisResidenciais.json', './resultado');


// Função para excluir tosdos os PINI comerciais de uma lista
function excluirPINIsComerciais(lista) {
  const pinisSemComerciais = lista.filter(objeto => !objeto.Nome.includes("Comercial"));

  return pinisSemComerciais;
}
const pinisSemComerciais = excluirPINIsComerciais(listaObjetos);
salvarListaEmNovaPasta(pinisSemComerciais, 'pinisSemComerciais.json', './resultado');

// Função para obter os IDs dos PINIs com valor inferior a 2000.00
function obterIDsPINIsComValorInferior(lista, valorLimite) {
  const pinisComValorInferior = lista.filter(objeto => objeto.Valor < valorLimite);
  const idsPINIsComValorInferior = pinisComValorInferior.map(objeto => objeto.ID);
  return idsPINIsComValorInferior;
}
const idsPINIsComValorInferior = obterIDsPINIsComValorInferior(listaObjetos, 2000.00);
salvarListaEmNovaPasta(idsPINIsComValorInferior, 'idsPINIsComValorInferior.json', './resultado');

// Função para exibir o Valor Médio de todos os PINI
function obterValorMedioPini(lista) {
  const somaValores = lista.reduce((acumulador, objeto) => acumulador + objeto.Valor, 0);
  const valorMedio = somaValores / lista.length;

  return valorMedio;
}
const valorMedio = obterValorMedioPini(listaObjetos);
salvarListaEmNovaPasta([{ "ValorMedio": valorMedio.toFixed(2) }], 'valorMedio.json', './resultado');


////////////////////////////////////// CRUD //////////////////////////////////////

// LIST - READ ALL
// Função para listar todos
function listarTodosPINIs(lista) {
  console.log('Todos os PINIs:');
  lista.forEach(objeto => {
    console.log(`ID: ${objeto.ID}, Nome: ${objeto.Nome}, Valor: ${objeto.Valor}`);
  });
}
// listarTodosPINIs(listaObjetos);
salvarListaEmNovaPasta(listaObjetos, 'listarPini.json', './resultado')

// CREAT - ADD - PUSH
function adicionarPINI(lista, novoPINI) {
  lista.push(novoPINI);
}
const novoPINI = {
  "ID": 10,
  "Nome": "Novo Residencial",
  "Descricao": "Teste de novo PINI",
  "DescricaoCombo": "Novo Residencial",
  "Valor": 2500.00
};

adicionarPINI(listaObjetos, novoPINI);
salvarListaEmNovaPasta(listaObjetos, 'novoPini.json', './resultado');


// UPDATE - EDIT - FINDINDEX
function atualizarPINI(lista, id, novosDados) {
  const index = lista.findIndex(objeto => objeto.ID === id);
  if (index !== -1) {
    lista[index] = { ...lista[index], ...novosDados };
  }
}
const idParaAtualizar = 10;
const novosDados = {
  "Nome": "Residencial Atualizado",
  "Valor": 2000.00
};

atualizarPINI(listaObjetos, idParaAtualizar, novosDados);
salvarListaEmNovaPasta(listaObjetos, 'atualizarPini.json', './resultado');


// LIST - READ ESPECIFIC
// Função para listar um específico
function obterPINIPorID(lista, id) {
  return lista.find(objeto => objeto.ID === id);
}
const idProcurado = 3;
const piniEncontrado = obterPINIPorID(listaObjetos, idProcurado);
salvarListaEmNovaPasta(piniEncontrado, 'listarPiniEspecifico.json', './resultado');


// DELETE - EXCLUIR - SPLICE
function excluirPINI(lista, id) {
  const index = lista.findIndex(objeto => objeto.ID === id);
  if (index !== -1) {
    // Remove o PINI encontrado da lista
    lista.splice(index, 1);
  } 
}
const idParaExcluir = 10;

excluirPINI(listaObjetos, idParaExcluir);
salvarListaEmNovaPasta(listaObjetos, 'deletarPini.json', './resultado');


////////////////////////////////////// RESULTADO //////////////////////////////////////

// Função para salvar a lista em um novo arquivo JSON em uma pasta específica
function salvarListaEmNovaPasta(lista, nomeArquivo, pastaDestino) {
  try {
    // Cria a pasta de destino se não existir
    if (!fs.existsSync(pastaDestino)) {
      fs.mkdirSync(pastaDestino, { recursive: true });
    }

    const caminhoCompleto = path.join(pastaDestino, nomeArquivo);
    const jsonLista = JSON.stringify(lista, null, 2);
    fs.writeFileSync(caminhoCompleto, jsonLista);
    console.log(`Lista salva em ${caminhoCompleto}`);
  } catch (erro) {
    console.error('Erro ao salvar o arquivo JSON:', erro);
  }
}

