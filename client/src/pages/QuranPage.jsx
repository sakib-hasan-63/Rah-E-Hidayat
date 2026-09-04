import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Volume2, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Loader from '../components/common/Loader';

const initialSurahs = [
  { number: 1, name: 'سُورَةُ ٱلْفَاتِحَةِ', englishName: 'Al-Fatihah', englishNameTranslation: 'The Opening', numberOfAyahs: 7, revelationType: 'Meccan' },
  { number: 2, name: 'سُورَةُ البَقَرَةِ', englishName: 'Al-Baqarah', englishNameTranslation: 'The Cow', numberOfAyahs: 286, revelationType: 'Medinan' },
  { number: 3, name: 'سُورَةُ آلِ عِمْرَانَ', englishName: 'Aal-Imran', englishNameTranslation: 'The Family of Imran', numberOfAyahs: 200, revelationType: 'Medinan' },
  { number: 4, name: 'سُورَةُ النِّسَاءِ', englishName: 'An-Nisa', englishNameTranslation: 'The Women', numberOfAyahs: 176, revelationType: 'Medinan' },
  { number: 5, name: 'سُورَةُ المَائِدَةِ', englishName: 'Al-Ma\'idah', englishNameTranslation: 'The Table Spread', numberOfAyahs: 120, revelationType: 'Medinan' },
  { number: 6, name: 'سُورَةُ الأَنْعَامِ', englishName: 'Al-An\'am', englishNameTranslation: 'The Cattle', numberOfAyahs: 165, revelationType: 'Meccan' },
  { number: 18, name: 'سُورَةُ الكَهْفِ', englishName: 'Al-Kahf', englishNameTranslation: 'The Cave', numberOfAyahs: 110, revelationType: 'Meccan' },
  { number: 36, name: 'سُورَةُ يسٓ', englishName: 'Ya-Sin', englishNameTranslation: 'Ya-Sin', numberOfAyahs: 83, revelationType: 'Meccan' },
  { number: 55, name: 'سُورَةُ الرَّحْمَٰنِ', englishName: 'Ar-Rahman', englishNameTranslation: 'The Beneficent', numberOfAyahs: 78, revelationType: 'Medinan' },
  { number: 56, name: 'سُورَةُ الوَاقِعَةِ', englishName: 'Al-Waqi\'ah', englishNameTranslation: 'The Inevitable', numberOfAyahs: 96, revelationType: 'Meccan' },
  { number: 67, name: 'سُورَةُ المُلْكِ', englishName: 'Al-Mulk', englishNameTranslation: 'The Dominion', numberOfAyahs: 30, revelationType: 'Meccan' },
  { number: 112, name: 'سُورَةُ الإِخْلَاصِ', englishName: 'Al-Ikhlas', englishNameTranslation: 'The Sincerity', numberOfAyahs: 4, revelationType: 'Meccan' },
  { number: 113, name: 'سُورَةُ الفَلَقِ', englishName: 'Al-Falaq', englishNameTranslation: 'The Daybreak', numberOfAyahs: 5, revelationType: 'Meccan' },
  { number: 114, name: 'سُورَةُ النَّاسِ', englishName: 'An-Nas', englishNameTranslation: 'Mankind', numberOfAyahs: 6, revelationType: 'Meccan' },
];

export default function QuranPage() {
  const [surahs, setSurahs] = useState(initialSurahs);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await res.json();
        if (data.code === 200 && data.data?.length > 0) {
          setSurahs(data.data);
        }
      } catch (err) {
        console.warn('Using built-in Surah list');
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter(s =>
    s.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.englishNameTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.number.toString() === searchTerm
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title="The Noble Quran"
        subtitle="Read, listen, and contemplate the divine revelation of the Holy Quran."
      />

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10 relative">
        <input
          type="text"
          placeholder="Search by Surah name (e.g. Kahf, Yaseen) or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
        <Search className="w-4.5 h-4.5 text-[var(--text-sub)] absolute left-3.5 top-1/2 -translate-y-1/2" />
      </div>

      {loading ? (
        <Loader variant="skeleton-cards" count={6} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.number}
              to={`/quran/${surah.number}`}
              id={`surah-card-${surah.number}`}
              className="card-premium p-5 flex items-center justify-between group hover:border-[#0F5132] dark:hover:border-[#34D399] transition-all block"
            >
              <div className="flex items-center gap-4">
                {/* Number Badge */}
                <div className="w-11 h-11 rounded-xl bg-[var(--primary-light)] text-[var(--primary-main)] flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                  {surah.number}
                </div>

                <div>
                  <h3 className="font-semibold text-base text-[var(--text-main)] group-hover:text-[var(--primary-main)] transition-colors flex items-center gap-1.5">
                    {surah.englishName}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayahs
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="arabic-text text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--primary-main)] transition-colors">
                  {surah.name}
                </p>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-sub)]">
                  {surah.revelationType}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
