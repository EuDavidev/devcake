"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { produtos, categorias } from "@/data/produtos";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductModal } from "@/components/produtos/product-modal";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const previous = button.getElementsByClassName("ripple")[0];
    if (previous) previous.remove();

    button.appendChild(circle);
}

export function ProductsSection() {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [feedback, setFeedback] = useState("");
    const addToCart = useCartStore((state) => state.addToCart);

    const filteredProducts = useMemo(() => {
        if (activeCategory === "Todos") return produtos;
        return produtos.filter((item) => item.categoria === activeCategory);
    }, [activeCategory]);

    return (
        <section id="produtos" className="bg-productbg/65 py-16">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-browndev/75">Catálogo artesanal</p>
                        <h2 className="font-title text-3xl font-black sm:text-4xl">Produtos DevCake</h2>
                    </div>

                    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar produtos por categoria">
                        {categorias.map((categoria) => (
                            <Button
                                key={categoria}
                                variant={activeCategory === categoria ? "default" : "outline"}
                                size="sm"
                                role="tab"
                                aria-selected={activeCategory === categoria}
                                onClick={() => setActiveCategory(categoria)}
                            >
                                {categoria}
                            </Button>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.06 },
                        },
                    }}
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {filteredProducts.map((product) => (
                        <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}>
                            <Card className="group h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <div className="relative h-44 overflow-hidden">
                                    <Image
                                        src={product.imagem}
                                        alt={product.nome}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <CardContent className="flex h-[240px] flex-col pt-5">
                                    <div className="mb-3 flex items-start justify-between gap-2">
                                        <h3 className="font-title text-xl font-bold leading-tight">{product.nome}</h3>
                                        <Badge variant="secondary">{product.categoria}</Badge>
                                    </div>
                                    <p className="line-clamp-3 text-sm text-browndev/80">{product.descricao}</p>
                                    <p className="mt-auto pt-4 font-title text-2xl font-black">{formatCurrency(product.preco)}</p>
                                    <div className="mt-3 grid grid-cols-2 gap-2">
                                        <Button
                                            variant="secondary"
                                            className="ripple-container"
                                            onClick={(event) => {
                                                createRipple(event);
                                                addToCart(product, 1);
                                                setFeedback(`${product.nome} adicionado ao carrinho.`);
                                                window.setTimeout(() => setFeedback(""), 1800);
                                            }}
                                        >
                                            Encomendar
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setModalOpen(true);
                                            }}
                                        >
                                            Detalhes
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <ProductModal open={modalOpen} onOpenChange={setModalOpen} product={selectedProduct} />

            {feedback && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-emerald-800/20 bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-900 shadow-lg"
                >
                    {feedback}
                </motion.div>
            )}
        </section>
    );
}
