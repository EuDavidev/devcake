'use client';

import { retornarProdutos, buscarProduto, filtrarProdutos } from "../../services";
import Styles from './FiltrarProdutos.module.css'
import Image from "next/image";
import lupa from "../../../../public/assets/icons/search.png"

export const FiltrarProdutos = ({ listaProdutos, setListaProdutos, textoBusca, setTextoBusca }) => {

    const handleFiltrarProdutos = (produtos) => {
        setListaProdutos(filtrarProdutos(produtos));
        setTextoBusca("");
    }

    const handleBuscarProdutos = (textoDigitado) => {
        setTextoBusca(textoDigitado);
        setListaProdutos(buscarProduto(textoDigitado));
    };
    
    return (
        <div className={Styles.container}>
            <h1 className={Styles.titulo}>Produtos</h1>
            <div className={Styles.search}>
                <Image src={lupa} width={20} height={20} alt="Ícone de busca" className={Styles.lupa}/>
                <input
                    type="text"
                    value={textoBusca}
                    onChange={(event) => handleBuscarProdutos(event.target.value)}
                    placeholder="Pesquise aqui um dos pratos do nosso cardápio"
                />
            </div>
            <div className={Styles.filters}>
                <button onClick={() => handleFiltrarProdutos("Tortas")}>Tortas</button>
                <button onClick={() => handleFiltrarProdutos("Sobremesas")}>Sobremesas</button>
                <button onClick={() => handleFiltrarProdutos("Fatia")}>Fatia</button>
                <button onClick={() => handleFiltrarProdutos("Bolos")}>Bolos</button>
            </div>
        </div>
    )
}
