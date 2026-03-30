import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminFromServerCookies } from "@/lib/auth/session";

export default async function AdminLoginPage() {
    const admin = await getAdminFromServerCookies();
    if (admin) {
        redirect("/admin/pedidos");
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-rosecake to-rosecakeLight px-4 py-12 md:px-6">
            <div className="mx-auto w-full max-w-7xl space-y-6">
                <header className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-browndev/70">Area Restrita</p>
                    <h1 className="font-title text-3xl font-black text-browndev sm:text-4xl">Acesso Admin DevCake</h1>
                    <p className="mt-2 text-sm text-browndev/80">Gerencie pedidos com seguranca e atualize status em tempo real.</p>
                </header>
                <AdminLoginForm />
            </div>
        </main>
    );
}
