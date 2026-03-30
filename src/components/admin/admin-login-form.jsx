"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(event) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const payload = await response.json();
            if (!response.ok) {
                setError(payload.message || "Login failed.");
                return;
            }

            router.push("/admin/pedidos");
            router.refresh();
        } catch {
            setError("Unable to login now. Try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle>Acesso Administrativo</CardTitle>
                <CardDescription>Entre com suas credenciais para gerenciar pedidos da DevCake.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={onSubmit} noValidate>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold" htmlFor="admin-email">E-mail</label>
                        <Input
                            id="admin-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email"
                            placeholder="admin@devcake.com"
                            aria-label="E-mail do administrador"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold" htmlFor="admin-password">Senha</label>
                        <Input
                            id="admin-password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="current-password"
                            placeholder="Sua senha"
                            aria-label="Senha do administrador"
                            required
                        />
                    </div>

                    {error ? (
                        <p
                            role="alert"
                            aria-live="assertive"
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
                        >
                            {error}
                        </p>
                    ) : null}

                    <p className="text-xs text-browndev/70">
                        Seu acesso expira automaticamente por seguranca apos algumas horas.
                    </p>

                    <Button className="w-full" type="submit" disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
