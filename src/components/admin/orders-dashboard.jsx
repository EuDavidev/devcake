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
        pending: "Pending",
        confirmed: "Confirmed",
        preparing: "Preparing",
        delivered: "Delivered",
        canceled: "Canceled",
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

    const hasData = useMemo(() => items.length > 0, [items]);

    async function loadOrders(nextStatus = status, nextQuery = query) {
        setLoading(true);
        setError("");

        try {
            const params = new URLSearchParams();
            if (nextStatus !== "all") params.set("status", nextStatus);
            if (nextQuery.trim()) params.set("q", nextQuery.trim());

            const response = await fetch(`/api/admin/orders?${params.toString()}`);
            const payload = await response.json();

            if (!response.ok) {
                setError(payload.message || "Unable to load orders.");
                setItems([]);
                return;
            }

            setItems(payload.orders || []);
        } catch {
            setError("Unable to load orders right now.");
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
                setError(payload.message || "Unable to update order status.");
                return;
            }

            setItems((current) =>
                current.map((order) =>
                    order.id === orderId
                        ? { ...order, status: payload.order.status, updatedAt: payload.order.updatedAt }
                        : order,
                ),
            );
        } catch {
            setError("Unable to update order status right now.");
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
                            <p className="text-sm uppercase tracking-wide text-browndev/75">Admin Panel</p>
                            <CardTitle>Orders Dashboard</CardTitle>
                            <p className="text-sm text-browndev/80">Signed in as {adminName || "Admin"}</p>
                        </div>
                        <Button variant="outline" onClick={logout}>Logout</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-[220px_1fr_auto]">
                            <select
                                className="h-11 rounded-xl border border-browndev/30 bg-white/80 px-3 text-sm"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                {statuses.map((item) => (
                                    <option key={item} value={item}>
                                        {item === "all" ? "All statuses" : statusLabel(item)}
                                    </option>
                                ))}
                            </select>

                            <Input
                                placeholder="Search by customer name or email"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                            />

                            <Button onClick={() => loadOrders(status, query)} disabled={loading}>
                                {loading ? "Loading..." : "Search"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {error ? (
                    <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                        {error}
                    </p>
                ) : null}

                {!loading && !hasData ? (
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-browndev/75">No orders found for the selected filters.</p>
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
                                            <p className="text-xs uppercase tracking-wide text-browndev/60">Items</p>
                                            <p className="font-semibold">{order.itemsCount}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-xs uppercase tracking-wide text-browndev/60">Total</p>
                                            <p className="font-semibold">{formatCurrency(order.total)}</p>
                                        </div>

                                        <div className="space-y-2 md:text-right">
                                            <Badge variant="secondary" className="w-fit md:ml-auto">{statusLabel(order.status)}</Badge>
                                            <select
                                                className="h-9 rounded-lg border border-browndev/30 bg-white px-2 text-xs"
                                                value={order.status}
                                                disabled={busyId === order.id}
                                                onChange={(event) => updateStatus(order.id, event.target.value)}
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
