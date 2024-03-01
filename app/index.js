const fs = require('fs');

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

// Função para exibir Lista dos PINI
function exibirTodosItens(lista) {
  console.log('Todos os itens:', lista);
}

// Função para exibir lista de PINI  "Residencial"
function obterPINIsResidenciais(lista) {
  return lista.filter(objeto => objeto.Nome.includes("Residencial"));
}

// Função para obter os IDs dos PINIs com valor inferior a 2000.00
function obterIDsPINIsComValorInferior(lista, valorLimite) {
  const pinisComValorInferior = lista.filter(objeto => objeto.Valor < valorLimite);
  const idsPINIsComValorInferior = pinisComValorInferior.map(objeto => objeto.ID);
  return idsPINIsComValorInferior;
}

// Função para exibir o Valor Médio de todos os PINI
function obterValorMedioPini(lista) {
  const somaValores = lista.reduce((acumulador, objeto) => acumulador + objeto.Valor, 0);
  const valorMedio = somaValores / lista.length;

  return valorMedio;
}

// Função para excluir tosdos os PINI comerciais de uma lista
function excluirPINIsComerciais(lista) {
  const pinisResidenciais = lista.filter(objeto => !objeto.Nome.includes("Comercial"));

  return pinisResidenciais;
}

// Chama a função que carrega os dados do data.json em uma lista manipulável
const listaObjetos = carregarArquivoJSON(caminhoArquivo);

// Chama a função para exibir a lista com todos os PINI
// exibirTodosItens(listaObjetos);

// Chama a função para obter os PINIs residenciais
const pinisResidenciais = obterPINIsResidenciais(listaObjetos);
// console.log('PINIs Residenciais:', pinisResidenciais);

// Chama a função para obter os IDs dos PINIs com valor inferior a 2000.00
const idsPINIsComValorInferior = obterIDsPINIsComValorInferior(listaObjetos, 2000.00);
// console.log('IDs dos PINIs com valor inferior a 2000.00:', idsPINIsComValorInferior);

// Chama a função para obter o valor médio dos PINIs
const valorMedio = obterValorMedioPini(listaObjetos);
// console.log('Valor médio dos PINIs:', valorMedio.toFixed(2));

// Chama a função para excluir os PINIs comerciais
const pinisSemComerciais = excluirPINIsComerciais(listaObjetos);
// console.log('PINIs sem comerciais:', pinisSemComerciais);


// CRUD

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


// LIST - READ ALL
// Função para listar todos
function listarTodosPINIs(lista) {
  console.log('Todos os PINIs:');
  lista.forEach(objeto => {
    console.log(`ID: ${objeto.ID}, Nome: ${objeto.Nome}, Valor: ${objeto.Valor}`);
  });
}
// listarTodosPINIs(listaObjetos);


// LIST - READ ESPECIFIC
// Função para listar um específico
function obterPINIPorID(lista, id) {
  return lista.find(objeto => objeto.ID === id);
}
const idProcurado = 3;
// const piniEncontrado = obterPINIPorID(listaObjetos, idProcurado);
// console.log(piniEncontrado);


// DELETE - EXCLUIR - SPLICE
function excluirPINI(lista, id) {
  const index = lista.findIndex(objeto => objeto.ID === id);
  if (index !== -1) {
    // Remove o PINI encontrado da lista
    lista.splice(index, 1);
  } 
}
const idParaExcluir = 10;

adicionarPINI(listaObjetos, novoPINI);
// exibirTodosItens(listaObjetos);

atualizarPINI(listaObjetos, idParaAtualizar, novosDados);
// exibirTodosItens(listaObjetos);

excluirPINI(listaObjetos, idParaExcluir);
// exibirTodosItens(listaObjetos);


// RESULTADO
