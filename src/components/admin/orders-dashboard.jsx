"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const statuses = ["all", "pending", "confirmed", "preparing", "delivered", "canceled"];

function statusLabel(status) {
    const map = {
        pending: "Pendente",
        confirmed: "Confirmado",
        preparing: "Em preparo",
        delivered: "Entregue",
        canceled: "Cancelado",
    };

    return map[status] || status;
}

export function OrdersDashboard({ adminName }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState("");
    const [status, setStatus] = useState("all");
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const hasData = useMemo(() => items.length > 0, [items]);

    async function loadOrders(nextStatus = status, nextQuery = query) {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const params = new URLSearchParams();
            if (nextStatus !== "all") params.set("status", nextStatus);
            if (nextQuery.trim()) params.set("q", nextQuery.trim());

            const response = await fetch(`/api/admin/orders?${params.toString()}`);
            const payload = await response.json();

            if (!response.ok) {
                setError(payload.message || "Nao foi possivel carregar os pedidos.");
                setItems([]);
                return;
            }

            setItems(payload.orders || []);
            setMessage("Pedidos atualizados.");
        } catch {
            setError("Nao foi possivel carregar os pedidos agora.");
            setItems([]);
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(orderId, nextStatus) {
        setBusyId(orderId);

        try {
            const response = await fetch(`/api/admin/orders/${orderId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: nextStatus }),
            });

            const payload = await response.json();
            if (!response.ok) {
                setError(payload.message || "Nao foi possivel atualizar o status do pedido.");
                return;
            }

            setItems((current) =>
                current.map((order) =>
                    order.id === orderId
                        ? { ...order, status: payload.order.status, updatedAt: payload.order.updatedAt }
                        : order,
                ),
            );
            setMessage("Status atualizado com sucesso.");
        } catch {
            setError("Nao foi possivel atualizar o status agora.");
        } finally {
            setBusyId("");
        }
    }

    async function logout() {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
    }

    useEffect(() => {
        loadOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="min-h-screen bg-productbg/30 px-4 py-10 md:px-6">
            <div className="mx-auto w-full max-w-7xl space-y-6">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-wide text-browndev/75">Painel Admin</p>
                            <CardTitle>Gestao de Pedidos</CardTitle>
                            <p className="text-sm text-browndev/80">Conectado como {adminName || "Admin"}</p>
                        </div>
                        <Button variant="outline" onClick={logout}>Sair</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-[220px_1fr_auto]">
                            <label className="sr-only" htmlFor="status-filter">Filtrar por status</label>
                            <select
                                id="status-filter"
                                className="h-11 rounded-xl border border-browndev/30 bg-white/80 px-3 text-sm"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                                aria-label="Filtrar pedidos por status"
                            >
                                {statuses.map((item) => (
                                    <option key={item} value={item}>
                                        {item === "all" ? "Todos os status" : statusLabel(item)}
                                    </option>
                                ))}
                            </select>

                            <Input
                                placeholder="Buscar por nome ou e-mail"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                aria-label="Buscar pedido por nome ou e-mail"
                            />

                            <Button onClick={() => loadOrders(status, query)} disabled={loading}>
                                {loading ? "Carregando..." : "Buscar"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {message ? (
                    <p
                        role="status"
                        aria-live="polite"
                        className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
                    >
                        {message}
                    </p>
                ) : null}

                {error ? (
                    <p
                        role="alert"
                        aria-live="assertive"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                    >
                        {error}
                    </p>
                ) : null}

                {loading ? (
                    <div className="space-y-4" aria-live="polite" aria-busy="true">
                        {[1, 2, 3].map((item) => (
                            <Card key={item}>
                                <CardContent className="pt-6">
                                    <div className="space-y-3">
                                        <div className="h-4 w-56 animate-pulse rounded bg-browndev/15" />
                                        <div className="h-3 w-72 animate-pulse rounded bg-browndev/10" />
                                        <div className="h-3 w-40 animate-pulse rounded bg-browndev/10" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : null}

                {!loading && !hasData ? (
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-browndev/75">Nenhum pedido encontrado para os filtros selecionados.</p>
                        </CardContent>
                    </Card>
                ) : null}

                {hasData ? (
                    <div className="space-y-4">
                        {items.map((order) => (
                            <Card key={order.id}>
                                <CardContent className="pt-6">
                                    <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-center">
                                        <div>
                                            <p className="font-semibold text-browndev">{order.customerName}</p>
                                            <p className="text-sm text-browndev/75">{order.customerEmail}</p>
                                            <p className="text-xs text-browndev/60">
                                                {new Date(order.createdAt).toLocaleString("pt-BR")}
                                            </p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-xs uppercase tracking-wide text-browndev/60">Itens</p>
                                            <p className="font-semibold">{order.itemsCount}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-xs uppercase tracking-wide text-browndev/60">Total</p>
                                            <p className="font-semibold">{formatCurrency(order.total)}</p>
                                        </div>

                                        <div className="space-y-2 md:text-right">
                                            <Badge variant="secondary" className="w-fit md:ml-auto">{statusLabel(order.status)}</Badge>
                                            <label className="sr-only" htmlFor={`order-status-${order.id}`}>
                                                Alterar status do pedido de {order.customerName}
                                            </label>
                                            <select
                                                id={`order-status-${order.id}`}
                                                className="h-9 rounded-lg border border-browndev/30 bg-white px-2 text-xs"
                                                value={order.status}
                                                disabled={busyId === order.id}
                                                onChange={(event) => updateStatus(order.id, event.target.value)}
                                                aria-label={`Status do pedido de ${order.customerName}`}
                                            >
                                                {statuses
                                                    .filter((item) => item !== "all")
                                                    .map((item) => (
                                                        <option key={item} value={item}>
                                                            {statusLabel(item)}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
