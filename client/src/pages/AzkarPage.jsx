import { useState } from 'react';
import { Sun, Moon, CheckCircle2, RotateCcw, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';

const azkarList = {
  Morning: [
    {
      id: 1,
      title: 'Ayat al-Kursi (Verse of the Throne)',
      arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...',
      fullArabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
      fullTranslation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
      translation: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Protection from evil until evening.',
      reference: 'Quran 2:255',
      target: 1,
    },
    {
      id: 2,
      title: 'Three Quls (Surah Al-Ikhlas, Al-Falaq, An-Nas)',
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ...',
      fullArabic: '﷽\n\nسُورَةُ الْإِخْلَاصِ\n\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ\n\nسُورَةُ الْفَلَقِ\n\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ\n\nسُورَةُ النَّاسِ\n\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
      fullTranslation: 'Surah Al-Ikhlas: Say, "He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent."\n\nSurah Al-Falaq: Say, "I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies."\n\nSurah An-Nas: Say, "I seek refuge in the Lord of mankind. The Sovereign of mankind. The God of mankind. From the evil of the retreating whisperer. Who whispers [evil] into the breasts of mankind. From among the jinn and mankind."',
      translation: 'Recite each Surah 3 times every morning for complete sufficiency and protection.',
      reference: 'Quran 112, 113, 114',
      target: 3,
    },
    {
      id: 3,
      title: 'Master of Istighfar (Sayyid al-Istighfar)',
      arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...',
      fullArabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
      fullTranslation: 'O Allah! You are my Lord! None has the right to be worshipped but You. You created me and I am Your slave, and I am faithful to my covenant and my promise as much as I can. I seek refuge with You from the evil of what I have done. I acknowledge before You Your blessings upon me, and I acknowledge before You my sin. So forgive me, for verily none can forgive sins except You.',
      translation: 'Whoever recites it with firm faith in the morning and dies before evening will enter Paradise.',
      reference: 'Sahih al-Bukhari #6306',
      target: 1,
    },
  ],
  Evening: [
    {
      id: 4,
      title: 'Evening Praise & Sovereignty',
      arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ...',
      fullArabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
      fullTranslation: 'We have entered the evening and all dominion belongs to Allah. All praise is due to Allah. None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent. My Lord, I ask You for the good of this night and the good of what follows it, and I seek refuge in You from the evil of this night and the evil of what follows it. My Lord, I seek refuge in You from laziness and the evil of old age. My Lord, I seek refuge in You from the torment in the Fire and the torment in the grave.',
      translation: 'We have entered the evening and all dominion belongs to Allah. All praise is due to Allah alone.',
      reference: 'Sahih Muslim #2723',
      target: 1,
    },
    {
      id: 5,
      title: 'Protection Against All Harm',
      arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      fullArabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      fullTranslation: 'In the name of Allah with whose Name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing. Whoever recites it three times in the morning and evening, nothing will harm him.',
      translation: 'In the name of Allah with whose Name nothing on earth or in the heavens can cause harm.',
      reference: 'Sunan Abu Dawud #5088',
      target: 3,
    },
  ],
};

export default function AzkarPage() {
  const [tab, setTab] = useState('Morning');
  const [completed, setCompleted] = useState({});
  const [expanded, setExpanded] = useState({});

  const toggleItem = (id) => {
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpand = (e, id) => {
    e.stopPropagation();
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentList = azkarList[tab] || [];
  const completedCount = currentList.filter(item => completed[item.id]).length;
  const progress = Math.round((completedCount / currentList.length) * 100) || 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title="Daily Azkar & Remembrance"
        subtitle="Fortify your heart and home with the morning and evening fortress remembrance."
      />

      {/* Morning / Evening Switcher */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setTab('Morning')}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
            tab === 'Morning'
              ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013] shadow-md scale-105'
              : 'card-premium text-[var(--text-muted)] hover:text-[var(--text-main)]'
          }`}
        >
          <Sun className="w-4 h-4 text-amber-500" /> Morning Azkar
        </button>
        <button
          onClick={() => setTab('Evening')}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
            tab === 'Evening'
              ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013] shadow-md scale-105'
              : 'card-premium text-[var(--text-muted)] hover:text-[var(--text-main)]'
          }`}
        >
          <Moon className="w-4 h-4 text-indigo-400" /> Evening Azkar
        </button>
      </div>

      {/* Progress Card */}
      <div className="card-premium p-6 mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm mb-2 font-bold">
          <span className="text-[var(--text-main)]">{tab} Azkar Completion</span>
          <span className="text-[var(--primary-main)]">{completedCount} of {currentList.length} completed ({progress}%)</span>
        </div>
        <div className="w-full h-2.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0F5132] to-[#34D399] transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Azkar Items */}
      <div className="space-y-4">
        {currentList.map((item) => (
          <div
            key={item.id}
            className={`card-premium p-6 transition-all ${
              completed[item.id]
                ? 'opacity-65 bg-[var(--primary-light)]/40 border-emerald-500/50'
                : 'hover:border-[#0F5132] dark:hover:border-[#34D399]'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <div
                onClick={() => toggleItem(item.id)}
                className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                  completed[item.id] ? 'bg-[#0F5132] dark:bg-[#34D399] text-white dark:text-[#062013]' : 'border border-[var(--border-color)] hover:border-[var(--primary-main)]'
                }`}
              >
                {completed[item.id] && <CheckCircle2 className="w-4 h-4" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base text-[var(--text-main)]">{item.title}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold-text)] font-bold">
                    {item.target}x
                  </span>
                </div>

                {/* Preview Arabic (shown when collapsed) */}
                {!expanded[item.id] && (
                  <p className="arabic-text text-xl mb-3 text-right text-[var(--text-main)] font-semibold">{item.arabic}</p>
                )}

                {/* Full Content (shown when expanded) */}
                {expanded[item.id] && (
                  <div className="mb-3 p-4 sm:p-5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
                    {item.reference && (
                      <p className="text-[10px] font-bold text-[var(--primary-main)] uppercase tracking-widest mb-3">{item.reference}</p>
                    )}
                    <div className="arabic-text text-xl sm:text-2xl text-right text-[var(--text-main)] font-semibold leading-loose whitespace-pre-line mb-4">
                      {item.fullArabic}
                    </div>
                    <div className="border-t border-[var(--border-color)] pt-3">
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                        {item.fullTranslation}
                      </p>
                    </div>
                  </div>
                )}

                {/* Summary translation (shown when collapsed) */}
                {!expanded[item.id] && (
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">{item.translation}</p>
                )}

                {/* Read Full Text / Show Less button */}
                <button
                  onClick={(e) => toggleExpand(e, item.id)}
                  className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg text-xs font-bold text-[var(--primary-main)] hover:bg-[var(--primary-light)] transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {expanded[item.id] ? 'Show Less' : 'Read Full Text'}
                  {expanded[item.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


