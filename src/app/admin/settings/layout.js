import SettingsNav from "@/components/adminComponents/settings/SettingsNav";


export default async function SettingsLayout({ children }) {
    return (
      <main className="">
        <section className="bg-gray-400/50">
            <SettingsNav />
        </section>
        <section className="md:col-span-10 bg-gray-300 rounded overflow-y-auto">
          {children}
        </section>
      </main>
    );
  }
  