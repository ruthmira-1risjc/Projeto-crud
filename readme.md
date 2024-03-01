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
```sudo snap install node --classic --channel=edge```

## Preparando o ambiente

~~~~ python
# Cria a pasta
mkdir crud
# Movimenta o terminal para a pasta
cd crud
# Criar o package.json -> dar enter, enter, ...
npm init
# Criar um arquivo index.js
echo "" > index.js # alternativamente: touch index.js
# Instalações de módulos
npm install sequelize
npm install tedious
npm install redis
# Abrir o VSCode
code .
~~~~

## Adicionando carga inicial

Crie uma pasta para armazenar sua carga inicial '``` data.json```'
. Adicione os dados no arquivo :
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

## Para inciar sua aplicação, lembre de estar na pasta correta

```node index.js```

## Executando os Exercícios

### Adicionando um arquivo .json e armazenando os objetos em uma lista....

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

## Manipulando a lista

Para exibir a lista depois das operações. é possivel usar: 

~~~JavaScript
// Exibe todos os itens da lista no console
console.log('Todos os itens:', listaObjetos);

[
  {
    ID: 1,
    Nome: 'Residencial R1',
    Descricao: '',
    DescricaoCombo: 'R.1 Residencial Popular (RPQ1)',
    Valor: 2087.78
  },
  {
    ID: 2,
    Nome: 'Residencial R2',
    Descricao: null,
    DescricaoCombo: 'R.2 Até 70,00 m²',
    Valor: 1915.97
  }
]
~~~

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

PINIs Residenciais: [
  {
    ID: 1,
    Nome: 'Residencial R1',
    Descricao: '',
    DescricaoCombo: 'R.1 Residencial Popular (RPQ1)',
    Valor: 2087.78
  },
  {
    ID: 2,
    Nome: 'Residencial R2',
    Descricao: null,
    DescricaoCombo: 'R.2 Até 70,00 m²',
    Valor: 1915.97
  },
  {
    ID: 3,
    Nome: 'Residencial R3',
    Descricao: null,
    DescricaoCombo: 'R.3 De 70,01 m² até 300,00 m²',
    Valor: 2350.63
  },
  {
    ID: 4,
    Nome: 'Residencial R4',
    Descricao: null,
    DescricaoCombo: 'R.4 Acima de 300,01 m²',
    Valor: 2852.05
  }
]
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


IDs dos PINIs com valor inferior a 2000.00: [ 2, 5, 9 ]
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

Valor médio dos PINIs: 2118.39
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


PINIs sem comerciais: [
  {
    ID: 1,
    Nome: 'Residencial R1',
    Descricao: '',
    DescricaoCombo: 'R.1 Residencial Popular (RPQ1)',
    Valor: 2087.78
  },
  {
    ID: 2,
    Nome: 'Residencial R2',
    Descricao: null,
    DescricaoCombo: 'R.2 Até 70,00 m²',
    Valor: 1915.97
  },
  {
    ID: 3,
    Nome: 'Residencial R3',
    Descricao: null,
    DescricaoCombo: 'R.3 De 70,01 m² até 300,00 m²',
    Valor: 2350.63
  },
  {
    ID: 4,
    Nome: 'Residencial R4',
    Descricao: null,
    DescricaoCombo: 'R.4 Acima de 300,01 m²',
    Valor: 2852.05
  },
  {
    ID: 9,
    Nome: 'Industrial',
    Descricao: null,
    DescricaoCombo: 'I.1 Industrial - Galpão de uso geral',
    Valor: 1117.18
  }
]
~~~

## CRUD 

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


