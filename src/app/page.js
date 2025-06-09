'use client';
import Cards from "./components/CardsProdutos";
import styles from "./page.module.css";
import { useState } from "react";
import { retornarProdutos } from "./services";

export default function Home() {
  const [listaProdutos, setListaProdutos] = useState(retornarProdutos());
  
  return (
    <div className={styles.page}>
      <h1>DevCake</h1>
      <section className={styles.secaoprodutos}>
        <div className={styles.spacer}>
          <Cards produtos={listaProdutos} />
        </div>
      </section>
    </div>
  );
}
