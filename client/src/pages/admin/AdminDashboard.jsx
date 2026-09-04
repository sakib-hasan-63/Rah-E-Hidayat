import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, ShieldCheck, BookOpen, Bookmark, Calculator,
  TrendingUp, UserPlus, ArrowRight, RefreshCw, Database, MessageSquare
} from 'lucide-react';
import api from '../../services/api';
import Loader from '../../components/common/Loader';
import { useToast } from '../../context/ToastContext';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/api/admin/stats');
      if (res.data?.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch admin stats:', err.message);
      setError('Unable to load dashboard data. Please ensure the backend server and MongoDB are running.');
      addToast('Failed to load admin stats from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
            Administrator Overview
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            Real-time analytics and user metrics from MongoDB Database.
          </p>
        </div>

        <button
          onClick={fetchStats}
          className="btn-secondary !py-2 !px-3.5 !text-xs inline-flex items-center gap-1.5 font-bold self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
        </button>
      </div>

      {loading ? (
        <Loader variant="skeleton-cards" count={4} />
      ) : error ? (
        <div className="card-premium p-8 text-center">
          <Database className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Connection Error</h3>
          <p className="text-sm text-[var(--text-muted)] mb-4 max-w-md mx-auto">{error}</p>
          <button onClick={fetchStats} className="btn-primary !py-2 !px-4 !text-xs">
            <RefreshCw className="w-3.5 h-3.5" /> Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {/* Total Users */}
            <div className="card-premium p-6">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-sub)]">Total Users</span>
              <p className="text-2xl sm:text-3xl font-extrabold font-display text-[var(--text-main)] mt-0.5">
                {stats?.totalUsers || 0}
              </p>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
                +{stats?.newUsersToday || 0} joined today
              </span>
            </div>

            {/* Total Feedback */}
            <Link to="/admin/feedback" className="card-premium p-6 hover:border-[var(--primary-main)] transition-all group block">
              <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-sub)]">Feedback</span>
              <p className="text-2xl sm:text-3xl font-extrabold font-display text-[var(--text-main)] mt-0.5">
                {stats?.totalFeedback || 0}
              </p>
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-1 block">
                {stats?.unreadFeedback || 0} unread • View →
              </span>
            </Link>

            {/* Total Admins */}
            <div className="card-premium p-6">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-sub)]">Admins</span>
              <p className="text-2xl sm:text-3xl font-extrabold font-display text-[var(--text-main)] mt-0.5">
                {stats?.totalAdmins || 1}
              </p>
              <span className="text-[11px] font-semibold text-[var(--text-muted)] mt-1 block">
                With full privileges
              </span>
            </div>

            {/* Total Bookmarks */}
            <div className="card-premium p-6">
              <div className="w-11 h-11 rounded-xl bg-purple-500/15 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-3">
                <Bookmark className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-sub)]">Total Bookmarks</span>
              <p className="text-2xl sm:text-3xl font-extrabold font-display text-[var(--text-main)] mt-0.5">
                {stats?.totalBookmarks || 0}
              </p>
              <span className="text-[11px] font-semibold text-[var(--text-muted)] mt-1 block">
                Saved across Quran & Duas
              </span>
            </div>

            {/* Tasbeeh Activity */}
            <div className="card-premium p-6">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 flex items-center justify-center mb-3">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-sub)]">Tasbeeh Sessions</span>
              <p className="text-2xl sm:text-3xl font-extrabold font-display text-[var(--text-main)] mt-0.5">
                {stats?.totalTasbeehLogs || 0}
              </p>
              <span className="text-[11px] font-semibold text-[var(--text-muted)] mt-1 block">
                Dhikr logs in database
              </span>
            </div>
          </div>

          {/* Recent Registrations Table */}
          <div className="card-premium p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-bold text-lg text-[var(--text-main)]">
                  Recently Registered Users
                </h3>
                <p className="text-xs text-[var(--text-muted)]">Latest accounts created in the MongoDB database</p>
              </div>
              <Link
                to="/admin/users"
                className="btn-primary !py-1.5 !px-3.5 !text-xs font-bold inline-flex items-center gap-1"
              >
                Manage All Users <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)] text-[var(--text-sub)] uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3">User</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {stats?.recentUsers?.map((u) => (
                    <tr key={u._id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-[var(--text-main)] flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[var(--primary-light)] text-[var(--primary-main)] flex items-center justify-center font-bold text-xs">
                          {u.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        {u.name}
                      </td>
                      <td className="py-3.5 px-3 text-[var(--text-muted)]">{u.email}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          u.role === 'admin'
                            ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300'
                            : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-[var(--text-sub)]">
                        {new Date(u.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
