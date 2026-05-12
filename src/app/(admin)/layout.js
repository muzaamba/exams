import Navbar from '@/components/layout/Navbar';

export const metadata = { title: 'Admin — Zeweno' };

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </>
  );
}
