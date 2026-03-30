"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/lib/store";
import { submitOrder } from "@/lib/order-client";

const contactSchema = z.object({
    nome: z.string().min(3, "Informe seu nome completo."),
    email: z.string().email("E-mail inválido."),
    mensagem: z.string().min(10, "Escreva pelo menos 10 caracteres."),
});

export function ContactSection() {
    const checkoutMessage = useCartStore((state) => state.checkoutMessage);
    const setCheckoutMessage = useCartStore((state) => state.setCheckoutMessage);
    const clearCart = useCartStore((state) => state.clearCart);
    const cart = useCartStore((state) => state.cart);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            nome: "",
            email: "",
            mensagem: "",
        },
    });

    useEffect(() => {
        if (!checkoutMessage) return;
        setValue("mensagem", checkoutMessage, { shouldValidate: true, shouldTouch: true });
    }, [checkoutMessage, setValue]);

    const onSubmit = async (values) => {
        setSubmitError("");
        setSubmitSuccess("");

        if (cart.length === 0) {
            setSubmitError("Seu carrinho esta vazio. Adicione itens antes de enviar o pedido.");
            return;
        }

        const payload = {
            customerName: values.nome.trim(),
            customerEmail: values.email.trim().toLowerCase(),
            notes: values.mensagem?.trim() || "",
            items: cart.map((item) => ({
                productId: String(item.id),
                quantity: item.quantity,
            })),
        };

        try {
            const created = await submitOrder(payload);
            clearCart();
            setCheckoutMessage("");
            reset();
            setSubmitSuccess(`Pedido ${created.orderId} criado com sucesso.`);
        } catch (error) {
            setSubmitError(error.message || "Nao foi possivel enviar o pedido agora.");
        }
    };

    return (
        <section id="contato" className="bg-rosecake py-16">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:grid-cols-2 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="space-y-4"
                >
                    <p className="text-sm font-semibold uppercase tracking-widest text-browndev/70">Contato</p>
                    <h2 className="font-title text-3xl font-black sm:text-4xl">Fale com a DevCake</h2>
                    <p className="text-browndev/85">
                        Envie sua ideia de encomenda e retornamos rapidamente com sugestões de sabores e valores.
                    </p>

                    {checkoutMessage && (
                        <p className="rounded-xl border border-browndev/20 bg-rosecakeLight px-4 py-3 text-sm font-semibold">
                            Pedido carregado automaticamente no campo de mensagem. Agora é só enviar.
                        </p>
                    )}

                    <div className="flex flex-wrap gap-3 pt-2">
                        <Button asChild variant="outline">
                            <Link href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
                                <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="https://instagram.com/devcake.oficial" target="_blank" rel="noreferrer">
                                <Camera className="mr-1 h-4 w-4" /> Instagram
                            </Link>
                        </Button>
                    </div>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 rounded-3xl border border-browndev/20 bg-rosecakeLight p-6 shadow-lg"
                    noValidate
                >
                    <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input id="nome" placeholder="Seu nome" {...register("nome")} aria-invalid={!!errors.nome} />
                        {errors.nome && <p className="text-xs text-red-700">{errors.nome.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" placeholder="você@email.com" {...register("email")} aria-invalid={!!errors.email} />
                        {errors.email && <p className="text-xs text-red-700">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mensagem">Mensagem</Label>
                        <Textarea id="mensagem" placeholder="Conte sua ideia de encomenda" {...register("mensagem")} aria-invalid={!!errors.mensagem} />
                        {errors.mensagem && <p className="text-xs text-red-700">{errors.mensagem.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Enviar Pedido"}
                    </Button>
                    {submitSuccess && (
                        <p className="rounded-xl border border-emerald-700/25 bg-emerald-50 px-3 py-2 text-center text-sm font-semibold text-emerald-800">
                            {submitSuccess}
                        </p>
                    )}
                    {submitError && (
                        <p className="rounded-xl border border-red-700/25 bg-red-50 px-3 py-2 text-center text-sm font-semibold text-red-800">
                            {submitError}
                        </p>
                    )}
                </motion.form>
            </div>
        </section>
    );
}
