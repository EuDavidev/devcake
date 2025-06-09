'use client';
import Cards from "./components/CardsProdutos";
import styles from "./page.module.css";

export default function Home() {
  const [listaProdutos, setListaProdutos] = useState(retornarProdutos());
  
  return (
    <div className={styles.page}>
      <h1>DevCake</h1>
    </div>
  );
}
