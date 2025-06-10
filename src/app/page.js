
'use client';
import { useState } from "react";
import { retornarProdutos } from "./services";
import { FiltrarProdutos }  from "./components/FiltrarProdutos";
import Cards from "./components/CardsProdutos";
import Sobre from "@/app/components/Sobre";
import Contato  from "@/app/components/Contato/index";
import styles from "./page.module.css";
import Banner from './components/Banner'; 
import Navbar from "./components/Navbar";

export default function Home() {
  const [listaProdutos, setListaProdutos] = useState(retornarProdutos());
  const [textoBusca, setTextoBusca] = useState("");
  
  return (
    <div className={styles.page_content}> 
      <header>
        <Navbar/>
      </header>
      <section id="home">
        <Banner/>
      </section>
      <section id="produtos" className={styles.produtos}>
        <FiltrarProdutos 
          listaProdutos={listaProdutos}
          setListaProdutos={setListaProdutos}
          textoBusca={textoBusca}
          setTextoBusca={setTextoBusca}/>
        <Cards produtos={listaProdutos} />
      </section>
      <section id="sobre">
        <Sobre/>
      </section>
      <section className={styles.contato}>
        <div id="contato" className={styles.footer}>
          <Contato/>
        </div>
      </section>
    </div>
  );
}

