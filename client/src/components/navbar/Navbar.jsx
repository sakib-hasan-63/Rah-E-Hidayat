import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Heart, MessageSquareText, Moon, Sun, Search,
  Menu, X, ChevronDown, Calculator, CalendarDays, Clock,
  FileText, HelpCircle, Baby, Download, Info, Home,
  User, LogOut, Bookmark, ShieldCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const mainNavItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Quran', path: '/quran', icon: BookOpen },
  { label: 'Duas', path: '/duas', icon: Heart },
  { label: 'Hadith', path: '/hadith', icon: MessageSquareText },
  { label: 'Azkar', path: '/azkar', icon: BookOpen },
  { label: 'Prayer Times', path: '/prayer-times', icon: Clock },
];

const moreItems = [
  { label: 'Tasbeeh', path: '/tasbeeh', icon: Calculator },
  { label: 'Islamic Calendar', path: '/islamic-calendar', icon: CalendarDays },
  { label: 'Articles', path: '/articles', icon: FileText },
  { label: 'Quiz', path: '/quiz', icon: HelpCircle },
  { label: 'Kids Corner', path: '/kids', icon: Baby },
  { label: 'Downloads', path: '/downloads', icon: Download },
  { label: 'About', path: '/about', icon: Info },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    setProfileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.more-menu-container')) setMoreMenuOpen(false);
      if (!e.target.closest('.profile-menu-container')) setProfileMenuOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 bg-[var(--bg-nav)] backdrop-blur-md border-b border-[var(--border-color)] transition-colors duration-200"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0" id="nav-logo">
            <img
              src="/logo.png"
              alt="Rah-e-Hidayat"
              className="w-10 h-10 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-[var(--text-main)] tracking-tight leading-tight">
                Rah-e-Hidayat
              </span>
              <span className="text-[10px] text-[var(--text-sub)] tracking-wider uppercase font-medium hidden sm:block">
                The Path of Guidance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                id={`nav-${item.label.toLowerCase()}`}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013] shadow-xs'
                    : 'text-[var(--text-muted)] hover:bg-[var(--primary-light)] hover:text-[var(--text-main)]'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative more-menu-container">
              <button
                onClick={(e) => { e.stopPropagation(); setMoreMenuOpen(!moreMenuOpen); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  moreMenuOpen
                    ? 'bg-[var(--primary-light)] text-[var(--text-main)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--primary-light)] hover:text-[var(--text-main)]'
                }`}
                id="nav-more"
                aria-expanded={moreMenuOpen}
                aria-haspopup="true"
              >
                More
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {moreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full right-0 mt-2 w-56 bg-[var(--bg-card)] rounded-2xl shadow-xl border border-[var(--border-color)] overflow-hidden py-2"
                  >
                    {moreItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[var(--text-main)] hover:bg-[var(--primary-light)] transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-[var(--primary-main)]" />
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Link
              to="/search"
              className="p-2.5 rounded-xl text-[var(--text-muted)] hover:bg-[var(--primary-light)] hover:text-[var(--text-main)] transition-colors"
              id="nav-search"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-[var(--text-muted)] hover:bg-[var(--primary-light)] hover:text-[var(--text-main)] transition-colors"
              id="nav-theme-toggle"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>

            {/* Profile / Login */}
            {isAuthenticated && user ? (
              <div className="relative profile-menu-container">
                <button
                  onClick={(e) => { e.stopPropagation(); setProfileMenuOpen(!profileMenuOpen); }}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl hover:bg-[var(--primary-light)] transition-colors border border-[var(--border-color)] bg-[var(--bg-card)]"
                  id="nav-profile"
                  aria-expanded={profileMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F5132] to-[#1B7A4E] dark:from-[#34D399] dark:to-[#059669] flex items-center justify-center text-white dark:text-[#062013] font-bold text-sm shadow-xs">
                    {userInitial}
                  </div>
                  <span className="text-xs font-bold text-[var(--text-main)] hidden sm:block max-w-[110px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full right-0 mt-2 w-64 bg-[var(--bg-card)] rounded-2xl shadow-2xl border border-[var(--border-color)] overflow-hidden"
                    >
                      <div className="px-4 py-3.5 border-b border-[var(--border-color)] bg-[var(--primary-light)]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-[#0F5132] dark:bg-[#34D399] text-white dark:text-[#062013] font-bold flex items-center justify-center text-sm">
                            {userInitial}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-[var(--text-main)] truncate">{user.name}</p>
                            <p className="text-[11px] text-[var(--text-muted)] truncate">{user.email || user.phone}</p>
                            {isAdmin && (
                              <span className="inline-block mt-0.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                                Administrator
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        {/* Admin Link if role === admin */}
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-500/10 transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Admin Dashboard
                          </Link>
                        )}
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--primary-light)] transition-colors font-medium">
                          <User className="w-4 h-4 text-[var(--primary-main)]" /> My Profile
                        </Link>
                        <Link to="/bookmarks" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--primary-light)] transition-colors font-medium">
                          <Bookmark className="w-4 h-4 text-[var(--primary-main)]" /> Saved Bookmarks
                        </Link>
                      </div>

                      <div className="border-t border-[var(--border-color)] py-1.5">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 w-full text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary !py-2 !px-4 !text-xs !font-bold"
                id="nav-login"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[var(--text-muted)] hover:bg-[var(--primary-light)]"
              id="nav-mobile-toggle"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Out Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[var(--bg-card)] z-50 lg:hidden overflow-y-auto p-5 shadow-2xl border-l border-[var(--border-color)]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="Rah-e-Hidayat"
                    className="w-9 h-9 rounded-xl object-cover"
                  />
                  <span className="font-display font-bold text-base text-[var(--text-main)]">
                    Rah-e-Hidayat
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--primary-light)]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Profile Banner */}
              {isAuthenticated && user && (
                <div className="p-3.5 rounded-xl bg-[var(--primary-light)] mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F5132] dark:bg-[#34D399] text-white dark:text-[#062013] font-bold flex items-center justify-center">
                    {userInitial}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[var(--text-main)] truncate">{user.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)] truncate">{user.email || user.phone}</p>
                  </div>
                </div>
              )}

              {/* Not logged in — show login prompt */}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full mb-4 !text-sm"
                >
                  Sign In
                </Link>
              )}

              <div className="space-y-1">
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 mb-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Admin Panel
                  </Link>
                )}

                <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-sub)]">Main</p>
                {mainNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive(item.path)
                        ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013]'
                        : 'text-[var(--text-main)] hover:bg-[var(--primary-light)]'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}

                <div className="my-3 border-t border-[var(--border-color)]" />
                <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-sub)]">More Features</p>
                {moreItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013]'
                        : 'text-[var(--text-main)] hover:bg-[var(--primary-light)]'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}

                {isAuthenticated && (
                  <div className="pt-4 mt-4 border-t border-[var(--border-color)]">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-[var(--text-main)] hover:bg-[var(--primary-light)] rounded-xl mb-1"
                    >
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    <Link
                      to="/bookmarks"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-[var(--text-main)] hover:bg-[var(--primary-light)] rounded-xl mb-1"
                    >
                      <Bookmark className="w-4 h-4" /> Bookmarks
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
