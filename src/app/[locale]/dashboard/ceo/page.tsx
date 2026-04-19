import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CEOOverview from "@/components/dashboard/CEOOverview";

export default async function CEODashboardPage() {
    const session = await auth();

    // Redirection for non-CEO users
    if (!session || session.user.role !== "CEO") {
        redirect("/dashboard");
    }

    return <CEOOverview />;
}
