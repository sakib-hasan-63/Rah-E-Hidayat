import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Heart, Calculator, User, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function BottomNav() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isActive = (path) => location.pathname === path;

  const bottomNavItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Quran', path: '/quran', icon: BookOpen },
    { label: 'Duas', path: '/duas', icon: Heart },
    { label: 'Tasbeeh', path: '/tasbeeh', icon: Calculator },
    { label: isAuthenticated ? 'Profile' : 'Login', path: isAuthenticated ? '/profile' : '/login', icon: isAuthenticated ? User : LogIn },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[var(--bg-card)]/95 backdrop-blur-xl border-t border-[var(--border-color)]"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {bottomNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            id={`bottom-nav-${item.label.toLowerCase()}`}
            className={`flex flex-col items-center justify-center gap-0.5 w-14 py-1 rounded-xl transition-all duration-200 ${
              isActive(item.path)
                ? 'text-[var(--primary-main)]'
                : 'text-[var(--text-sub)] hover:text-[var(--primary-main)]'
            }`}
          >
            <div className={`relative p-1.5 rounded-lg transition-all duration-200 ${
              isActive(item.path) ? 'bg-[var(--primary-light)]' : ''
            }`}>
              <item.icon className="w-5 h-5" strokeWidth={isActive(item.path) ? 2.5 : 1.8} />
            </div>
            <span className={`text-[10px] font-medium ${
              isActive(item.path) ? 'font-semibold' : ''
            }`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
