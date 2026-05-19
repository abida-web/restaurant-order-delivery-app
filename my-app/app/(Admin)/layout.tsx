import Sidebar from "@/app/(Admin)/_components/Sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return redirect("/");
  }
  return (
    <div className="flex h-full">
      {" "}
      <Sidebar />
      <main className="flex-1 p-6 mt-9 md:ml-60">{children}</main>
    </div>
  );
}
