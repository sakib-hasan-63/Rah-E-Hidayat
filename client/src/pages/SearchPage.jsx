import { useState } from 'react';
import { Search, BookOpen, MessageSquareText, Heart, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const catalog = [
    { title: 'Surah Al-Fatihah (The Opening)', category: 'Quran', link: '/quran/1', snippet: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is due to Allah, Lord of the worlds.' },
    { title: 'Surah Al-Baqarah (The Cow)', category: 'Quran', link: '/quran/2', snippet: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.' },
    { title: 'Surah Al-Kahf (The Cave)', category: 'Quran', link: '/quran/18', snippet: '[All] praise is due to Allah, who has sent down upon His Servant the Book and has not made therein any deviance.' },
    { title: 'Surah Ya-Sin', category: 'Quran', link: '/quran/36', snippet: 'Ya, Seen. By the wise Qur\'an. Indeed you, [O Muhammad], are from among the messengers.' },
    { title: 'Surah Al-Mulk (The Dominion)', category: 'Quran', link: '/quran/67', snippet: 'Blessed is He in whose hand is dominion, and He is over all things competent.' },
    { title: 'Hadith: Actions are judged by intentions', category: 'Hadith', link: '/hadith', snippet: 'The reward of deeds depends upon the intentions and every person will get the reward according to what he intended.' },
    { title: 'Hadith: Cleanliness is half of faith', category: 'Hadith', link: '/hadith', snippet: 'Cleanliness is half of faith and Alhamdulillah (praise be to Allah) fills the scale.' },
    { title: 'Dua: Rabbi Zidni Ilma (Increase my knowledge)', category: 'Duas', link: '/duas', snippet: 'My Lord, increase me in knowledge. Prescribed in Surah Ta-Ha.' },
    { title: 'Sayyid al-Istighfar (Master of Forgiveness)', category: 'Duas', link: '/duas', snippet: 'O Allah, You are my Lord. There is no deity except You. You created me and I am Your servant.' },
  ];

  const results = catalog.filter(r =>
    query === '' ||
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.snippet.toLowerCase().includes(query.toLowerCase()) ||
    r.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title="Global Search"
        subtitle="Quickly search across the Quran, authentic Hadith collections, and Duas."
      />

      <div className="relative mb-8 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search for Surahs (e.g. Kahf), Hadith, or Duas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field"
        />
        <Search className="w-4.5 h-4.5 text-[var(--text-sub)] absolute left-3.5 top-1/2 -translate-y-1/2" />
      </div>

      <div className="space-y-3 sm:space-y-4">
        {results.map((res, i) => (
          <Link
            key={i}
            to={res.link}
            className="card-premium p-5 block group hover:border-[#0F5132] dark:hover:border-[#34D399] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-xs font-bold">
                {res.category}
              </span>
              <span className="text-xs text-[var(--primary-main)] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Open <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <h4 className="font-bold text-base text-[var(--text-main)] mb-1">
              {res.title}
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{res.snippet}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
