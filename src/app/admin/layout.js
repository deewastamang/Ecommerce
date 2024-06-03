
import Header from "@/components/adminComponents/header/Header"


export default async function AdminLayout({ children }) {
  return (
    <main className="md:grid md:grid-cols-12 h-screen bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 p-1">
      <aside className="md:col-span-2">
        <Header />
      </aside>
      <section className="md:col-span-10 bg-main-bg rounded overflow-y-auto">
        {children}
      </section>
    </main>
  );
}
