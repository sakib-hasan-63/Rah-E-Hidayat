import { useState } from 'react';
import { Search, Heart, Share2, Copy, Bookmark, Check, Sparkles } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { useToast } from '../context/ToastContext';

const duaCategories = [
  'All',
  'Daily & Morning',
  'Forgiveness',
  'Protection',
  'Health & Healing',
  'Parents & Family',
  'Guidance & Success'
];

const curatedDuas = [
  {
    id: 1,
    title: 'Dua for Beneficial Knowledge',
    category: 'Guidance & Success',
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidni \'ilma',
    translation: 'My Lord, increase me in knowledge.',
    reference: 'Surah Ta-Ha (20:114)',
  },
  {
    id: 2,
    title: 'Sayyid al-Istighfar (The Master Supplication for Forgiveness)',
    category: 'Forgiveness',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma Anta Rabbi, la ilaha illa Anta, khalaqtani wa ana \'abduka, wa ana \'ala \'ahdika wa wa\'dika mastata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bi ni\'matika \'alayya, wa abu\'u laka bi dhanbi, faghfir li fa innahu la yaghfiru adh-dhunuba illa Anta',
    translation: 'O Allah! You are my Lord! None has the right to be worshipped but You. You created me and I am Your slave, and I am faithful to my covenant and my promise as much as I can. I seek refuge with You from the evil of what I have done. I acknowledge before You Your blessings upon me, and I acknowledge before You my sin. So forgive me, for verily none can forgive sins except You.',
    reference: 'Sahih al-Bukhari #6306',
  },
  {
    id: 3,
    title: 'Supplication for Parents',
    category: 'Parents & Family',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbi irhamhuma kama rabbayani sagheera',
    translation: 'My Lord, have mercy upon them as they brought me up [when I was] small.',
    reference: 'Surah Al-Isra (17:24)',
  },
  {
    id: 4,
    title: 'Dua for Goodness in Both Worlds',
    category: 'Daily & Morning',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina \'adhaban-nar',
    translation: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
    reference: 'Surah Al-Baqarah (2:201)',
  },
  {
    id: 5,
    title: 'Dua for Steadfastness in Faith',
    category: 'Guidance & Success',
    arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
    transliteration: 'Ya Muqallib al-qulub, thabbit qalbi \'ala deenik',
    translation: 'O Turner of the hearts, keep my heart steadfast upon Your religion.',
    reference: 'Jami` at-Tirmidhi #2140',
  },
  {
    id: 6,
    title: 'Dua for Relief from Anxiety and Sorrow',
    category: 'Health & Healing',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ',
    transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan, wal-\'ajzi wal-kasal, wal-bukhli wal-jubn',
    translation: 'O Allah, I seek refuge in You from grief and sadness, from weakness and laziness, from miserliness and cowardice.',
    reference: 'Sahih al-Bukhari #2893',
  },
];

export default function DuasPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const { addToast } = useToast();

  const handleCopy = (dua) => {
    const text = `${dua.arabic}\n\n${dua.transliteration}\n\n"${dua.translation}"\n\n- ${dua.reference}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    addToast('Dua copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = curatedDuas.filter(d => {
    const matchCat = selectedCategory === 'All' || d.category === selectedCategory;
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
                        d.translation.toLowerCase().includes(search.toLowerCase()) ||
                        d.transliteration.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title="Supplications & Duas"
        subtitle="Authentic prayers from the Noble Quran and the Sunnah of Prophet Muhammad (ﷺ)."
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {duaCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013] shadow-md scale-105'
                : 'card-premium text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Duas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filtered.map((dua) => (
          <div key={dua.id} className="card-premium p-6 sm:p-7 flex flex-col justify-between hover:border-[#0F5132] dark:hover:border-[#34D399] transition-all">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] font-bold">
                  {dua.category}
                </span>
                <span className="text-[var(--text-sub)] font-semibold">{dua.reference}</span>
              </div>

              <h3 className="font-bold text-base sm:text-lg text-[var(--text-main)] mb-4">
                {dua.title}
              </h3>

              <p className="arabic-text mb-4 text-right text-xl sm:text-2xl text-[var(--text-main)] font-semibold leading-loose">
                {dua.arabic}
              </p>

              <p className="text-xs sm:text-sm font-semibold text-[#8E6D24] dark:text-[#FBE6A2] mb-2 italic">
                {dua.transliteration}
              </p>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                "{dua.translation}"
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-4 mt-6 border-t border-[var(--border-color)]">
              <button
                onClick={() => handleCopy(dua)}
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--primary-main)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Copy Dua"
              >
                {copiedId === dua.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
