import { useState } from 'react';
import { BookOpen, Search, Copy, Check, Quote } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { useToast } from '../context/ToastContext';

const hadithCollections = ['All', 'Sahih al-Bukhari', 'Sahih Muslim', 'Sunan an-Nasa\'i', 'Riyad as-Salihin'];

const curatedHadiths = [
  {
    id: 1,
    collection: 'Sahih al-Bukhari',
    number: 1,
    chapter: 'Book of Revelation',
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    translation: 'The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended.',
    narrator: 'Narrated by Umar bin Al-Khattab (RA)',
    grade: 'Sahih (Authentic)',
  },
  {
    id: 2,
    collection: 'Sahih Muslim',
    number: 223,
    chapter: 'The Book of Purification',
    arabic: 'الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ',
    translation: 'Cleanliness is half of faith and Alhamdulillah (praise be to Allah) fills the scale.',
    narrator: 'Narrated by Abu Malik at-Ash\'ari (RA)',
    grade: 'Sahih (Authentic)',
  },
  {
    id: 3,
    collection: 'Sahih al-Bukhari',
    number: 13,
    chapter: 'The Book of Faith',
    arabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    translation: 'None of you will believe until you love for your brother what you love for yourself.',
    narrator: 'Narrated by Anas bin Malik (RA)',
    grade: 'Sahih (Authentic)',
  },
  {
    id: 4,
    collection: 'Sahih Muslim',
    number: 2564,
    chapter: 'Book of Virtue & Good Manners',
    arabic: 'إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ',
    translation: 'Verily Allah does not look at your appearance or wealth, but rather He looks at your hearts and deeds.',
    narrator: 'Narrated by Abu Hurairah (RA)',
    grade: 'Sahih (Authentic)',
  },
];

export default function HadithPage() {
  const [selectedCol, setSelectedCol] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const { addToast } = useToast();

  const handleCopy = (hadith) => {
    const text = `Hadith: ${hadith.collection} #${hadith.number}\n\n${hadith.arabic}\n\n"${hadith.translation}"\n\n- ${hadith.narrator}`;
    navigator.clipboard.writeText(text);
    setCopiedId(hadith.id);
    addToast('Hadith copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = curatedHadiths.filter(h => selectedCol === 'All' || h.collection === selectedCol);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title="Prophetic Traditions (Hadith)"
        subtitle="Authentic teachings, character, and wisdom of Prophet Muhammad (ﷺ)."
      />

      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {hadithCollections.map((col) => (
          <button
            key={col}
            onClick={() => setSelectedCol(col)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCol === col
                ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013] shadow-md scale-105'
                : 'card-premium text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            {col}
          </button>
        ))}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {filtered.map((hadith) => (
          <div key={hadith.id} className="card-premium p-6 sm:p-8 border-l-4 border-l-[#C9A84C]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold-text)] font-bold">
                  {hadith.collection} #{hadith.number}
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                  {hadith.grade}
                </span>
              </div>
              <span className="text-[var(--text-sub)] font-semibold">{hadith.chapter}</span>
            </div>

            <p className="arabic-text text-xl sm:text-2xl mb-6 text-right leading-loose text-[var(--text-main)] font-semibold">
              {hadith.arabic}
            </p>

            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-4">
              "{hadith.translation}"
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-sub)]">
              <span className="font-medium">{hadith.narrator}</span>
              <button
                onClick={() => handleCopy(hadith)}
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--primary-main)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Copy Hadith"
              >
                {copiedId === hadith.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
