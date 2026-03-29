import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function buildOrderMessage(cart, totalPrice) {
  const header = "Olá, DevCake! Quero finalizar minha encomenda:";

  const lines = cart.map((item, index) => {
    const subtotal = item.quantity * item.preco;
    return `${index + 1}. ${item.nome} - ${item.quantity}x (${formatCurrency(item.preco)}) = ${formatCurrency(subtotal)}`;
  });

  const footer = `Total do pedido: ${formatCurrency(totalPrice)}.`;
  return [header, "", ...lines, "", footer, "", "Meu nome é:"].join("\n");
}
