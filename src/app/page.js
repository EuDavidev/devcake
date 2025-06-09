import Image from "next/image";
import styles from "./page.module.css";
import Contato  from "@/app/components/Contato/index";

export default function Home() {
  return (
    <div>      
      <footer>
        <div className={styles.page}>
          <Contato/>
        </div>
      </footer>       
    </div>       
  );
}
