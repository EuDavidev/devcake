import Image from "next/image";
import styles from "./page.module.css";
import Contato  from "@/app/components/Contato/index";

export default function Home() {
  return (
    <div>
      <header>
        <div className={styles.page}>
          <h1>Topo</h1>
        </div>
      </header>
      <main>
        <div className={styles.page}>
          <h1>Main</h1>
        </div>
      </main>
      <footer>
        <div className={styles.page}>
          <Contato/>
        </div>
      </footer>
       
    </div>       
  );
}
