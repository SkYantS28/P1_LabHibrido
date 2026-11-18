# 🍕 VENETO — Restaurante e Pizzaria

Aplicativo mobile de restaurante e pizzaria desenvolvido em **React Native com Expo e TypeScript**, inspirado em um protótipo original criado no Figma.

O projeto foi desenvolvido como atividade acadêmica da disciplina **Aplicativos Híbridos**, com foco na construção de uma aplicação mobile multiplataforma, navegação entre telas, gerenciamento de estado, consumo de API REST, persistência local de dados e implementação de fluxos de autenticação, produtos, favoritos, carrinho, endereços e pedidos.

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

O projeto evoluiu de uma aplicação com dados e persistência locais para uma arquitetura que também utiliza **API REST**, com backend independente e autenticação por token JWT.

A persistência no dispositivo utiliza **Expo SecureStore** para o token de autenticação e **AsyncStorage** para preferências e dados de cache.

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
* consumo de API REST;
* persistência local;
* armazenamento seguro de sessão;
* organização de código;
* experiência de usuário;
* utilização de TypeScript;
* construção de fluxos completos de uma aplicação de pedidos.

---

# ✨ Funcionalidades

## 🔐 Autenticação

A autenticação utiliza uma API REST disponibilizada pelo backend do projeto.

### Cadastro

O usuário pode criar uma conta informando:

* nome;
* e-mail;
* senha;
* confirmação de senha.

O cadastro possui validações de campos obrigatórios, formato de e-mail, tamanho mínimo da senha e confirmação de senha.

O backend utiliza **bcrypt** para gerar o hash das senhas antes de armazená-las no banco de dados. Dessa forma, as senhas não são armazenadas em texto puro.

Também existe tratamento para tentativas de cadastro com e-mail já registrado.

### Login

O login realiza:

* validação dos campos;
* normalização do e-mail;
* envio das credenciais à API;
* verificação das credenciais pelo backend;
* indicador de carregamento;
* tratamento de credenciais inválidas;
* recebimento de token JWT;
* persistência segura da sessão.

O token JWT possui validade de **7 dias**.

O armazenamento do token é realizado pelo **Expo SecureStore**, utilizando os mecanismos de proteção disponibilizados pelo sistema operacional.

Ao reabrir o aplicativo, a sessão é recuperada para manter o usuário autenticado.

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

O cardápio contempla produtos de diferentes categorias, incluindo pizzas, esfihas, panquecas, massas, caldos e bebidas.

O projeto possui integração com a camada de serviços para obtenção dos dados da API, além de mecanismos de carregamento, tratamento de erros, atualização e cache do cardápio.

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

Os favoritos são gerenciados pelo `FavoritesContext`, com persistência local por meio do **AsyncStorage**.

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

O gerenciamento dos endereços é realizado pelo `AddressContext`.

O projeto também pode utilizar dados iniciais de demonstração, como endereço de casa e trabalho.

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

O gerenciamento dos pedidos é realizado pelo `OrdersContext`.

As informações mantidas localmente são persistidas no dispositivo. A integração completa do fluxo de pedidos com a API não deve ser considerada concluída enquanto as operações de consulta e criação de pedidos não estiverem conectadas e validadas no backend.

---

# 👤 Perfil

A tela de perfil apresenta os dados básicos do usuário autenticado.

Também permite:

* acessar os pedidos realizados;
* visualizar informações da conta;
* alterar o tema do aplicativo;
* realizar logout.

A preferência de tema é persistida localmente, permitindo manter a escolha entre as sessões.

---

# 🧭 Telas

O projeto possui as seguintes rotas principais:

| Tela | Rota | Função |
|---|---|---|
| Login | `/login` | Autenticação |
| Cadastro | `/cadastro` | Criação de conta |
| Início | `/` | Cardápio e navegação principal |
| Produto | `/produto` | Detalhes e personalização |
| Favoritos | `/favoritos` | Produtos favoritados |
| Carrinho | `/carrinho` | Produtos selecionados |
| Endereços | `/endereco` | Gerenciamento de endereços |
| Confirmação | `/pedido-confirmado` | Finalização do pedido |
| Pedidos | `/pedidos` | Histórico de pedidos |
| Perfil | `/perfil` | Dados e ações da conta |

A navegação é realizada utilizando **Expo Router**, com organização das telas por meio do sistema de rotas baseado em arquivos.

---

# 🏗️ Arquitetura

O projeto possui uma organização separada entre o aplicativo mobile e o backend.

A estrutura principal é:

```text
.
├── server/
│   └── ...
│
├── src/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── hooks/
│   └── services/
│
├── app.json
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

### `server/`

Contém o backend responsável pela API REST.

O servidor utiliza:

* Node.js;
* Express;
* SQLite;
* bcrypt para hash de senhas;
* JWT para autenticação.

O backend realiza o processamento das operações de autenticação e o armazenamento dos usuários no banco de dados.

### `src/app/`

Contém as telas e rotas da aplicação utilizando o sistema de arquivos do Expo Router.

### `src/components/`

Contém componentes reutilizáveis da interface, como:

* `Header`;
* `ProductCard`;
* `CategoryButton`.

### `src/context/`

Centraliza os estados compartilhados da aplicação:

* autenticação;
* endereços;
* carrinho;
* favoritos;
* pedidos;
* tema.

### `src/hooks/`

Contém hooks personalizados para reutilização de lógica:

* `useFetch`;
* `usePersistedState`;
* `useOnline`.

### `src/services/`

Centraliza a comunicação com a API e o acesso aos mecanismos de armazenamento:

* `api.ts`;
* `storage.ts`;
* `cache.ts`.

### `src/constants/`

Centraliza a identidade visual e as configurações utilizadas pela aplicação.

---

# 🧠 Gerenciamento de estado

O projeto utiliza **React Context API** para compartilhar estados entre diferentes telas.

Foram implementados contextos para as principais funcionalidades da aplicação.

### `AuthContext`

Responsável por:

* usuário atual;
* cadastro;
* login;
* logout;
* recuperação da sessão;
* gerenciamento do estado de autenticação.

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

### `ThemeContext`

Responsável pelo gerenciamento do tema visual do aplicativo, incluindo a preferência entre os modos claro e escuro.

---

# 🔌 Integração com API REST

A partir da Aula 9, o projeto passou a utilizar uma API REST para comunicação entre o aplicativo e o backend.

A comunicação HTTP é centralizada em:

```text
src/services/api.ts
```

Essa camada concentra as chamadas à API, a URL base e a configuração dos cabeçalhos HTTP.

Dessa forma, as telas não precisam conhecer diretamente a URL do servidor nem montar manualmente os cabeçalhos das requisições.

### Backend

O backend utiliza **Express** e **SQLite**.

Entre as responsabilidades implementadas estão:

* recebimento das requisições;
* cadastro de usuários;
* autenticação;
* validação de credenciais;
* armazenamento de usuários;
* geração de tokens JWT;
* proteção das senhas com bcrypt.

### Configuração da API

A URL base é configurada por variável de ambiente:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.10:3000
```

O endereço deve ser ajustado conforme o ambiente de execução.

---

# 💾 Persistência e armazenamento local

A partir da Aula 10, o projeto passou a utilizar diferentes mecanismos de armazenamento conforme a finalidade dos dados.

## Expo SecureStore

O **Expo SecureStore** é utilizado para armazenar o token JWT.

As operações de armazenamento são centralizadas em:

```text
src/services/storage.ts
```

As principais operações são:

* `saveToken`: salva o token;
* `getToken`: recupera o token;
* `removeToken`: remove o token.

O SecureStore utiliza os mecanismos de proteção do sistema operacional, como Keychain no iOS e Keystore no Android.

## AsyncStorage

O **AsyncStorage** é utilizado para dados que não exigem o mesmo nível de proteção do token de autenticação.

Entre suas aplicações estão:

* preferências do usuário;
* tema selecionado;
* cache do cardápio;
* outros dados locais.

As operações de armazenamento também são centralizadas em `storage.ts`, evitando que diferentes telas implementem diretamente a lógica de acesso ao disco.

### Camada genérica de armazenamento

A camada de serviços disponibiliza operações genéricas tipadas:

* `storage.get`;
* `storage.set`;
* `storage.remove`.

Essas operações facilitam a leitura, gravação e remoção de preferências e dados persistidos.

---

# ⚡ Cache do cardápio

O projeto possui uma camada de cache em:

```text
src/services/cache.ts
```

A função `comCache(chave, buscar, ttlMs)` controla a validade dos dados armazenados.

O funcionamento considera:

* consulta ao cache local;
* verificação do tempo de validade;
* reutilização de dados ainda válidos;
* atualização por meio da API quando necessário;
* utilização de cache antigo quando a API falha e existe uma cópia local disponível.

O cache do cardápio possui validade de **5 minutos**.

Essa estratégia reduz requisições desnecessárias e permite que informações previamente carregadas continuem disponíveis em situações de instabilidade na conexão.

---

# 🪝 Hooks personalizados

O projeto utiliza hooks para separar e reutilizar comportamentos que seriam repetidos em diferentes telas.

### `useFetch`

Responsável por executar funções assíncronas e disponibilizar:

* dados retornados;
* estado de carregamento;
* estado de erro;
* função para recarregar os dados.

É utilizado para controlar os estados da tela inicial durante a obtenção do cardápio.

### `usePersistedState`

Implementa um estado semelhante ao `useState`, mas com persistência local.

Retorna:

```typescript
[valor, atualizar, pronto]
```

A propriedade `pronto` indica quando a leitura inicial dos dados armazenados foi concluída, evitando que a interface apresente temporariamente valores iniciais antes de recuperar as preferências salvas.

### `useOnline`

Utiliza o **NetInfo** para acompanhar o estado da conexão do dispositivo.

Retorna um valor booleano que indica se o dispositivo está conectado, permitindo que a aplicação apresente um aviso quando estiver offline.

---

# 🌐 Conectividade e experiência de uso

O aplicativo utiliza **NetInfo** para identificar alterações no estado da conexão.

Quando o dispositivo está sem internet, a aplicação pode apresentar um banner de aviso.

O uso combinado de conectividade e cache permite melhorar a experiência em situações nas quais a rede está indisponível ou instável.

O projeto também implementa:

* estados de carregamento;
* tratamento de erros;
* indicação de conteúdo vazio;
* atualização manual do cardápio por pull-to-refresh;
* recuperação da sessão antes da definição da rota inicial.

---

# 🚀 Splash Screen e recuperação da sessão

O projeto utiliza **Expo SplashScreen** para controlar a tela de abertura durante a inicialização.

A tela de abertura é mantida enquanto o aplicativo recupera as informações necessárias da sessão armazenada.

Essa abordagem evita que o aplicativo apresente momentaneamente a tela de login antes de identificar que existe uma sessão válida.

O estado de carregamento do `AuthContext` participa desse processo, permitindo que a navegação seja definida após a recuperação da sessão.

---

# 🛠️ Tecnologias utilizadas

## Front-end / Mobile

* **React Native**
* **Expo**
* **Expo Router**
* **TypeScript**
* **React**
* **React Context API**

## Backend

* **Node.js**
* **Express**
* **SQLite**
* **bcrypt**
* **JWT**

## Armazenamento e conectividade

* **AsyncStorage**
* **Expo SecureStore**
* **NetInfo**
* **Expo SplashScreen**

## Desenvolvimento

* **Git**
* **GitHub**
* **Figma**
* **Visual Studio Code**
* **Expo Go**

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

* Node.js;
* npm;
* Expo;
* Expo Go, caso queira executar em dispositivo físico.

## 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do projeto:

```bash
cd P1_LabHibrido-main
```

## 2. Configurar e iniciar o backend

Em um terminal, acesse a pasta do servidor:

```bash
cd server
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run dev
```

O backend será iniciado conforme a configuração do projeto.

## 3. Configurar o aplicativo

Em outro terminal, retorne à raiz do projeto:

```bash
cd P1_LabHibrido-main
```

Instale as dependências do aplicativo:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.10:3000
```

Substitua o IP pelo endereço IPv4 do computador que está executando o backend, caso utilize um dispositivo físico na mesma rede.

### Endereços conforme o ambiente

| Ambiente | URL de exemplo |
|---|---|
| Celular físico na mesma rede | `http://192.168.0.10:3000` |
| Emulador Android | `http://10.0.2.2:3000` |
| Backend local no computador | `http://localhost:3000` |

O endereço deve ser compatível com o ambiente em que o aplicativo será executado.

## 4. Iniciar o Expo

Na raiz do projeto, execute:

```bash
npx expo start
```

Também podem ser utilizados os scripts disponíveis no `package.json`:

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

Para testar as funcionalidades que dependem da API, o backend precisa estar em execução e acessível pelo dispositivo.

### Fluxo sugerido para demonstração

1. Iniciar o backend.
2. Iniciar o aplicativo Expo.
3. Abrir o aplicativo.
4. Criar uma conta.
5. Realizar login.
6. Fechar e abrir novamente o aplicativo para verificar a recuperação da sessão.
7. Navegar pelas categorias.
8. Pesquisar um produto.
9. Abrir os detalhes de uma pizza.
10. Testar tamanho e borda.
11. Adicionar uma observação.
12. Adicionar o produto ao carrinho.
13. Alterar a quantidade.
14. Adicionar produtos aos favoritos.
15. Cadastrar ou selecionar um endereço.
16. Finalizar o pedido.
17. Consultar o histórico de pedidos.
18. Acessar o perfil.
19. Alterar o tema.
20. Realizar logout.

---

# 🔒 Considerações sobre segurança

O projeto implementa mecanismos de proteção para autenticação e armazenamento de sessão, considerando seu contexto acadêmico.

Entre as medidas implementadas estão:

* utilização de bcrypt para gerar hashes das senhas no backend;
* armazenamento de usuários no banco SQLite;
* autenticação baseada em token JWT;
* validade de 7 dias para os tokens;
* armazenamento do token com Expo SecureStore;
* centralização das chamadas HTTP;
* separação entre backend e aplicativo mobile.

O token é armazenado utilizando os mecanismos de proteção disponibilizados pelo sistema operacional.

Apesar dessas medidas, o projeto não deve ser considerado uma arquitetura pronta para produção. Uma aplicação comercial exigiria avaliações adicionais de segurança, incluindo configuração de HTTPS, políticas de expiração e revogação de tokens, proteção contra tentativas abusivas de autenticação, validação de entradas e gerenciamento de permissões.

---

# ⚠️ Limitações atuais

Por se tratar de um projeto acadêmico e protótipo funcional, algumas funcionalidades foram simplificadas.

Atualmente:

* o backend utiliza SQLite;
* a autenticação é realizada por API REST;
* o cardápio possui mecanismos de consulta e cache;
* o cache local possui validade de 5 minutos;
* a disponibilidade de dados depende da conexão com o backend quando não existe cache válido;
* o cache antigo pode ser utilizado como alternativa quando a API falha;
* a taxa de entrega é simulada em R$ 5,00;
* não existe integração com gateway de pagamento;
* não existe integração real com serviço de entrega;
* informações como horário, avaliação e tempo estimado de entrega são dados de demonstração;
* os endereços são gerenciados localmente;
* o histórico de pedidos possui gerenciamento local;
* a integração completa de criação e consulta de pedidos com o backend ainda depende da implementação e validação dessas operações;
* não há integração com notificações push;
* não existe acompanhamento de pedidos em tempo real.

Essas características fazem parte do escopo acadêmico do projeto e não representam uma arquitetura comercial de produção.

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
* consumo de API REST;
* integração entre front-end e backend;
* Express;
* SQLite;
* autenticação com JWT;
* hash de senhas com bcrypt;
* persistência local;
* AsyncStorage;
* Expo SecureStore;
* cache com validade;
* hooks personalizados;
* detecção de conectividade;
* formulários;
* validação de dados;
* manipulação de listas;
* filtros e pesquisa;
* lógica de carrinho;
* gerenciamento de favoritos;
* CRUD local de endereços;
* recuperação de sessão;
* organização de projeto;
* Git e GitHub;
* desenvolvimento orientado a uma interface criada no Figma.

---

# 📂 Organização do código

Uma das decisões do projeto foi separar responsabilidades em diferentes camadas.

O aplicativo mobile fica organizado em:

```text
src/
```

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

Os hooks personalizados ficam em:

```text
src/hooks/
```

Os serviços de comunicação e armazenamento ficam em:

```text
src/services/
```

A identidade visual fica em:

```text
src/constants/
```

O backend fica separado do aplicativo mobile em:

```text
server/
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
* gerenciamento de estado;
* persistência de dados;
* consumo de API REST;
* integração com backend;
* controle de versão através do Git;
* disponibilização do projeto em repositório GitHub.

O aplicativo apresenta fluxos independentes para autenticação, cardápio, produto, favoritos, carrinho, endereço, confirmação, pedidos e perfil, além de integração com serviços externos por meio da API REST desenvolvida para o projeto.

---

# 👩‍💻 Autoria

**Sky Crizosti**  
Engenharia de Software — Universidade de Vassouras

**Moizes Baptista da Silva**
Engenharia de Software — Universidade de Vassouras

Projeto desenvolvido para fins acadêmicos e de demonstração técnica.

---

# 📄 Licença

Este projeto está disponível sob a licença **MIT**.

Consulte o arquivo [`LICENSE`](./LICENSE) para obter o texto completo da licença.

---

## 🍕 Veneto

Um projeto acadêmico desenvolvido para transformar um protótipo de interface em uma experiência mobile funcional, explorando desenvolvimento híbrido, integração entre aplicativo e backend, autenticação, gerenciamento de estado, persistência local e organização de software.
