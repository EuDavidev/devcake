import { redirect } from "next/navigation";
import { OrdersDashboard } from "@/components/admin/orders-dashboard";
import { getAdminFromServerCookies } from "@/lib/auth/session";

export default async function AdminOrdersPage() {
    const admin = await getAdminFromServerCookies();

    if (!admin) {
        redirect("/admin/login");
    }

    return <OrdersDashboard adminName={admin.name || admin.email} />;
}
