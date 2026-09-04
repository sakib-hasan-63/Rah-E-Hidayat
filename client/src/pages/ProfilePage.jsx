import { useAuth } from '../context/AuthContext';
import { BookOpen, MessageSquareText, Heart, Flame, Award, LogOut, Settings, ShieldCheck } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { Link, useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Please sign in to view your profile</h2>
        <Link to="/login" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  const userName = user?.name || 'User';
  const userEmail = user?.email || '';
  const initial = userName.trim().charAt(0).toUpperCase();

  const stats = [
    { label: 'Quran Progress', value: '12 Surahs', icon: BookOpen, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Hadith Read', value: '48 Read', icon: MessageSquareText, color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Saved Items', value: '24 Saved', icon: Heart, color: 'text-rose-600 dark:text-rose-400' },
    { label: 'Daily Streak', value: '7 Days 🔥', icon: Flame, color: 'text-orange-600 dark:text-orange-400' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Banner */}
      <div className="card-premium p-8 text-center mb-8 bg-gradient-to-br from-white via-[#FAF8F2] to-[#E7F4ED]/40 dark:from-[#162118] dark:to-[#0E1610] border-2 border-[var(--border-color)]">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0F5132] to-[#1B7A4E] dark:from-[#34D399] dark:to-[#059669] text-[#FFFDF5] dark:text-[#062013] font-display font-bold text-3xl flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-[#C9A84C]/50">
          {initial}
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-1">
          {userName}
        </h1>
        <p className="text-xs text-[var(--text-muted)] mb-4">{userEmail}</p>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-xs font-bold">
          <Award className="w-3.5 h-3.5" /> Member of the Ummah
        </div>
      </div>

      {/* Spiritual Stats */}
      <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-main)] mb-4">
        Personal Spiritual Activity
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((st) => (
          <div key={st.label} className="card-premium p-5 text-center">
            <st.icon className={`w-6 h-6 mx-auto mb-2 ${st.color}`} />
            <p className="text-lg font-bold text-[var(--text-main)]">{st.value}</p>
            <p className="text-xs text-[var(--text-muted)]">{st.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Action Links */}
      <div className="space-y-3 mb-8">
        <Link to="/bookmarks" className="card-premium p-4 flex items-center justify-between hover:border-[#0F5132] dark:hover:border-[#34D399] transition-all block">
          <span className="font-semibold text-sm text-[var(--text-main)] flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" /> View Bookmarks & Favorites
          </span>
          <span className="text-xs font-bold text-[var(--primary-main)]">View →</span>
        </Link>
        <Link to="/quran" className="card-premium p-4 flex items-center justify-between hover:border-[#0F5132] dark:hover:border-[#34D399] transition-all block">
          <span className="font-semibold text-sm text-[var(--text-main)] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-500" /> Continue Quran Reading
          </span>
          <span className="text-xs font-bold text-[var(--primary-main)]">Read →</span>
        </Link>
      </div>

      {/* Sign Out */}
      <div className="flex justify-end">
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="btn-secondary !py-2 !px-4 !text-xs !text-red-600 !border-red-300 dark:!border-red-900/40 hover:!bg-red-50 dark:hover:!bg-red-950/20 inline-flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </div>
  );
}
