const API_URL = "http://192.168.100.8:3000/api";

type Produto = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string | null;
};

type LoginResponse = {
  token: string;
  usuario: { id: number; nome: string; email: string };
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro na requisição");
  }

  return data as T;
}

export const api = {
  getProdutos: () => request<Produto[]>("/produtos"),

  cadastrar: (nome: string, email: string, senha: string) =>
    request<{ mensagem: string }>("/usuarios", {
      method: "POST",
      body: JSON.stringify({ nome, email, senha }),
    }),

  login: (email: string, senha: string) =>
    request<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    }),

  getPedidos: (token: string) =>
    request<any[]>("/pedidos", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  criarPedido: (token: string, itens: any[], total: number) =>
    request<{ mensagem: string }>("/pedidos", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ itens, total }),
    }),
};