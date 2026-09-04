import { useState, useEffect } from 'react';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import EmptyState from '../components/common/EmptyState';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export default function BookmarksPage() {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated) {
      api.get('/api/bookmarks')
        .then((res) => {
          if (isMounted && res.data?.success) {
            setBookmarks(res.data.bookmarks || []);
          }
        })
        .catch(() => {
          // Default to empty if request fails
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    } else {
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((b) => b._id !== id));
      addToast('Bookmark removed', 'info');
    } catch (err) {
      addToast('Failed to remove bookmark', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title="My Bookmarks & Favorites"
        subtitle="Your saved verses, prophetic traditions, and precious supplications."
      />

      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-3 border-[var(--primary-main)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-[var(--text-muted)]">Loading your bookmarks...</p>
        </div>
      ) : bookmarks.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No bookmarks yet"
          description="Start bookmarking verses and duas that inspire your heart."
        />
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {bookmarks.map((bm) => (
            <div key={bm._id} className="card-premium p-5 flex items-center justify-between hover:border-[#0F5132] dark:hover:border-[#34D399] transition-all">
              <div className="flex items-center gap-3.5 min-w-0 pr-2">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary-main)] flex items-center justify-center flex-shrink-0">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base text-[var(--text-main)] truncate">{bm.title}</h4>
                  <p className="text-xs text-[var(--text-muted)] truncate">{bm.type} {bm.ref ? `• ${bm.ref}` : ''}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  to={bm.link || (bm.surahNumber ? `/quran/${bm.surahNumber}` : '/quran')}
                  className="btn-primary !py-1.5 !px-3 !text-xs inline-flex items-center gap-1"
                >
                  Read <ArrowRight className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => handleDelete(bm._id)}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  title="Remove bookmark"
                  aria-label="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
