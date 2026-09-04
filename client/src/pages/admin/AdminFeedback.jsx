import { useState, useEffect } from 'react';
import {
  MessageSquare, Mail, Calendar, Clock, Search, RefreshCw,
  CheckCircle2, Circle, Trash2, Tag, AlertCircle, Filter, Check
} from 'lucide-react';
import api from '../../services/api';
import Loader from '../../components/common/Loader';
import { useToast } from '../../context/ToastContext';

const typeColors = {
  'General Feedback': 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/20',
  'Suggestion': 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/20',
  'Content Correction': 'bg-blue-500/15 text-blue-800 dark:text-blue-300 border-blue-500/20',
  'Inquiry': 'bg-purple-500/15 text-purple-800 dark:text-purple-300 border-purple-500/20',
  'Bug Report': 'bg-red-500/15 text-red-800 dark:text-red-300 border-red-500/20',
  'Other': 'bg-neutral-500/15 text-neutral-800 dark:text-neutral-300 border-neutral-500/20',
};

export default function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [totalCount, setTotalCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const { addToast } = useToast();

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (typeFilter !== 'all') params.type = typeFilter;
      if (statusFilter !== 'all') params.status = statusFilter;

      const res = await api.get('/api/admin/feedback', { params });
      if (res.data?.success) {
        setFeedbackList(res.data.feedbacks || []);
        setTotalCount(res.data.totalCount || 0);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Failed to load feedback:', err);
      addToast('Failed to load feedback list from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [typeFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFeedback();
  };

  const toggleStatus = async (item) => {
    const newStatus = item.status === 'unread' ? 'read' : 'unread';
    try {
      const res = await api.put(`/api/admin/feedback/${item._id}/status`, { status: newStatus });
      if (res.data?.success) {
        setFeedbackList((prev) =>
          prev.map((fb) => (fb._id === item._id ? { ...fb, status: newStatus } : fb))
        );
        setUnreadCount((prev) => (newStatus === 'read' ? Math.max(0, prev - 1) : prev + 1));
        addToast(`Marked as ${newStatus}`, 'success');
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      addToast('Failed to update feedback status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback message?')) return;
    try {
      setDeletingId(id);
      const res = await api.delete(`/api/admin/feedback/${id}`);
      if (res.data?.success) {
        setFeedbackList((prev) => prev.filter((fb) => fb._id !== id));
        setTotalCount((prev) => Math.max(0, prev - 1));
        addToast('Feedback message deleted', 'success');
      }
    } catch (err) {
      console.error('Failed to delete feedback:', err);
      addToast('Failed to delete feedback', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
            Feedback & User Messages
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            Real-time messages, corrections, and suggestions submitted by website visitors.
          </p>
        </div>

        <button
          onClick={fetchFeedback}
          className="btn-secondary !py-2 !px-3.5 !text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="card-premium p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-sub)]">
            Total Messages
          </span>
          <p className="text-2xl font-extrabold font-display text-[var(--text-main)] mt-1">
            {totalCount}
          </p>
        </div>
        <div className="card-premium p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-sub)]">
            Unread Messages
          </span>
          <p className="text-2xl font-extrabold font-display text-amber-600 dark:text-amber-400 mt-1">
            {unreadCount}
          </p>
        </div>
        <div className="card-premium p-4 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-sub)]">
            Read & Processed
          </span>
          <p className="text-2xl font-extrabold font-display text-emerald-600 dark:text-emerald-400 mt-1">
            {Math.max(0, totalCount - unreadCount)}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card-premium p-4 flex flex-col md:flex-row items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by name, email, subject, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field !py-2.5 !text-xs sm:!text-sm"
          />
          <Search className="w-4 h-4 text-[var(--text-sub)] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          {/* Status Filter */}
          <div className="flex rounded-xl bg-[var(--bg-main)] p-1 border border-[var(--border-color)]">
            {['all', 'unread', 'read'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  statusFilter === s
                    ? 'bg-white dark:bg-[#162118] text-[#0F5132] dark:text-[#34D399] shadow-xs'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-main)] focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="General Feedback">General Feedback</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Content Correction">Content Correction</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Feedback Feed / List */}
      {loading ? (
        <div className="p-12 text-center">
          <Loader variant="spinner" />
        </div>
      ) : feedbackList.length === 0 ? (
        <div className="card-premium p-12 text-center text-[var(--text-muted)]">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <h3 className="font-bold text-base text-[var(--text-main)] mb-1">No Feedback Messages</h3>
          <p className="text-xs max-w-sm mx-auto">
            No feedback entries match your current search or filters.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedbackList.map((item) => {
            const dateObj = new Date(item.createdAt);
            const formattedDate = dateObj.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
            const formattedTime = dateObj.toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={item._id}
                className={`card-premium p-5 transition-all border ${
                  item.status === 'unread'
                    ? 'border-l-4 border-l-amber-500 dark:border-l-amber-400 bg-amber-500/5 dark:bg-amber-950/10'
                    : 'border-[var(--border-color)]'
                }`}
              >
                {/* Header row: Submitter Info & Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary-main)] flex items-center justify-center font-bold text-sm shrink-0">
                      {item.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm text-[var(--text-main)]">
                          {item.name}
                        </h3>
                        {item.userId && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                            Registered Member
                          </span>
                        )}
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            typeColors[item.type] || typeColors['Other']
                          }`}
                        >
                          {item.type || 'General Feedback'}
                        </span>
                      </div>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-xs text-[var(--text-muted)] hover:text-[var(--primary-main)] font-mono inline-flex items-center gap-1 mt-0.5 transition-colors"
                      >
                        <Mail className="w-3 h-3" /> {item.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[var(--text-sub)] self-start sm:self-auto">
                    <div className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formattedDate}</span>
                      <span className="text-[var(--text-muted)]">at</span>
                      <Clock className="w-3.5 h-3.5 ml-0.5" />
                      <span>{formattedTime}</span>
                    </div>

                    {/* Action buttons */}
                    <button
                      onClick={() => toggleStatus(item)}
                      title={item.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                      className={`p-1.5 rounded-lg border text-xs font-semibold inline-flex items-center gap-1 transition-colors ${
                        item.status === 'unread'
                          ? 'border-amber-500/30 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10'
                          : 'border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10'
                      }`}
                    >
                      {item.status === 'unread' ? (
                        <>
                          <Circle className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span className="hidden sm:inline">New</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span className="hidden sm:inline">Read</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      title="Delete Feedback"
                      className="p-1.5 rounded-lg border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subject & Message Content */}
                <div className="pt-3">
                  {item.subject && (
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--text-sub)] mb-1">
                      Subject: <span className="text-[var(--text-main)] normal-case font-bold">{item.subject}</span>
                    </h4>
                  )}
                  <p className="text-xs sm:text-sm text-[var(--text-main)] whitespace-pre-wrap leading-relaxed bg-[var(--bg-main)] p-3.5 rounded-xl border border-[var(--border-color)]">
                    {item.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
