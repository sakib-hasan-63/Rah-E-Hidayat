import { Bookmark, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminBookmarks() {
  const bookmarks = [
    { title: 'Ayat al-Kursi (2:255)', type: 'Quran', ref: 'Surah Al-Baqarah', user: 'Sakib Hasan', link: '/quran/2' },
    { title: 'Hadith on Sincerity & Intentions', type: 'Hadith', ref: 'Sahih al-Bukhari #1', user: 'Ahmed Khan', link: '/hadith' },
    { title: 'Sayyid al-Istighfar', type: 'Dua', ref: 'Forgiveness', user: 'Fatima Zahra', link: '/duas' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
          Bookmarks & Saved Content
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
          Overview of verses and supplications saved by users in MongoDB.
        </p>
      </div>

      <div className="card-premium overflow-hidden">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-sub)] uppercase text-[11px]">
              <th className="py-3.5 px-4">Bookmark Title</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Reference</th>
              <th className="py-3.5 px-4">User</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {bookmarks.map((b, i) => (
              <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5">
                <td className="py-3.5 px-4 font-bold text-[var(--text-main)]">{b.title}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-[10px] font-bold">
                    {b.type}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[var(--text-muted)]">{b.ref}</td>
                <td className="py-3.5 px-4 text-[var(--text-main)] font-medium">{b.user}</td>
                <td className="py-3.5 px-4 text-right">
                  <Link to={b.link} className="text-xs font-bold text-[var(--primary-main)] hover:underline inline-flex items-center gap-1">
                    View <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
