'use client'

import Image from 'next/image'
import React from 'react'
import styles from './NavBar.module.css'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <section >
        <div className={styles.logo}>
          <Link href="/"><img src="/logo-sem-fundo.png" alt="Logo DevCake" width={90} height={90} /></Link>
        </div>
        <ul className={styles.menu}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="#produtos">Produtos</Link></li>
          <li><Link href="#sobre">Sobre</Link></li>
          <li><Link href="#contato">Contato</Link></li>
        </ul>
      </section>
    </div>
  )
}
