# Relatório de Aprendizado

### Dias 1 e 4 de março

Implementar um CRUD em javascript/nodejs utilizando listas. (funções: editar, atualizar, remover e listar)\
Ao iniciar, o script deverá carregar um arquivo .json e armazenar os objetos em uma lista.

- Exercício 1: criar função que utilize as operações de lista para obter os PINIs residenciais.
- Exercício 2: criar função que utilize as operações de lista para obter o id de todos os PINI com valor inferior a 2000.00
- Exercício 3: criar função que utilize as operações de lista para obter o valor médio dos PINI.
- Exercicio 4: criar função para excluir todos os PINI comerciais.

Salvar os resultados em uma pasta e escrever um pequeno relatório explicando o que foi aprendido e como executar o código.

## Requisitos

Instalação do Node.js :

``` bash
sudo snap install node --classic --channel=edge
```

## Preparando o ambiente

~~~~ bash
# Cria a pasta
mkdir crud

# Movimenta o terminal para a pasta
cd crud

# Criar o package.json -> dar enter, enter, ...
npm init

# Instalação de módulos, incluindo o módulo fs
npm install sequelize
npm install tedious
npm install redis
npm install fs

# Abrir o VSCode
code .
~~~~

## Para executar o código-fonte

**Para inciar sua aplicação, lembre de estar na pasta correta**

No terminal digite o comando: 
```node index.js```

## Adicionando carga inicial

Crie uma pasta para armazenar sua carga inicial '``` data.json```'.   Adicione os dados no arquivo :
~~~ json
[
  {
    "ID": 1,
    "Nome": "Residencial R1",
    "Descricao": "",
    "DescricaoCombo": "R.1 Residencial Popular (RPQ1)",
    "Valor": 2087.78
  },
  {
    "ID": 2,
    "Nome": "Residencial R2",
    "Descricao": null,
    "DescricaoCombo": "R.2 Até 70,00 m²",
    "Valor": 1915.97
  },
]
~~~

## Adicionando um arquivo .json e armazenando os objetos em uma lista....
Iremos utilizar o arquivo ``` data.json``` para criar uma lista de objtos (PINI).  

~~~ Javascript
// Caminho para o arquivo JSON
const caminhoArquivo = 'C:\Users\ruth.silva\Desktop\crud\data.json';

// Função para ler o arquivo JSON
function carregarArquivoJSON(caminho) {
  try {
    // Lê o conteúdo do arquivo
    const conteudoArquivo = fs.readFileSync(caminho, 'utf-8');
    
    // Converte o conteúdo do arquivo para um objeto JavaScript
    const listaObjetos = JSON.parse(conteudoArquivo);
    
    return listaObjetos;
  } catch (erro) {
    console.error('Erro ao carregar o arquivo JSON:', erro);
    return null;
  }
}
~~~

Essa ```listaObjetos``` será usada pelas funções para entedermos melhor a manipulação de um banco de dados em memória. 


## Exibição da 'listaObjetos'
Para exibir a lista depois das operações. é possivel usar: 

~~~JavaScript
// Função para exibir Lista dos PINI
function exibirTodosItens(lista) {
  console.log('Todos os itens:', lista);
}
// Chama a função para exibir a lista com todos os PINI
exibirTodosItens(listaObjetos);

~~~

# *CRUD*  

### Adicionar novo PINI
~~~ JavaScript
// CREAT - ADD - PUSH
function adicionarPINI(lista, novoPINI) {
  lista.push(novoPINI);
}

// NOVO PINI
const novoPINI = {
  "ID": 10,
  "Nome": "Novo Residencial",
  "Descricao": "Teste de novo PINI",
  "DescricaoCombo": "Novo Residencial",
  "Valor": 2500.00
};

adicionarPINI(listaObjetos, novoPINI);

~~~


### Editando PINI
~~~ JavaScript
// UPDATE - EDIT - FINDINDEX
function atualizarPINI(lista, id, novosDados) {
  const index = lista.findIndex(objeto => objeto.ID === id);

  if (index !== -1) {
    // Atualiza os dados do PINI encontrado
    lista[index] = { ...lista[index], ...novosDados };
  }
}

// Editando PINI de ID 10
const idParaAtualizar = 10;
const novosDados = {
  "Nome": "Residencial Atualizado",
  "Valor": 2000.00
};

atualizarPINI(listaObjetos, idParaAtualizar, novosDados);
~~~

### Listando PINI
~~~ JavaScript
function listarTodosPINIs(lista) {
  console.log('Todos os PINIs:');
  lista.forEach(objeto => {
    console.log(`ID: ${objeto.ID}, Nome: ${objeto.Nome}, Valor: ${objeto.Valor}`);
  });
}
listarTodosPINIs(listaObjetos);
~~~


### Deletando PINI
~~~ JavaScript
// DELETE - EXCLUIR - SPLICE
function excluirPINI(lista, id) {
  const index = lista.findIndex(objeto => objeto.ID === id);
  if (index !== -1) { lista.splice(index, 1);
  }
}
const idParaExcluir = 10;

excluirPINI(listaObjetos, idParaExcluir);
~~~

## *Exercícios* 

### Exercício 1 : criar função que utilize as operações de lista para obter os PINIs residenciais....

~~~ Javascript
// Função para obter os PINIs residenciais
function obterPINIsResidenciais(lista) {
  // Filtra os objetos que têm "Residencial" no nome
  const pinisResidenciais = lista.filter(objeto => objeto.Nome.includes("Residencial"));

  return pinisResidenciais;
}

// Chama a função para obter os PINIs residenciais
const pinisResidenciais = obterPINIsResidenciais(listaObjetos);
console.log('PINIs Residenciais:', pinisResidenciais);

~~~

### Exercício 2 : criar função que utilize as operações de lista para obter o id de todos os PINI com valor inferior a 2000.00....

~~~ Javascript
// Função para obter os IDs dos PINIs com valor inferior a 2000.00
function obterIDsPINIsComValorInferior(lista, valorLimite) {
  const pinisComValorInferior = lista.filter(objeto => objeto.Valor < valorLimite);
  const idsPINIsComValorInferior = pinisComValorInferior.map(objeto => objeto.ID);

  return idsPINIsComValorInferior;
}

// Chama a função para obter os IDs dos PINIs com valor inferior a 2000.00
const idsPINIsComValorInferior = obterIDsPINIsComValorInferior(listaObjetos, 2000.00);
console.log('IDs dos PINIs com valor inferior a 2000.00:', idsPINIsComValorInferior);

~~~

### Exercício 3: criar função que utilize as operações de lista para obter o valor médio dos PINI....

~~~ javaScript
// Função para obter o valor médio doa Pini
function obterValorMedioPini(lista) {
  const somaValores = lista.reduce((acumulador, objeto) => acumulador + objeto.Valor, 0);
  const valorMedio = somaValores / lista.length;

  return valorMedio;
}

// Chama a função para obter o valor médio dos PINIs
const valorMedio = obterValorMedioPini(listaObjetos);
console.log('Valor médio dos PINIs:', valorMedio.toFixed(2));

~~~

### Exercicio 4: criar função para excluir todos os PINI comerciais....

~~~ JavaScript
function excluirPINIsComerciais(lista) {
  // Filtra os objetos que não têm "Comercial" no nome
  const pinisResidenciais = lista.filter(objeto => !objeto.Nome.includes("Comercial"));

  return pinisResidenciais;
}

// Chama a função para excluir os PINIs comerciais
const pinisSemComerciais = excluirPINIsComerciais(listaObjetos);
console.log('PINIs sem comerciais:', pinisSemComerciais);

~~~

## Salvar os resultados em uma pasta

Nessa função iremos organizar os resultados das funções criando JSON em uma pasta especifica, 
a cada invocação de uma função que manipule a lista inicial iremos chamar a função '``` salvarListaEmNovaPasta ```'

~~~ JavaScript
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
~~~

# Conhecimentos Adquiridos 

