
'use client';
import { useState } from "react";
import { retornarProdutos } from "./services";
import { FiltrarProdutos }  from "./components/FiltrarProdutos";
import Cards from "./components/CardsProdutos";
import Sobre from "@/app/components/Sobre";
import Contato  from "@/app/components/Contato/index";
import styles from "./page.module.css";
import Banner from './components/Banner'; 


export default function Home() {
  const [listaProdutos, setListaProdutos] = useState(retornarProdutos());
  const [textoBusca, setTextoBusca] = useState("");
  
  return (
    <div className={styles.page_content}>    
      <section className={styles.produtos}>
        <FiltrarProdutos 
          listaProdutos={listaProdutos}
          setListaProdutos={setListaProdutos}
          textoBusca={textoBusca}
          setTextoBusca={setTextoBusca}/>
        <Cards produtos={listaProdutos} />
      </section>
      <section>
        <Sobre/>
      </section>
      <section className={styles.contato}>
        <div className={styles.footer}>
          <Contato/>
        </div>
      </section>
    </div>
  );
}

