
import Header from "@/components/adminComponents/header/Header"


export default async function AdminLayout({ children }) {
  return (
    <main className="md:grid md:grid-cols-12 h-screen p-1 bg-gray-200">
      <aside className="md:col-span-2">
        <Header />
      </aside>
      <section className="md:col-span-10 bg-gray-300 rounded overflow-y-auto">
        {children}
      </section>
    </main>
  );
}
