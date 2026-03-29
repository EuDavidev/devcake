"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RatingStars } from "@/components/common/rating-stars";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export function ProductModal({ open, onOpenChange, product }) {
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore((state) => state.addToCart);

    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
                    <div className="relative h-56 overflow-hidden rounded-2xl md:h-full">
                        <Image src={product.imagem} alt={product.nome} fill className="object-cover" />
                    </div>

                    <div className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>{product.nome}</DialogTitle>
                            <DialogDescription>{product.descricao}</DialogDescription>
                        </DialogHeader>

                        <Badge variant="secondary" className="w-fit">{product.categoria}</Badge>
                        <p className="font-title text-3xl font-black">{formatCurrency(product.preco)}</p>
                        <RatingStars value={5} />

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</Button>
                            <span className="w-10 text-center font-semibold">{quantity}</span>
                            <Button variant="outline" size="icon" onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
                        </div>

                        <Button
                            className="w-full"
                            onClick={() => {
                                addToCart(product, quantity);
                                onOpenChange(false);
                                setQuantity(1);
                            }}
                        >
                            Adicionar ao Carrinho
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
