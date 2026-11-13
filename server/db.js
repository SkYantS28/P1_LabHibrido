const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "database.db");

let db = null;

async function initDatabase() {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha_hash TEXT NOT NULL,
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      preco REAL NOT NULL,
      categoria TEXT,
      imagem TEXT
    );

    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      itens TEXT NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'pendente',
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );
  `);

  const result = db.exec("SELECT COUNT(*) as total FROM produtos");
  const total = result[0].values[0][0];

  if (total === 0) {
    db.run(`
      INSERT INTO produtos (nome, descricao, preco, categoria) VALUES
        ('Pizza Margherita', 'Molho de tomate, mussarela e manjericão', 45.90, 'Tradicional'),
        ('Pizza Calabresa', 'Calabresa fatiada, cebola e orégano', 49.90, 'Tradicional'),
        ('Pizza Quatro Queijos', 'Mussarela, provolone, gorgonzola e parmesão', 55.90, 'Especial'),
        ('Pizza Pepperoni', 'Pepperoni, mussarela e molho especial', 52.90, 'Especial'),
        ('Pizza Portuguesa', 'Presunto, ovos, cebola, azeitona e mussarela', 51.90, 'Tradicional'),
        ('Pizza Vegetariana', 'Abobrinha, berinjela, pimentão e tomate', 48.90, 'Vegetariana');
    `);
    saveDatabase();
  }

  return db;
}

function saveDatabase() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function getDb() {
  if (!db) {
    throw new Error("Banco não inicializado. Chame initDatabase() primeiro.");
  }
  return db;
}

module.exports = { initDatabase, getDb, saveDatabase };