import { Bookmark, Heart, BookOpen, Trash2, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import EmptyState from '../components/common/EmptyState';
import { Link } from 'react-router-dom';

export default function BookmarksPage() {
  const savedBookmarks = [
    { title: 'Ayat al-Kursi (2:255)', type: 'Quran Verse', ref: 'Surah Al-Baqarah', link: '/quran/2' },
    { title: 'Hadith on Intentions & Sincerity', type: 'Hadith', ref: 'Sahih al-Bukhari #1', link: '/hadith' },
    { title: 'Sayyid al-Istighfar', type: 'Dua', ref: 'Forgiveness Supplications', link: '/duas' },
    { title: 'Surah Al-Kahf (18:1-10)', type: 'Quran Verse', ref: 'Surah Al-Kahf', link: '/quran/18' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title="My Bookmarks & Favorites"
        subtitle="Your saved verses, prophetic traditions, and precious supplications."
      />

      {savedBookmarks.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No bookmarks yet"
          description="Start bookmarking verses and duas that inspire your heart."
        />
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {savedBookmarks.map((bm, i) => (
            <div key={i} className="card-premium p-5 flex items-center justify-between hover:border-[#0F5132] dark:hover:border-[#34D399] transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary-main)] flex items-center justify-center flex-shrink-0">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-[var(--text-main)]">{bm.title}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{bm.type} • {bm.ref}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={bm.link}
                  className="btn-primary !py-1.5 !px-3 !text-xs inline-flex items-center gap-1"
                >
                  Read <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
