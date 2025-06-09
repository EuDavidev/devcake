import bauru from "/public/bauru.jpg";
import boloChocolateFrutas from "/public/bolo-chocolate-frutas.jpg";
import boloMorango from "/public/bolo-morango.jpg";
import brownies from "/public/brownies.jpg";
import chocolate from "/public/chocolate.jpg";
import cookies from "/public/cookies.jpg";
import coxinha from "/public/coxinha.jpg";
import croissant from "/public/croissant.jpg";
import cupkake from "/public/cupcake.jpg";
import donuts from "/public/donuts.jpg";
import fatiaCereja from "/public/fatia-cereja.jpg";
import fatiaChocolateNozes from "/public/fatia-chocolate-nozes.jpg";
import fatiaChocolate from "/public/fatia-chocolate.jpg";
import foleado from "/public/foleado.jpg";
import muffin from "/public/muffin.jpg";
import pancakes from "/public/pancakes.jpg";
import pretzel from "/public/pretzel.jpg";
import tortaAbacate from "/public/torta-abacate.jpg";
import tortaBluberry from "/public/torta-blueberry.jpg";
import tortaFrutasVermelhas from "/public/torta-frutas-vermelhas.jpg";
import tortaMorango from "/public/torta-morango.jpg";


export const produtos = [
  {
    id: 1,
    nome: "Bauru",
    categoria: "Salgados",
    preco: 24.90,
    descricao:
      "Pão caseiro, rosbife, tomate, picles e queijos prato, gouda, suíço e estepe derretidos.",
    imagem: bauru,
  },
  {
    id: 2,
    nome: "Bolo Chocolate Frutas",
    categoria: "Bolos",
    preco: 91.00,
    descricao:
      "Massa de chocolate molhadinha, recheio de brigadeiro tradicional com frutas picadas",
    imagem: boloChocolateFrutas,
  },
  {
    id: 3,
    nome: "Bolo Morango",
    categoria: "Bolos",
    preco: 96.00,
    descricao:
      "Massa pão de ló, umedecido com calda, recheado com creme e morango.",
    imagem: boloMorango,
  },
  {
    id: 4,
    nome: "Brownies",
    categoria: "Sobremesas",
    preco: 15.00,
    descricao:
      "Fatia de Brownie de Ganache de Chocolate decorada com Brigadeiros 50% Cacau com Confeitos de Chocolate",
    imagem: brownies,
  },
  {
    id: 5,
    nome:  "Chocolate Barra",
    categoria: "Sobremesas",
    preco: 20.00,
    descricao:
      "Barra de chocolate artesanal feita com nosso chocolate nobre temperado, uma escolha perfeita para presentear ou se deliciar!",
    imagem: chocolate,
  },
  {
    id: 6,
    nome: "Cookies",
    categoria: "Sobremesas",
    preco: 24.90,
    descricao:
      "Um cookie de massa de chocolate com toque de café e finalizado com pedaços de biscoito. Para os amantes do café, puro deleite do começo ao fim.",
    imagem: cookies,
  },
  {
    id: 7,
    nome: "Coxinha",
    categoria: "Salgados",
    preco: 20.00,
    descricao:
      "Coxinha dourada, crocante e bem recheada: frango desfiado temperado na medida. O clássico que nunca sai de moda!",
    imagem: coxinha,
  },
  {
    id: 8,
    nome: "Croissant",
    categoria: "Salgados",
    preco: 13.00,
    descricao:
      "Croissant artesanal: dourado, crocante fora, macio dentro e com sabor inconfundível de manteiga fresca. Perfeito com café!",
    imagem: croissant,
  },
  {
    id: 9,
    nome: "Cupcake",
    categoria: "Sobremesas",
    preco: 12.00,
    descricao:
      "Massa de chocolate ou baunilha e recheios de branquinho ou doce de leite.",
    imagem: cupkake,
  },
  {
    id: 10,
    nome: "Donuts",
    categoria: "Sobremesas",
    preco: 18.99,
    descricao:
      "Cada donut é uma obra-prima da confeitaria, feita com uma massa macia e fofa, coberta com um generoso chocolate e um recheio maravilhoso de Brigadeiro.",
    imagem: donuts,
  },
  {
    id: 11,
    nome: "Fatia Cereja",
    categoria: "Fatia",
    preco: 19.00,
    descricao:
      "Bolo de massa de chocolate, recheio de mousse branca com cerejas, cobertura de mousse branca, raspas de chocolate ao leite e cerejas",
    imagem: fatiaCereja,
  },
  {
    id: 12,
    nome: "Fatia Chocolate Nozes",
    categoria: "Fatia",
    preco: 19.90,
    descricao:
      "Massa de chocolate molhada com calda de chocolate e recheada com creme de nozes. Decorado com cobertura de ganache e nozes trituradas.",
    imagem: fatiaChocolateNozes,
  },
  {
    id: 13,
    nome: "Fatia Chocolate",
    categoria: "Fatia",
    preco: 12.90,
    descricao:
      "Massa de bolo de chocolate com cobertura de brigadeiro belga.",
    imagem: fatiaChocolate,
  },
  {
    id: 14,
    nome: "Foleado",
    categoria: "Salgados",
    preco: 19.00,
    descricao:
      "O salgado folhado gourmet é um lanche delicioso, com recheio fiambres e uma bela crocância da massa amanteigada.",
    imagem: foleado,
  },
  {
    id: 15,
    nome: "Muffin",
    categoria: "Salgados",
    preco: 19.00,
    descricao:
      "Os muffins são super levinhos, parecem uma nuvem, e isso é o sucesso deste produto aliado ao sabor todo especial.",
    imagem: muffin,
  },
  {
    id: 16,
    nome: "pancakes",
    categoria: "Sobremesas",
    preco: 27.00,
    descricao:
      "É perfeita para ser acompanhada por calda de chocolate, frutas e mel.",
    imagem: pancakes,
  },
  {
    id: 17,
    nome: "pretzel",
    categoria: "Salgados",
    preco: 27.50,
    descricao:
      "Assado com sal, massa característica e sabor irresistível. Prático para ocasiões especiais.",
    imagem: pretzel,
  },
  {
    id: 18,
    nome: "Torta Abacate",
    categoria: "Tortas",
    preco: 80.00,
    descricao:
      "Massa úmida e aerada, feita com abacate batido no liquidificador com ovos, açúcar e óleo, assada no forno. Verde característico, sabor suave e levemente adocicado.",
    imagem: tortaAbacate,
  },
  {
    id: 19,
    nome: "Torta bluberry",
    categoria: "Tortas",
    preco: 79.00,
    descricao:
      "Feita com farinha de amêndoas, farinha de coco, e óleo de coco, a massa é leve e rica em fibras. O recheio é composto por mirtilos e amoras frescas adoçados.",
    imagem: tortaBluberry,
  },
  {
    id: 20,
    nome: "Torta Frutas Vermelhas",
    categoria: "Tortas",
    preco: 109.95,
    descricao:
      "Massa Branca, creme especial, nata, mirtilo, morango, e amora. Inteira rende em média 14 fatias.",
    imagem: tortaFrutasVermelhas,
  },
  {
    id: 21,
    nome: "Torta Morango",
    categoria: "Tortas",
    preco: 88.00,
    descricao:
      "Nossa massa sucrée, crocante e levemente adocicada, é delicadamente recheada com um creme branco aveludado que proporciona uma doçura suave e reconfortante.",
    imagem: tortaMorango,
  },
];
