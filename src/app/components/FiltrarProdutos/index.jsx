'use client';

import { retornarProdutos, buscarProduto, filtrarProdutos } from "../../services";
import Image from "next/image";
import Styles from './FiltrarProdutos.module.css'

export const FiltrarProdutos = ({ listaProdutos, setListaProdutos, textoBusca, setTextoBusca }) => {

    const handleFiltrarProdutos = (plataforma) => {
        setListaProdutos(filtrarProdutos(plataforma));
        setTextoBusca("");
    }

    const handleLimparFiltro = () => {
        setListaProdutos(retornarProdutos());
        setTextoBusca("");
    }

    const handleBuscarProdutos = (textoDigitado) => {
        setTextoBusca(textoDigitado);
        setListaProdutos(buscarProduto(textoDigitado));
    };
    return (
        <div className={Styles.container}>
            <div className={Styles.filters}>
                <button onClick={() => handleFiltrarProdutos("Entradas")}>Entradas</button>
                <button onClick={() => handleFiltrarProdutos("Massas")}>Massas</button>
                <button onClick={() => handleFiltrarProdutos("Carnes")}>Carnes</button>
                <button onClick={() => handleFiltrarProdutos("Bebidas")}>Bebidas</button>
                <button onClick={() => handleFiltrarProdutos("Saladas")}>Saladas</button>
                <button onClick={() => handleFiltrarProdutos("Sobremesas")}>Sobremesas</button>
            </div>
            <div>
                <button className={Styles.limparFiltro} onClick={handleLimparFiltro}>
                    Limpar Filtro
                </button>
            </div>
            <div className={Styles.search}>
                <Image src={lupa} alt="search" width={20} height={20} className={Styles.lupa}/>
                <input
                    type="text"
                    value={textoBusca}
                    onChange={(event) => handleBuscarProdutos(event.target.value)}
                    placeholder="Pesquise aqui um dos pratos do nosso cardápio"
                />
            </div>
        </div>
    )
}
