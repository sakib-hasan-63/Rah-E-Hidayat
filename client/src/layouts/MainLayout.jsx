import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import BottomNav from '../components/navbar/BottomNav';
import Footer from '../components/footer/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-200">
      <Navbar />
      <main className="flex-1 pt-20 lg:pt-22 pb-16 main-content">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
