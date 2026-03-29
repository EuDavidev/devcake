"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
    return (
        <section id="sobre" className="py-16">
            <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 md:grid-cols-2 md:px-6">
                <motion.div
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="relative h-80 overflow-hidden rounded-[2rem] border border-browndev/15 shadow-lg"
                >
                    <Image src="/foto1.jpg" alt="Cozinha da DevCake" fill className="object-cover" loading="lazy" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="space-y-4"
                >
                    <p className="text-sm font-semibold uppercase tracking-widest text-browndev/70">Sobre a DevCake</p>
                    <h2 className="font-title text-3xl font-black sm:text-4xl">Confeitaria artesanal com alma de produto digital</h2>
                    <p className="text-browndev/85">
                        A DevCake nasceu para transformar pausas de código em momentos inesquecíveis. Cada receita é feita em
                        pequenos lotes, com ingredientes selecionados e acabamento autoral.
                    </p>
                    <p className="text-browndev/85">
                        Nosso cardápio combina bolos, tortas, fatias e salgados com um atendimento próximo, rápido e orientado à
                        experiência. Do primeiro clique até a última colherada, o foco é surpreender.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
