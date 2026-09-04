import { useState } from 'react';
import {
  Sparkles, Heart, Star, BookOpen, Smile, Sun, Moon,
  Award, CheckCircle2, ChevronRight, Volume2, Shield,
  Gift, Compass, MessageCircle, HelpCircle
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';

const categories = [
  { id: 'stories', label: '📖 Prophet Stories', icon: BookOpen },
  { id: 'duas', label: '🤲 Short Duas', icon: Heart },
  { id: 'manners', label: '🌟 Islamic Manners', icon: Smile },
  { id: 'salah', label: '🕌 Salah & Wudu Basics', icon: Compass },
  { id: 'quiz', label: '🎯 Fun Kids Quiz', icon: HelpCircle },
];

const prophetStories = [
  {
    id: 1,
    title: 'Prophet Muhammad ﷺ — The Trustworthy (Al-Amin)',
    subtitle: 'Life of the final Messenger of Allah',
    badge: 'Seerah for Kids',
    color: 'from-emerald-500 to-teal-600',
    lesson: 'Always speak the truth, be gentle with animals and children, and smile at everyone.',
    story: 'Long before he became a Prophet, Muhammad ﷺ was known across Makkah as "Al-Amin" (The Trustworthy) and "As-Sadiq" (The Truthful). People would trust him with their most valuable belongings. He loved helping the poor, caring for orphans, and being kind to elders. Even when people were unkind to him, he responded with patience, kindness, and forgiveness.'
  },
  {
    id: 2,
    title: 'The Great Ark of Prophet Nuh (AS)',
    subtitle: 'Faith, perseverance and rescue',
    badge: 'Prophet Story',
    color: 'from-amber-400 to-orange-500',
    lesson: 'Listen to Allah and never lose hope, even when tasks seem very big.',
    story: 'Prophet Nuh (AS) called his people to worship Allah for 950 years. Allah commanded him to build a giant ship (the Ark) in the desert. Everyone laughed at him, but Nuh had strong faith. When the great flood came, Allah saved Nuh, the believers, and a pair of every animal inside the safe Ark.'
  },
  {
    id: 3,
    title: 'Prophet Ibrahim (AS) & The Cool Fire',
    subtitle: 'Friend of Allah & The Builder of the Kaaba',
    badge: 'Prophet Story',
    color: 'from-rose-500 to-pink-600',
    lesson: 'Trust completely in Allah. He protects those who stand up for what is right.',
    story: 'Prophet Ibrahim (AS) invited people to worship only One Creator instead of stones and statues. The king threw Ibrahim into a massive roaring fire. But Allah commanded: "O fire, be cool and peaceful for Ibrahim!" The fire did not burn even a single thread of his clothes.'
  },
  {
    id: 4,
    title: 'Prophet Yusuf (AS) & The Beautiful Dreams',
    subtitle: 'Patience and forgiveness',
    badge: 'Character & Faith',
    color: 'from-cyan-500 to-blue-600',
    lesson: 'Hard times do not last forever. Be patient and forgive those who make mistakes.',
    story: 'Prophet Yusuf (AS) saw a dream where 11 stars, the sun, and the moon bowed to him. His jealous brothers threw him in a deep well. But Allah protected him, and after many years of patience, he became a wise minister in Egypt and lovingly forgave his brothers.'
  },
  {
    id: 5,
    title: 'Prophet Yunus (AS) in the Belly of the Whale',
    subtitle: 'The power of sincere repentance',
    badge: 'Prophet Story',
    color: 'from-indigo-500 to-purple-600',
    lesson: 'Whenever you feel scared or make a mistake, turn to Allah with heartfelt prayer.',
    story: 'Prophet Yunus (AS) was in the middle of a stormy sea when a huge gentle whale swallowed him. Inside the darkness of the sea and the whale, he prayed: "La ilaha illa Anta, Subhanaka inni kuntu minaz-zalimin." Allah heard his sincere prayer and brought him safely back to the shore.'
  }
];

const shortDuas = [
  {
    title: 'Before Eating / Starting Anything',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah',
    meaning: 'In the name of Allah.',
    when: 'Say before eating, drinking, or beginning your homework!'
  },
  {
    title: 'After Eating Food',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا',
    transliteration: 'Alhamdulillahil-lathee at\'amana wa saqana',
    meaning: 'Praise be to Allah who fed us and gave us drink.',
    when: 'Say when you finish your meal or snack to thank Allah.'
  },
  {
    title: 'Before Sleeping',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amootu wa-ahya',
    meaning: 'In Your name, O Allah, I die and live.',
    when: 'Recite as you get into bed and close your eyes.'
  },
  {
    title: 'Waking Up in the Morning',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا',
    transliteration: 'Alhamdulillahil-lathee ahyana ba\'da ma amatana',
    meaning: 'Praise be to Allah who gave us life after taking it.',
    when: 'Say as soon as you wake up to welcome the new blessed day!'
  },
  {
    title: 'When Sneezing & Responding',
    arabic: 'الْحَمْدُ لِلَّهِ — يَرْحَمُكَ اللَّهُ',
    transliteration: 'Sneezer: "Alhamdulillah" · Listener: "Yarhamukallah"',
    meaning: 'All praise to Allah — May Allah have mercy on you.',
    when: 'Say Alhamdulillah when sneezing; if a friend sneezes, say Yarhamukallah!'
  },
  {
    title: 'Entering the House',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا ، وَبِسْمِ اللَّهِ خَرَجْنَا',
    transliteration: 'Bismillahi walajna, wa bismillahi kharajna',
    meaning: 'In the name of Allah we enter, and in the name of Allah we leave.',
    when: 'Say whenever you step inside your home, then give Salam to your family.'
  }
];

const islamicManners = [
  {
    title: 'Saying Salam First',
    icon: '👋',
    desc: 'Always be the first to say "As-salamu alaykum" (Peace be upon you) with a warm smile when meeting friends, teachers, and family.'
  },
  {
    title: 'Eating with the Right Hand',
    icon: '🍽️',
    desc: 'Prophet Muhammad ﷺ taught us to sit down, say Bismillah, eat with our right hand, and eat from the food closest to us.'
  },
  {
    title: 'Respecting & Loving Parents',
    icon: '❤️',
    desc: 'Say kind words to Mom and Dad, listen when they speak, help them with clean-up, and make dua for them every single day.'
  },
  {
    title: 'Always Telling the Truth',
    icon: '🛡️',
    desc: 'Being truthful (Sidq) makes Allah love you and makes everyone trust you. Never tell lies, even in fun or jokes.'
  },
  {
    title: 'Sharing Toys and Books',
    icon: '🎁',
    desc: 'Allah loves children who share generously with brothers, sisters, and friends. Giving brings barakah and happiness.'
  },
  {
    title: 'Keeping Cleanliness (Taharah)',
    icon: '✨',
    desc: 'Cleanliness is half of faith! Brush teeth, wash hands regularly, wear clean clothes, and keep your room tidy.'
  }
];

const salahSteps = [
  {
    step: '1. Wudu (Ablution)',
    desc: 'Wash hands, mouth, nose, face, arms up to elbows, wipe head & ears, and wash feet up to ankles.'
  },
  {
    step: '2. Niyyah & Takbeer',
    desc: 'Make the intention in your heart, face the Qibla (Kaaba), raise hands and say "Allahu Akbar".'
  },
  {
    step: '3. Qiyam & Recitation',
    desc: 'Place right hand over left on chest. Recite Surah Al-Fatihah and another short Surah (like Al-Ikhlas).'
  },
  {
    step: '4. Ruku (Bowing)',
    desc: 'Bow down placing hands on knees with a straight back and say: "Subhana Rabbiyal Azeem" (3 times).'
  },
  {
    step: '5. Sujood (Prostration)',
    desc: 'Touch forehead, nose, palms, knees and toes to the floor. Say: "Subhana Rabbiyal A\'la" (3 times).'
  },
  {
    step: '6. Tashahhud & Tasleem',
    desc: 'Sit calmly, recite the Tashahhud & Salawat, then turn head right saying "As-salamu alaykum wa rahmatullah", then left.'
  }
];

const kidsQuizQuestions = [
  {
    q: 'What is the first thing we say before eating food?',
    opts: ['Alhamdulillah', 'Bismillah', 'Allahu Akbar'],
    ans: 1,
    praise: 'MashaAllah! Spot on! 🎉'
  },
  {
    q: 'How many daily prayers (Salah) do Muslims pray?',
    opts: ['3 prayers', '5 prayers', '7 prayers'],
    ans: 1,
    praise: 'Super star! 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha) 🌟'
  },
  {
    q: 'Which holy book was revealed to Prophet Muhammad ﷺ?',
    opts: ['The Holy Quran', 'The Zabur', 'The Torah'],
    ans: 0,
    praise: 'Brilliant! The Quran is Allah\'s final guidance 📖'
  },
  {
    q: 'Which hand should we always eat and drink with?',
    opts: ['Left Hand', 'Right Hand', 'Both Hands'],
    ans: 1,
    praise: 'Great job following the Sunnah! Right hand 🍽️'
  }
];

export default function KidsCornerPage() {
  const [activeTab, setActiveTab] = useState('stories');
  const [expandedStory, setExpandedStory] = useState(1);

  // Kids Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const handleQuizSelect = (idx) => {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    if (idx === kidsQuizQuestions[quizIdx].ans) {
      setQuizScore(s => s + 1);
    }
  };

  const handleQuizNext = () => {
    if (quizIdx + 1 < kidsQuizQuestions.length) {
      setQuizIdx(i => i + 1);
      setQuizSelected(null);
    } else {
      setQuizDone(true);
    }
  };

  const resetQuiz = () => {
    setQuizIdx(0);
    setQuizSelected(null);
    setQuizScore(0);
    setQuizDone(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Playful Hero Header */}
      <div
        className="rounded-3xl p-8 sm:p-12 mb-10 text-center text-white relative overflow-hidden shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #0F5132 0%, #166534 50%, #047857 100%)',
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-4 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-300" /> Welcome Young Believers!
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold mb-3 drop-shadow-md">
            Kids Islamic Corner
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-medium">
            Explore exciting stories of the Prophets, learn sweet everyday Duas, discover prayer basics,
            and practice noble manners taught by Prophet Muhammad ﷺ.
          </p>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all transform hover:scale-105 ${
                isActive
                  ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013] shadow-md ring-2 ring-[#0F5132]/30'
                  : 'bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-color)] hover:bg-[var(--primary-light)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROPHET STORIES */}
      {activeTab === 'stories' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prophetStories.map((s) => (
              <div
                key={s.id}
                onClick={() => setExpandedStory(s.id === expandedStory ? null : s.id)}
                className={`card-premium p-6 rounded-3xl cursor-pointer transition-all hover:shadow-xl border-2 ${
                  expandedStory === s.id
                    ? 'border-[#0F5132] dark:border-[#34D399] ring-2 ring-[#0F5132]/10 bg-[var(--primary-light)]/20'
                    : 'border-[var(--border-color)]'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4 shadow-md`}>
                  <Star className="w-6 h-6" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-[11px] font-bold mb-2">
                  {s.badge}
                </span>

                <h3 className="font-display text-lg font-bold text-[var(--text-main)] mb-1 leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-[var(--text-sub)] font-medium mb-3">{s.subtitle}</p>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
                  {s.story}
                </p>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-200">
                  <span className="font-bold">💡 Golden Lesson:</span> {s.lesson}
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-bold text-[var(--primary-main)]">
                  <span>{expandedStory === s.id ? 'Tap to close' : 'Tap to read full story'}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${expandedStory === s.id ? 'rotate-90' : ''}`} />
                </div>

                {expandedStory === s.id && (
                  <div className="mt-4 pt-4 border-t border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] leading-relaxed bg-[var(--bg-main)]/70 border border-[var(--border-color)] p-4 rounded-2xl">
                    <p className="font-medium">{s.story}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SHORT DUAS */}
      {activeTab === 'duas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shortDuas.map((d, i) => (
            <div key={i} className="card-premium p-6 sm:p-7 rounded-3xl border-2 border-[var(--border-color)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-[var(--text-main)]">{d.title}</h3>
              </div>

              {/* Arabic Box */}
              <div className="p-4 rounded-2xl bg-[var(--primary-light)]/50 border border-[var(--border-color)] my-3 text-center">
                <p className="text-xl sm:text-2xl text-[var(--primary-main)] font-bold mb-1" style={{ fontFamily: "'Amiri', serif" }}>
                  {d.arabic}
                </p>
                <p className="text-xs font-semibold text-[var(--text-sub)] italic">
                  {d.transliteration}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-[var(--text-muted)]">
                <p><strong className="text-[var(--text-main)]">Meaning:</strong> {d.meaning}</p>
                <p className="text-emerald-700 dark:text-emerald-300 font-medium">✨ {d.when}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ISLAMIC MANNERS */}
      {activeTab === 'manners' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {islamicManners.map((m, i) => (
            <div key={i} className="card-premium p-6 rounded-3xl border-2 border-[var(--border-color)] hover:border-[#0F5132]/30 transition-all">
              <div className="text-3xl mb-3">{m.icon}</div>
              <h3 className="font-bold text-base text-[var(--text-main)] mb-2">{m.title}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: SALAH & WUDU */}
      {activeTab === 'salah' && (
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="card-premium p-6 rounded-3xl border-2 border-emerald-500/20 bg-emerald-500/5 mb-6 text-center">
            <h3 className="font-display text-xl font-bold text-[var(--text-main)] mb-1">
              The 5 Daily Prayers (Salah)
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-xl mx-auto">
              Salah is our special direct connection with Allah, performed 5 times every day with love and devotion.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
              <div className="p-2 rounded-xl bg-white dark:bg-[#162118] border border-[var(--border-color)] text-xs">
                <span className="font-bold block text-[var(--primary-main)]">1. Fajr</span>
                <span className="text-[10px] text-[var(--text-sub)]">Dawn (2 Rakats)</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-[#162118] border border-[var(--border-color)] text-xs">
                <span className="font-bold block text-[var(--primary-main)]">2. Dhuhr</span>
                <span className="text-[10px] text-[var(--text-sub)]">Noon (4 Rakats)</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-[#162118] border border-[var(--border-color)] text-xs">
                <span className="font-bold block text-[var(--primary-main)]">3. Asr</span>
                <span className="text-[10px] text-[var(--text-sub)]">Afternoon (4 Rakats)</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-[#162118] border border-[var(--border-color)] text-xs">
                <span className="font-bold block text-[var(--primary-main)]">4. Maghrib</span>
                <span className="text-[10px] text-[var(--text-sub)]">Sunset (3 Rakats)</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-[#162118] border border-[var(--border-color)] text-xs">
                <span className="font-bold block text-[var(--primary-main)]">5. Isha</span>
                <span className="text-[10px] text-[var(--text-sub)]">Night (4 Rakats)</span>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-base text-[var(--text-main)] mb-3">Step-by-Step Prayer Guide</h3>
          <div className="space-y-3">
            {salahSteps.map((st, i) => (
              <div key={i} className="card-premium p-4 sm:p-5 rounded-2xl flex items-start gap-3 border border-[var(--border-color)]">
                <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary-main)] font-bold flex items-center justify-center text-xs flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-main)] mb-1">{st.step}</h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FUN KIDS QUIZ */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto">
          <div className="card-premium p-8 rounded-3xl border-2 border-[var(--border-color)]">
            {quizDone ? (
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--text-main)] mb-1">
                  MashaAllah Champion! 🌟
                </h3>
                <p className="text-sm font-bold text-[var(--primary-main)] mb-4">
                  You scored {quizScore} out of {kidsQuizQuestions.length}!
                </p>
                <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto mb-6">
                  May Allah bless you with wisdom, beneficial knowledge, and a bright smile every day!
                </p>
                <button onClick={resetQuiz} className="btn-primary !py-2.5 !px-6 !text-xs">
                  Play Again 🔄
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[var(--text-sub)] mb-4">
                  <span>Question {quizIdx + 1} of {kidsQuizQuestions.length}</span>
                  <span className="text-amber-600 dark:text-amber-400">Score: {quizScore}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-[var(--text-main)] mb-6">
                  {kidsQuizQuestions[quizIdx].q}
                </h3>

                <div className="space-y-3 mb-6">
                  {kidsQuizQuestions[quizIdx].opts.map((opt, idx) => {
                    const isSelected = quizSelected === idx;
                    const isCorrect = idx === kidsQuizQuestions[quizIdx].ans;
                    let style = 'border-[var(--border-color)] hover:border-[#0F5132]/40 hover:bg-[var(--primary-light)]';

                    if (quizSelected !== null) {
                      if (isCorrect) style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                      else if (isSelected) style = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                      else style = 'opacity-40';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizSelect(idx)}
                        disabled={quizSelected !== null}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-bold text-xs sm:text-sm flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {quizSelected !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      </button>
                    );
                  })}
                </div>

                {quizSelected !== null && (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 mb-6 font-medium">
                    {kidsQuizQuestions[quizIdx].praise}
                  </div>
                )}

                {quizSelected !== null && (
                  <button onClick={handleQuizNext} className="btn-primary w-full !py-3 !font-bold text-sm">
                    {quizIdx + 1 < kidsQuizQuestions.length ? 'Next Question →' : 'See My Score 🎉'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
