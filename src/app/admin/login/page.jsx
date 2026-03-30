import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminFromServerCookies } from "@/lib/auth/session";

export default async function AdminLoginPage() {
    const admin = await getAdminFromServerCookies();
    if (admin) {
        redirect("/admin/pedidos");
    }

    return (
        <main className="min-h-screen bg-rosecake px-4 py-12 md:px-6">
            <div className="mx-auto w-full max-w-7xl">
                <AdminLoginForm />
            </div>
        </main>
    );
}
