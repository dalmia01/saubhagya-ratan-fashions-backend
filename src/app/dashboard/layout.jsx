import { cookies } from "next/headers";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default function DashboardLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const user = verifyToken(token);
  if (!user) {
    // Redirect to login if token is missing or invalid
    redirect("/login");
  }


  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
