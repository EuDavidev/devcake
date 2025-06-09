import { produtos } from "../data/database-devcake.js";

export const retornarProdutos = () => {
  return produtos;
};

export const buscarProduto = (textoDigitado) => {
  return produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(textoDigitado.toLowerCase()) ||
    produto.descricao.toLowerCase().includes(textoDigitado.toLowerCase())
  );
};

export const filtrarProdutos = (categoria) => {
  return produtos.filter((produto) => produto.categoria === categoria);
};