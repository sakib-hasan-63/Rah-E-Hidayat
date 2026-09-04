import { useState } from 'react';
import { BookOpen, Search, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminQuran() {
  const [search, setSearch] = useState('');

  const surahs = [
    { number: 1, name: 'Al-Fatihah', arabic: 'سُورَةُ ٱلْفَاتِحَةِ', ayahs: 7, type: 'Meccan' },
    { number: 2, name: 'Al-Baqarah', arabic: 'سُورَةُ البَقَرَةِ', ayahs: 286, type: 'Medinan' },
    { number: 3, name: 'Aal-Imran', arabic: 'سُورَةُ آلِ عِمْرَانَ', ayahs: 200, type: 'Medinan' },
    { number: 18, name: 'Al-Kahf', arabic: 'سُورَةُ الكَهْفِ', ayahs: 110, type: 'Meccan' },
    { number: 36, name: 'Ya-Sin', arabic: 'سُورَةُ يسٓ', ayahs: 83, type: 'Meccan' },
    { number: 67, name: 'Al-Mulk', arabic: 'سُورَةُ المُلْكِ', ayahs: 30, type: 'Meccan' },
    { number: 114, name: 'An-Nas', arabic: 'سُورَةُ النَّاسِ', ayahs: 6, type: 'Meccan' },
  ].filter(s => search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.number.toString() === search);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
          Quran / Surahs Catalog
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
          Verified Quranic Uthmani dataset and 114 Surahs registry.
        </p>
      </div>

      <div className="card-premium p-4">
        <input
          type="text"
          placeholder="Filter Surahs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field !py-2.5 !text-xs sm:!text-sm"
        />
      </div>

      <div className="card-premium overflow-hidden">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-sub)] uppercase text-[11px]">
              <th className="py-3.5 px-4">#</th>
              <th className="py-3.5 px-4">Surah Name</th>
              <th className="py-3.5 px-4">Arabic</th>
              <th className="py-3.5 px-4">Ayahs</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4 text-right">Reader View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {surahs.map((s) => (
              <tr key={s.number} className="hover:bg-black/5 dark:hover:bg-white/5">
                <td className="py-3.5 px-4 font-bold">{s.number}</td>
                <td className="py-3.5 px-4 font-bold text-[var(--text-main)]">{s.name}</td>
                <td className="py-3.5 px-4 arabic-text text-base">{s.arabic}</td>
                <td className="py-3.5 px-4 text-[var(--text-muted)]">{s.ayahs} Ayahs</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-[10px] font-bold uppercase">
                    {s.type}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    to={`/quran/${s.number}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-[var(--primary-main)] hover:bg-[var(--primary-light)] inline-flex items-center gap-1 font-bold text-xs"
                  >
                    Open <ExternalLink className="w-3.5 h-3.5" />
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
