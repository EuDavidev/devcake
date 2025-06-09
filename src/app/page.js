import Image from "next/image";
import styles from "./page.module.css";
import Contato  from "@/app/components/Contato/index";
import FiltrarProdutos from "@/app/components/FiltrarProdutos/index";

export default function Home() {
  return (
    <div>      
      <footer>
        <div className={styles.page}>
          <FiltrarProdutos/>
          <Contato/>
        </div>
      </footer>       
    </div>       
  );
}
