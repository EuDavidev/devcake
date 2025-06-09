import styles from './CardsProdutos.module.css';
import Image from 'next/image';

export default function Cards({ produtos }) {
  if (!Array.isArray(produtos)) {
    return <div>Erro: Nenhum produto fornecido</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {produtos.slice(0, 21).map((produto) => (
          <div key={produto.id} className={styles.card}>
            <div className={styles.content}>
              <h3>{produto.nome || 'Nome não disponível'}</h3>
              <div className={styles.imageContainer}>
                <Image
                  src={produto.imagem || '/placeholder.jpg'}
                  alt={produto.nome || 'Imagem do produto'}
                  className={styles.image}
                  width={200}
                  height={200}
                />
              </div>
              <p className={styles.description}>{produto.descricao || 'Descrição não disponível'}</p>
              <span className={styles.preco}>R$ {produto.preco.toFixed(2) || '0.00'}</span>
              <button className={styles.buttonCompra}>Encomendar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
                                                                                                                                                                                                                                                                                                                                                                                                                              