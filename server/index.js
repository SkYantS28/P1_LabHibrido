const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { initDatabase, getDb, saveDatabase } = require("./db");

const app = express();
const PORT = 3000;
const JWT_SECRET = "veneto_secret_dev";

app.use(cors());
app.use(express.json());

// Middleware de autenticação
function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não enviado" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuarioId = payload.id;
    next();
  } catch {
    return res.status(401).json({ erro: "Token inválido" });
  }
}

// GET /api/produtos — lista todas as pizzas
app.get("/api/produtos", (req, res) => {
  const db = getDb();
  const result = db.exec("SELECT * FROM produtos");

  if (!result[0]) {
    return res.json([]);
  }

  const colunas = result[0].columns;
  const produtos = result[0].values.map((linha) => {
    const obj = {};
    colunas.forEach((col, i) => (obj[col] = linha[i]));
    return obj;
  });

  res.json(produtos);
});

// POST /api/usuarios — cadastro
app.post("/api/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Nome, email e senha são obrigatórios" });
  }

  const db = getDb();
  const emailNormalizado = email.trim().toLowerCase();

  const existente = db.exec(
    `SELECT id FROM usuarios WHERE email = '${emailNormalizado}'`
  );

  if (existente[0] && existente[0].values.length > 0) {
    return res.status(409).json({ erro: "Email já cadastrado" });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  db.run(
    `INSERT INTO usuarios (nome, email, senha_hash) VALUES ('${nome}', '${emailNormalizado}', '${senhaHash}')`
  );
  saveDatabase();

  res.status(201).json({ mensagem: "Usuário criado com sucesso" });
});

// POST /api/login — autenticação
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios" });
  }

  const db = getDb();
  const emailNormalizado = email.trim().toLowerCase();

  const result = db.exec(
    `SELECT * FROM usuarios WHERE email = '${emailNormalizado}'`
  );

  if (!result[0] || result[0].values.length === 0) {
    return res.status(401).json({ erro: "Email ou senha inválidos" });
  }

  const colunas = result[0].columns;
  const linha = result[0].values[0];
  const usuario = {};
  colunas.forEach((col, i) => (usuario[col] = linha[i]));

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

  if (!senhaCorreta) {
    return res.status(401).json({ erro: "Email ou senha inválidos" });
  }

  const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: "7d" });

  res.json({
    token,
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
  });
});

// GET /api/pedidos — pedidos do usuário logado
app.get("/api/pedidos", autenticar, (req, res) => {
  const db = getDb();
  const result = db.exec(
    `SELECT * FROM pedidos WHERE usuario_id = ${req.usuarioId} ORDER BY id DESC`
  );

  if (!result[0]) {
    return res.json([]);
  }

  const colunas = result[0].columns;
  const pedidos = result[0].values.map((linha) => {
    const obj = {};
    colunas.forEach((col, i) => (obj[col] = linha[i]));
    obj.itens = JSON.parse(obj.itens);
    return obj;
  });

  res.json(pedidos);
});

// POST /api/pedidos — cria pedido
app.post("/api/pedidos", autenticar, (req, res) => {
  const { itens, total } = req.body;

  if (!itens || !total) {
    return res.status(400).json({ erro: "Itens e total são obrigatórios" });
  }

  const db = getDb();
  db.run(
    `INSERT INTO pedidos (usuario_id, itens, total) VALUES (${req.usuarioId}, '${JSON.stringify(itens)}', ${total})`
  );
  saveDatabase();

  res.status(201).json({ mensagem: "Pedido criado com sucesso" });
});

// Inicia o servidor
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});