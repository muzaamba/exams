import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';

export const metadata = {
  title: 'Dashboard — Zeweno',
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="pt-16 lg:pl-[240px] pb-20 lg:pb-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
      <MobileNav />
    </>
  );
}
