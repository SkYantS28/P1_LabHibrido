# 🍕 VENETO — Restaurante e Pizzaria

Aplicativo mobile de restaurante e pizzaria desenvolvido em **React Native com Expo e TypeScript**, inspirado em um protótipo original criado no Figma.

O projeto foi desenvolvido como atividade acadêmica da disciplina **Aplicativos Híbridos**, com foco na construção de uma aplicação mobile completa, navegação entre telas, gerenciamento de estado, persistência local de dados e implementação de fluxos de autenticação, produtos, favoritos, carrinho, endereços e pedidos.

> **Status:** Projeto acadêmico / protótipo funcional
> **Versão:** 1.0.0
> **Plataforma:** Android / iOS / Web via Expo

---

## 📌 Sobre o projeto

O **Veneto** simula a experiência de um aplicativo de pedidos para uma pizzaria e restaurante.

A aplicação permite que o usuário:

* crie uma conta;
* faça login;
* navegue pelo cardápio;
* pesquise produtos;
* filtre produtos por categoria;
* visualize detalhes dos produtos;
* personalize pizzas;
* adicione produtos ao carrinho;
* altere quantidades;
* favorite produtos;
* cadastre e selecione endereços;
* finalize pedidos;
* consulte pedidos realizados;
* acesse e gerencie seu perfil.

Os dados são armazenados localmente no dispositivo utilizando **AsyncStorage**, permitindo que determinadas informações permaneçam disponíveis entre as sessões do aplicativo.

---

# 🎓 Contexto acadêmico

**Universidade de Vassouras — Campus Maricá**
**Curso:** Engenharia de Software
**Disciplina:** Aplicativos Híbridos
**Projeto:** P1 — Laboratório de Aplicativos Híbridos

O projeto foi desenvolvido a partir de um protótipo visual elaborado no **Figma**, posteriormente transformado em uma aplicação mobile funcional.

A implementação priorizou:

* desenvolvimento mobile multiplataforma;
* componentização;
* navegação entre telas;
* gerenciamento de estado;
* persistência local;
* organização de código;
* experiência de usuário;
* utilização de TypeScript;
* construção de fluxos completos de uma aplicação de pedidos.

---

# ✨ Funcionalidades

## 🔐 Autenticação

### Cadastro

O usuário pode criar uma conta informando:

* nome;
* e-mail;
* senha;
* confirmação de senha.

O cadastro possui validações de campos obrigatórios, formato de e-mail, tamanho mínimo da senha e confirmação de senha.

Também existe tratamento para tentativa de cadastro com e-mail já registrado.

### Login

O login realiza:

* validação dos campos;
* normalização do e-mail;
* verificação das credenciais;
* indicador de carregamento;
* tratamento de credenciais inválidas;
* persistência da sessão local.

Usuários não autenticados são redirecionados para a tela de login.

---

# 🍕 Cardápio

A tela inicial apresenta as categorias:

* Pizzas
* Esfihas
* Panquecas
* Massas
* Caldos
* Bebidas

O usuário pode:

* selecionar uma categoria;
* pesquisar produtos;
* visualizar nome, descrição e preço;
* abrir os detalhes do produto;
* favoritar produtos;
* acessar o carrinho;
* acessar favoritos;
* acessar o perfil.

### Produtos cadastrados

O protótipo possui produtos de diferentes categorias, incluindo pizzas, esfihas, panquecas, massas, caldos e bebidas.

Os dados do cardápio são atualmente definidos no próprio aplicativo, funcionando como dados de demonstração.

---

# 🧀 Personalização de produtos

Para pizzas, o usuário pode selecionar diferentes opções.

### Tamanhos

* 35 cm
* 45 cm

### Bordas

* Sem borda
* Catupiry
* Cheddar
* Cream Cheese

Também é possível informar uma observação de até **140 caracteres**.

A quantidade do produto pode ser alterada antes da adição ao carrinho.

---

# ❤️ Favoritos

O aplicativo possui um sistema de favoritos utilizando um contexto próprio.

O usuário pode:

* favoritar um produto;
* remover um favorito;
* visualizar todos os produtos favoritos;
* abrir um produto diretamente pela lista de favoritos.

Os favoritos são persistidos localmente através do **AsyncStorage**.

---

# 🛒 Carrinho

O carrinho permite:

* visualizar os produtos adicionados;
* alterar quantidades;
* remover produtos;
* visualizar subtotal;
* visualizar taxa de entrega;
* visualizar total;
* continuar comprando;
* finalizar o pedido.

Produtos com a mesma configuração são agrupados utilizando um identificador que considera características como tamanho, borda e observação.

A aplicação utiliza uma taxa de entrega simulada de **R$ 5,00**.

---

# 📍 Endereços

O usuário pode gerenciar seus endereços de entrega.

Funcionalidades:

* visualizar endereços cadastrados;
* selecionar endereço;
* adicionar endereço;
* editar endereço;
* excluir endereço;
* validação dos campos;
* persistência local.

O projeto também possui dados iniciais de demonstração, como endereço de casa e trabalho.

---

# 📦 Pedidos

Após a finalização do carrinho, o aplicativo apresenta uma tela de confirmação do pedido.

O histórico permite consultar:

* número do pedido;
* data;
* produtos;
* quantidade;
* preço;
* total registrado.

Os pedidos são armazenados localmente e o mais recente aparece primeiro na lista.

---

# 👤 Perfil

A tela de perfil apresenta os dados básicos do usuário autenticado.

Também permite:

* acessar os pedidos realizados;
* visualizar informações da conta;
* realizar logout.

---

# 🧭 Telas

O projeto possui as seguintes rotas principais:

| Tela        | Rota                 | Função                         |
| ----------- | -------------------- | ------------------------------ |
| Login       | `/login`             | Autenticação                   |
| Cadastro    | `/cadastro`          | Criação de conta               |
| Início      | `/`                  | Cardápio e navegação principal |
| Produto     | `/produto`           | Detalhes e personalização      |
| Favoritos   | `/favoritos`         | Produtos favoritados           |
| Carrinho    | `/carrinho`          | Produtos selecionados          |
| Endereços   | `/endereco`          | Gerenciamento de endereços     |
| Confirmação | `/pedido-confirmado` | Finalização do pedido          |
| Pedidos     | `/pedidos`           | Histórico de pedidos           |
| Perfil      | `/perfil`            | Dados e ações da conta         |

A navegação é realizada utilizando **Expo Router**.

---

# 🏗️ Arquitetura

A estrutura principal do projeto foi organizada por responsabilidade:

```text
src/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── cadastro.tsx
│   ├── produto.tsx
│   ├── favoritos.tsx
│   ├── carrinho.tsx
│   ├── endereco.tsx
│   ├── pedido-confirmado.tsx
│   ├── pedidos.tsx
│   └── perfil.tsx
│
├── components/
│   ├── CategoryButton.tsx
│   ├── Header.tsx
│   └── ProductCard.tsx
│
├── constants/
│   └── colors.ts
│
└── context/
    ├── AddressContext.tsx
    ├── AuthContext.tsx
    ├── CartContext.tsx
    ├── FavoritesContext.tsx
    └── OrdersContext.tsx
```

### `app/`

Contém as telas e rotas da aplicação utilizando o sistema de arquivos do Expo Router.

### `components/`

Contém componentes reutilizáveis da interface, como:

* `Header`;
* `ProductCard`;
* `CategoryButton`.

### `context/`

Centraliza os estados compartilhados da aplicação:

* autenticação;
* endereços;
* carrinho;
* favoritos;
* pedidos.

### `constants/`

Centraliza a identidade visual e as cores utilizadas pela aplicação.

---

# 🧠 Gerenciamento de estado

O projeto utiliza **React Context API** para compartilhar estados entre diferentes telas.

Foram implementados cinco contextos:

### `AuthContext`

Responsável por:

* usuário atual;
* cadastro;
* login;
* logout;
* sessão.

### `AddressContext`

Responsável por:

* endereços;
* endereço selecionado;
* criação;
* edição;
* exclusão.

### `CartContext`

Responsável por:

* produtos do carrinho;
* quantidades;
* subtotal;
* adicionar;
* remover;
* aumentar/diminuir quantidade;
* limpar carrinho.

### `FavoritesContext`

Responsável por:

* favoritos;
* identificação de produtos favoritados;
* adicionar/remover favoritos.

### `OrdersContext`

Responsável por:

* histórico de pedidos;
* criação de novos pedidos;
* persistência dos pedidos.

---

# 💾 Persistência local

A aplicação utiliza:

**AsyncStorage**

para armazenar dados localmente no dispositivo.

São utilizadas chaves específicas para diferentes informações, incluindo:

```text
@veneto_users
@veneto_current_user
@veneto_addresses
@veneto_selected_address
@veneto_cart
@veneto_favorites
@veneto_orders
```

Isso permite manter dados como sessão, carrinho, favoritos, endereços e pedidos mesmo após o fechamento do aplicativo.

---

# 🛠️ Tecnologias utilizadas

## Front-end / Mobile

* **React Native**
* **Expo**
* **Expo Router**
* **TypeScript**
* **React**
* **React Context API**

## Persistência

* **AsyncStorage**

## Desenvolvimento

* **Git**
* **GitHub**
* **Figma**
* **Visual Studio Code**
* **Expo Go**

## Configuração

* Expo SDK 57
* React Native 0.86.3
* React 19.2.3
* TypeScript 6.0.3

---

# 🎨 Identidade visual

A interface utiliza uma paleta inspirada em uma identidade visual de restaurante italiano, centralizada em:

```text
Background:      #F8F4EE
Primary:         #7A1F1F
Secondary:       #C89B5C
Text:            #2D2926
Text Secondary:  #6B625A
White:           #FFFFFF
Border:          #E5DDD2
```

As cores são centralizadas em:

```text
src/constants/colors.ts
```

O projeto também possui configuração de splash screen e ícones através do Expo.

---

# 🚀 Como executar

## Pré-requisitos

É necessário ter instalado:

* Node.js
* npm
* Expo
* Expo Go, caso queira executar em dispositivo físico

## Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta:

```bash
cd P1_LabHibrido-main
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npx expo start
```

Depois, é possível:

* escanear o QR Code utilizando o Expo Go;
* executar no Android;
* executar no iOS;
* executar na web.

Também existem os scripts:

```bash
npm run start
npm run android
npm run ios
npm run web
```

---

# 📱 Testando no Expo Go

Após executar:

```bash
npx expo start
```

abra o **Expo Go** no dispositivo e escaneie o QR Code exibido pelo Expo.

### Fluxo sugerido para demonstração

1. Abrir o aplicativo.
2. Criar uma conta.
3. Realizar login.
4. Navegar pelas categorias.
5. Pesquisar um produto.
6. Abrir os detalhes de uma pizza.
7. Testar tamanho e borda.
8. Adicionar uma observação.
9. Adicionar o produto ao carrinho.
10. Alterar a quantidade.
11. Adicionar produtos aos favoritos.
12. Cadastrar ou selecionar um endereço.
13. Finalizar o pedido.
14. Consultar o histórico de pedidos.
15. Acessar o perfil.
16. Realizar logout.

---

# 🔒 Considerações sobre segurança

Este projeto é um **protótipo acadêmico com persistência local** e não deve ser considerado uma implementação de autenticação para produção.

Por exemplo, as credenciais utilizadas no protótipo são armazenadas localmente através do AsyncStorage. Em uma aplicação real, seria necessário utilizar uma arquitetura de autenticação apropriada, com backend, armazenamento seguro de credenciais e mecanismos de proteção de sessão.

Também não existe comunicação com um servidor ou banco de dados remoto nesta versão.

---

# ⚠️ Limitações atuais

Por se tratar de um projeto acadêmico e protótipo funcional, algumas funcionalidades foram deliberadamente simplificadas.

Atualmente:

* não existe backend;
* não existe banco de dados remoto;
* não existe integração com gateway de pagamento;
* não existe integração real com serviço de entrega;
* os produtos são definidos localmente;
* informações como horário, avaliação e tempo estimado de entrega são dados de demonstração;
* os endereços iniciais são dados de exemplo;
* autenticação é local;
* não há integração com notificações push;
* pedidos não possuem ciclo completo de atualização de status;
* dados persistidos não são vinculados a usuários diferentes por meio de uma camada de backend.

Essas características fazem parte do escopo do protótipo e não representam uma arquitetura de produção.

---

# 🔮 Possíveis evoluções

Como próximos passos, o projeto poderia evoluir para:

* API REST;
* backend com Node.js/NestJS;
* banco de dados PostgreSQL ou MongoDB;
* autenticação baseada em token;
* armazenamento seguro de credenciais;
* integração com gateway de pagamento;
* integração com mapas e geolocalização;
* cálculo real de entrega;
* acompanhamento do pedido em tempo real;
* notificações push;
* painel administrativo;
* gerenciamento remoto de produtos;
* gerenciamento de estoque;
* avaliações reais;
* separação dos dados por usuário;
* testes automatizados;
* CI/CD.

---

# 📚 Objetivos técnicos demonstrados

O projeto demonstra conhecimentos práticos em:

* desenvolvimento de aplicações mobile;
* React Native;
* TypeScript;
* Expo;
* Expo Router;
* navegação baseada em rotas;
* componentização;
* criação de componentes reutilizáveis;
* Context API;
* gerenciamento de estado;
* persistência local;
* AsyncStorage;
* formulários;
* validação de dados;
* manipulação de listas;
* filtros e pesquisa;
* lógica de carrinho;
* gerenciamento de favoritos;
* CRUD local de endereços;
* fluxo de autenticação;
* organização de projeto;
* Git e GitHub;
* desenvolvimento orientado a uma interface criada no Figma.

---

# 📂 Organização do código

Uma das decisões do projeto foi separar responsabilidades em diferentes camadas.

As telas ficam em:

```text
src/app/
```

Os componentes reutilizáveis ficam em:

```text
src/components/
```

Os estados globais ficam em:

```text
src/context/
```

E a identidade visual fica em:

```text
src/constants/
```

Essa organização facilita a manutenção e permite que funcionalidades sejam modificadas sem concentrar toda a lógica em uma única tela.

---

# 📋 Requisitos acadêmicos

O projeto foi desenvolvido considerando os requisitos propostos para a atividade de Aplicativos Híbridos, incluindo:

* desenvolvimento de uma aplicação mobile;
* utilização de tecnologia híbrida;
* implementação de múltiplas telas;
* navegação entre telas;
* desenvolvimento de funcionalidades interativas;
* utilização de componentes;
* organização do código;
* controle de versão através do Git;
* disponibilização do projeto em repositório GitHub.

O aplicativo ultrapassa o requisito mínimo de telas ao apresentar fluxos independentes para autenticação, cardápio, produto, favoritos, carrinho, endereço, confirmação, pedidos e perfil.

---

# 👩‍💻 Autoria

**Sky Crizosti**
Engenharia de Software — Universidade de Vassouras

**Moizes Baptista da Silva**

Projeto desenvolvido para fins acadêmicos e de demonstração técnica.

---

# 📄 Licença

Este projeto está disponível sob a licença **MIT**.

Consulte o arquivo [`LICENSE`](./LICENSE) para obter o texto completo da licença.

---

## 🍕 Veneto

Um projeto acadêmico desenvolvido para transformar um protótipo de interface em uma experiência mobile funcional, explorando desenvolvimento híbrido, gerenciamento de estado, persistência local e organização de software.
