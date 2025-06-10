import styles from './Sobre.module.css';
import Image from 'next/image';

export default function Sobre() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Sobre</h1>
      
      <section className={styles.section}>
        <div className={styles.content}>
          <div className={styles.textGroup}>
            <h2 className={styles.title}>NASCIMENTO DA<br />CONFEITARIA DEVCAKE</h2>
            <p className={styles.text}>
              Na DevCake, tudo começou com uma xícara de café e um teclado. Somos programadores apaixonados que encontraram na pausa para um doce ou salgado o toque de conforto que torna cada linha de código mais inspirada.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image 
              src="/foto2.jpg" 
              alt="Confeitaria DevCake" 
              width={400} 
              height={300}
              className={styles.image}
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image 
              src="/foto1.jpg" 
              alt="Confeitaria DevCake" 
              width={400} 
              height={300}
              className={styles.image}
            />
          </div>
          <div className={styles.textGroup}>
            <h2 className={styles.title}>DESDE ENTÃO...</h2>
            <p className={styles.text}>
              Criamos um espaço onde a tradição da confeitaria se mistura ao prazer de compartilhar momentos simples e saborosos. Aqui, cada receita carrega o carinho de uma memória caseira, feita para unir pessoas de todas as idades em torno de um café e um sorriso.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
