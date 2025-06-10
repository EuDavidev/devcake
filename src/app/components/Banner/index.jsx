'use client';
import React, { useState, useEffect } from 'react';
import styles from './Banner.module.css';

function Banner() {
  const [currentImage, setCurrentImage] = useState(0);

  const bannerImages = [
    {
      img: '/banner.jpeg',
      title: 'Bolo de Chocolate!',
      description: 'Pode ser muito doce, mas não pode negar que é atraente'
    },
    {
      img: '/capuccino_1.webp',
      title: 'Cappucino super cremoso',
      description: 'O par perfeito para acompanhar sua manhã'
    },
    {
      img: '/croissant_1.jpg',
      title: 'Croissant quentinho!',
      description: 'Ideal para ser acompanhado de um delicioso cappuccino'
    },
    {
      img: '/tortalimao_1.png', 
      title: 'Torta de Limão!',
      description: 'Equilíbrio perfeito entre acidez, cremosidade e doce!'
    },
    {
      img: '/tortatutfrut_1.webp', 
      title: 'Torta de frutas!',
      description: 'Sabor de que? Venha me descobrir!'
    }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % bannerImages.length); //
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${bannerImages[currentImage].img})` //
        }}
      >
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <h1>{bannerImages[currentImage].title}</h1>
          <p>{bannerImages[currentImage].description}</p>
        </div>
      </div>
      
      <div className={styles.dots}>
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentImage ? styles.active : ''}`}
            onClick={() => goToImage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Banner;
