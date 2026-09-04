import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookOpen, Bookmark, Calculator,
  Settings, LogOut, ArrowLeft, ShieldCheck, Moon, Sun, Menu, X,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const adminNav = [
  { label: 'Overview', path: '/admin', icon: LayoutDashboard },
  { label: 'Feedback Messages', path: '/admin/feedback', icon: MessageSquare },
  { label: 'User Management', path: '/admin/users', icon: Users },
  { label: 'Surahs Catalog', path: '/admin/quran', icon: BookOpen },
  { label: 'Bookmarks Log', path: '/admin/bookmarks', icon: Bookmark },
  { label: 'Admin Profile', path: '/admin/profile', icon: ShieldCheck },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex transition-colors duration-200">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-[var(--border-color)] bg-[var(--bg-card)] hidden md:flex flex-col justify-between p-5 fixed top-0 bottom-0 z-40">
        <div>
          {/* Logo & Admin Badge */}
          <div className="flex items-center gap-3 pb-6 border-b border-[var(--border-color)] mb-6">
            <img
              src="/logo.png"
              alt="Rah-e-Hidayat"
              className="w-10 h-10 rounded-xl object-cover shadow-md"
            />
            <div>
              <h2 className="font-display font-bold text-base text-[var(--text-main)] leading-tight">
                Rah-e-Hidayat
              </h2>
              <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {adminNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive(item.path)
                    ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013] shadow-xs'
                    : 'text-[var(--text-muted)] hover:bg-[#0F5132]/8 hover:text-[var(--text-main)]'
                }`}
              >
                <item.icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
          {/* Return to Main Site */}
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[var(--primary-main)] hover:bg-[var(--primary-light)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Website
          </Link>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/5 w-full text-left transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          {/* Sign Out */}
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 w-full text-left transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile Admin Top Bar */}
        <header className="h-16 border-b border-[var(--border-color)] bg-[var(--bg-card)] px-4 flex items-center justify-between md:hidden sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-[var(--text-muted)] hover:bg-black/5"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-display font-bold text-sm text-[var(--text-main)]">Admin Dashboard</span>
          </div>

          <Link to="/" className="text-xs font-bold text-[var(--primary-main)]">
            Main Site →
          </Link>
        </header>

        {/* Mobile Drawer */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-64 max-w-[80%] bg-[var(--bg-card)] p-5 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-4">
                  <span className="font-display font-bold text-sm">Rah-e-Hidayat Admin</span>
                  <button onClick={() => setSidebarOpen(false)} className="p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {adminNav.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold ${
                        isActive(item.path)
                          ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013]'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="pt-4 border-t border-[var(--border-color)]">
                <Link to="/" className="block text-xs font-bold text-[var(--primary-main)] py-2">
                  ← Return to Website
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Page View Body */}
        <main className="p-5 sm:p-8 lg:p-10 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
