# Rick and Morty

## Demo
### iOS
https://github.com/IgorColetoBueno/rick-and-morty-test/assets/17251330/66a44143-4fc2-4fb4-9ba0-b09c332caeae
### Android
https://github.com/IgorColetoBueno/rick-and-morty-test/assets/17251330/db919711-3f8a-41d0-a89b-6f45dd26503a



## Como executar

- ```npm i```
- ```npm run [ios|android]``` ou ```npm start``` caso queira executar no Expo GO 
- ```npm run test``` (opcional, apenas para atestar se tudo está conforme os testes)

## Visão Geral

O Aplicativo de Personagens do Rick e Morty é um aplicativo móvel construído utilizando React Native com Expo. O aplicativo interage com a API GraphQL do programa de TV "Rick e Morty" para exibir uma lista de personagens de maneira paginada, além de informações detalhadas sobre cada personagem. O aplicativo inclui a funcionalidade de Infinity Scroll, uma animação Shimmer Effect para o carregamento de personagens e utiliza o Redux Toolkit para gerenciar o estado da busca.

## Funcionalidades

### 1. Tela de Lista de Personagens

- A tela principal do aplicativo lista os personagens do programa de TV "Rick e Morty" de maneira paginada, usando Infinity Scroll.
- Os personagens são exibidos em uma lista rolável com seus nomes e imagens.
- À medida que o usuário faz scroll na lista, mais personagens são carregados automaticamente.
- Um Shimmer Effect é utilizado para indicar o carregamento dos personagens, criando uma animação suave de carregamento.
- O estado da busca é gerenciado pelo Redux Toolkit, permitindo que os usuários filtrem a lista de personagens por nome.

### 2. Tela de Detalhes do Personagem

- Exibe informações detalhadas sobre um personagem selecionado.
- Inclui nome do personagem, imagem, gênero, origem, localização, espécie e status.
- Fornece um botão para voltar à Tela de Lista de Personagens.

## Interface do Usuário

### 1. Tela de Lista de Personagens

- Campo de texto para busca de personagens por nome.
- Lista rolável de personagens.
- Loading indicators enquanto os dados são buscados e enquanto mais personagens são carregados.
- Mensagem de erro se a busca de dados falhar.
- Efeito de Shimmer para indicar o carregamento dos personagens, criando uma animação suave.
- À medida que o usuário faz scroll na lista, mais personagens são carregados automaticamente.

### 2. Tela de Detalhes do Personagem

- Imagem do personagem, nome, gênero, origem, localização, espécie e status exibidos.
- Botão de voltar para retornar à Tela de Lista de Personagens.
- Loading indicators enquanto os dados são buscados.
- Mensagem de erro se a busca de dados falhar.

## Fluxo de Dados

### 1. Tela de Lista de Personagens

1. No lançamento do aplicativo, a Tela de Lista de Personagens busca a primeira página de personagens utilizando a API GraphQL.
2. A medida que o usuário faz scroll na lista, o aplicativo carrega automaticamente a próxima página de personagens.
3. Os dados dos personagens buscados são exibidos em uma lista rolável.
4. Os usuários podem inserir o nome de um personagem na entrada de pesquisa para filtrar a lista.
5. Quando um personagem é tocado, o aplicativo navega para a Tela de Detalhes do Personagem.

### 2. Tela de Detalhes do Personagem

1. Ao navegar para a Tela de Detalhes do Personagem, o aplicativo busca informações detalhadas sobre o personagem selecionado utilizando a API GraphQL.
2. Os dados detalhados do personagem são exibidos na tela.
3. Os usuários podem navegar de volta para a Tela de Lista de Personagens.

## Navegação

- O aplicativo utiliza a biblioteca React Navigation para lidar com a navegação entre as telas.
- Stack navigation é utilizada para alternar entre a Tela de Lista de Personagens e a Tela de Detalhes do Personagem.

## Gerenciamento de Estado

- O aplicativo utiliza o Redux Toolkit para gerenciar o estado da busca de personagens por nome.
- O estado da busca é armazenado no Redux para facilitar a filtragem da lista de personagens.

## Testes

- Jest e React Testing Library são utilizados para testes unitários de componentes e funcionalidades.
- Os casos de teste abrangem diversos cenários, como carregamento, tratamento de erros, navegação, interações da interface do usuário, Infinity Scroll e animação Shimmer.

## Dependências

- React Native
- Typescript
- Expo Vector Icons
- Expo
- React Navigation
- Redux Toolkit (para gerenciamento de estado)
- Apollo Client (inclui o client, codegen e plugins)
- Jest e React Testing Library (para testes)
- Eslint (Validação do código)

## Implantação

- O aplicativo pode ser implantado em dispositivos Android e iOS utilizando as ferramentas de compilação e implantação do Expo.
- Também pode ser publicado nas lojas de aplicativos (Google Play Store e Apple App Store) após atender aos requisitos necessários.

## Conclusão

O Aplicativo de Personagens do Rick e Morty oferece aos usuários uma experiência completa e envolvente para explorar personagens do popular programa de TV. O aplicativo utiliza o conceito de Infinity Scroll e uma animação Shimmer Effect para carregar e exibir personagens de maneira paginada, enquanto o Redux Toolkit gerencia o estado da busca por nome, garantindo uma experiência suave e contínua durante a navegação na lista. Com base nas capacidades do React Native e do Expo, o aplicativo é capaz de buscar, exibir dados dos personagens da API GraphQL e fornecer animações atraentes para indicar o carregamento de dados.
