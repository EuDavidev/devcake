"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store";
import { buildOrderMessage, formatCurrency } from "@/lib/utils";

const links = [
    { href: "#inicio", label: "Início" },
    { href: "#produtos", label: "Produtos" },
    { href: "#sobre", label: "Sobre" },
    { href: "#contato", label: "Contato" },
];

export function Navbar() {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const setCheckoutMessage = useCartStore((state) => state.setCheckoutMessage);
    const totalItems = useCartStore((state) => state.totalItems());
    const totalPrice = useCartStore((state) => state.totalPrice());

    const handleFinalizeOrder = () => {
        if (cart.length === 0) return;

        const message = buildOrderMessage(cart, totalPrice);
        setCheckoutMessage(message);

        if (typeof window !== "undefined") {
            window.location.hash = "contato";
        }
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-browndev/20 bg-rosecakeLight/90 backdrop-blur-md">
            <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 md:px-6">
                <Link href="#inicio" className="flex items-center gap-3">
                    <Image src="/logo-sem-fundo.png" alt="Logo DevCake" width={50} height={50} className="h-12 w-12" priority />
                    <span className="font-title text-2xl font-black tracking-tight text-browndev">DevCake</span>
                </Link>

                <nav className="hidden items-center gap-7 md:flex">
                    {links.map((item) => (
                        <Link key={item.href} href={item.href} className="text-sm font-semibold text-browndev transition hover:text-browndev/70">
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="Abrir carrinho" className="relative">
                                <ShoppingCart className="h-4 w-4" />
                                {totalItems > 0 && (
                                    <Badge className="absolute -right-2 -top-2 h-5 min-w-5 justify-center p-0 text-[10px]">
                                        {totalItems}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <CartSheet cart={cart} totalPrice={totalPrice} onRemove={removeFromCart} onFinalize={handleFinalizeOrder} />
                    </Sheet>

                    <Button asChild size="lg" className="font-title">
                        <Link href="#contato">Encomendar Agora</Link>
                    </Button>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="Abrir carrinho" className="relative">
                                <ShoppingCart className="h-4 w-4" />
                                {totalItems > 0 && (
                                    <Badge className="absolute -right-2 -top-2 h-5 min-w-5 justify-center p-0 text-[10px]">
                                        {totalItems}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <CartSheet cart={cart} totalPrice={totalPrice} onRemove={removeFromCart} onFinalize={handleFinalizeOrder} />
                    </Sheet>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Abrir menu mobile">
                                <motion.div whileTap={{ scale: 0.9 }}>
                                    <Menu className="h-5 w-5" />
                                </motion.div>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="mt-8 flex flex-col gap-4">
                                {links.map((item) => (
                                    <Link key={item.href} href={item.href} className="rounded-xl bg-rosecake px-4 py-3 font-semibold text-browndev">
                                        {item.label}
                                    </Link>
                                ))}
                                <Button asChild className="mt-2">
                                    <Link href="#contato">Encomendar Agora</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

function CartSheet({ cart, totalPrice, onRemove, onFinalize }) {
    return (
        <SheetContent side="right">
            <SheetHeader>
                <SheetTitle>Seu Carrinho</SheetTitle>
            </SheetHeader>

            <div className="flex h-full flex-col">
                <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-2">
                    {cart.length === 0 ? (
                        <p className="rounded-xl bg-rosecake p-4 text-sm">Seu carrinho está vazio por enquanto.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between rounded-xl border border-browndev/15 bg-white/70 p-3">
                                <div>
                                    <p className="font-semibold">{item.nome}</p>
                                    <p className="text-xs text-browndev/75">{item.quantity} x {formatCurrency(item.preco)}</p>
                                </div>
                                <Button size="icon" variant="ghost" aria-label={`Remover ${item.nome}`} onClick={() => onRemove(item.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-5 rounded-2xl border border-browndev/20 bg-rosecake p-4">
                    <p className="text-sm text-browndev/80">Total</p>
                    <p className="font-title text-2xl font-bold">{formatCurrency(totalPrice)}</p>
                    <p className="mt-2 text-xs text-browndev/75">
                        Ao finalizar, vamos preencher automaticamente sua mensagem com todos os itens do carrinho.
                    </p>
                    <Button className="mt-3 w-full" onClick={onFinalize} disabled={cart.length === 0}>
                        Finalizar Pedido via Contato
                    </Button>
                </div>
            </div>
        </SheetContent>
    );
}
