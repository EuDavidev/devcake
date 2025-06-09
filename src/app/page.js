'use client';
import Cards from "./components/CardsProdutos";
import { FiltrarProdutos }  from "./components/FiltrarProdutos";
import { retornarProdutos } from "./services";
import styles from "./page.module.css";
import Contato  from "@/app/components/Contato/index";
import { useState } from "react";

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
      <section className={styles.contato}>
      <Contato/>
      </section>
    </div>
  );
}
