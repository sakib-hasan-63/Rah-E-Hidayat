import { useState, useEffect, useMemo } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, Star, Clock, ChevronRight } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';

// 50+ Islamic quiz questions organized by category
const allQuestions = [
  // === QURAN ===
  { q: 'How many Surahs are there in the Holy Quran?', opts: ['110', '114', '124', '144'], ans: 1, exp: 'The Quran contains 114 Surahs, beginning with Surah Al-Fatihah and concluding with Surah An-Nas.', cat: 'Quran' },
  { q: 'Which Surah is known as the "Heart of the Quran"?', opts: ['Al-Mulk', 'Al-Baqarah', 'Ya-Sin', 'Ar-Rahman'], ans: 2, exp: 'Prophet Muhammad (ﷺ) referred to Surah Ya-Sin as the heart of the Quran.', cat: 'Quran' },
  { q: 'Which is the longest Surah in the Quran?', opts: ['Al-Imran', 'An-Nisa', 'Al-Baqarah', 'Al-Maidah'], ans: 2, exp: 'Surah Al-Baqarah has 286 verses, making it the longest Surah in the Quran.', cat: 'Quran' },
  { q: 'Which Surah is recited in every Rakat of Salah?', opts: ['Al-Ikhlas', 'Al-Fatihah', 'An-Nas', 'Al-Falaq'], ans: 1, exp: 'Surah Al-Fatihah is obligatory in every Rakat of prayer.', cat: 'Quran' },
  { q: 'In which month was the Quran revealed?', opts: ['Shaban', 'Rajab', 'Ramadan', 'Muharram'], ans: 2, exp: 'The Quran was first revealed in the month of Ramadan on Laylatul Qadr.', cat: 'Quran' },
  { q: 'Which Surah is called "The Chapter of Monotheism"?', opts: ['Al-Falaq', 'Al-Kafirun', 'Al-Ikhlas', 'At-Takathur'], ans: 2, exp: 'Surah Al-Ikhlas declares the Oneness of Allah in pure monotheism.', cat: 'Quran' },
  { q: 'How many Juz (parts) does the Quran have?', opts: ['25', '28', '30', '32'], ans: 2, exp: 'The Quran is divided into 30 Juz (parts) for ease of recitation.', cat: 'Quran' },
  { q: 'Which Surah does not begin with Bismillah?', opts: ['Al-Fatihah', 'At-Tawbah', 'Al-Baqarah', 'Al-Mulk'], ans: 1, exp: 'Surah At-Tawbah (Surah 9) is the only Surah that does not begin with Bismillah.', cat: 'Quran' },

  // === PROPHETS ===
  { q: 'Which prophet was given the Zabur (Psalms)?', opts: ['Musa (AS)', 'Dawud (AS)', 'Isa (AS)', 'Ibrahim (AS)'], ans: 1, exp: 'Prophet Dawud (David, AS) was granted the Zabur.', cat: 'Prophets' },
  { q: 'Who was the first prophet in Islam?', opts: ['Nuh (AS)', 'Ibrahim (AS)', 'Adam (AS)', 'Muhammad (ﷺ)'], ans: 2, exp: 'Prophet Adam (AS) was the first human and the first prophet created by Allah.', cat: 'Prophets' },
  { q: 'Which prophet built the Kaaba?', opts: ['Muhammad (ﷺ)', 'Musa (AS)', 'Ibrahim (AS)', 'Nuh (AS)'], ans: 2, exp: 'Prophet Ibrahim (AS) and his son Ismail (AS) built the Kaaba in Makkah.', cat: 'Prophets' },
  { q: 'Which prophet was swallowed by a whale?', opts: ['Yunus (AS)', 'Ayyub (AS)', 'Hud (AS)', 'Salih (AS)'], ans: 0, exp: 'Prophet Yunus (Jonah, AS) was swallowed by a whale and prayed to Allah from its belly.', cat: 'Prophets' },
  { q: 'How many prophets are mentioned by name in the Quran?', opts: ['20', '25', '30', '35'], ans: 1, exp: '25 prophets are mentioned by name in the Holy Quran.', cat: 'Prophets' },
  { q: 'Which prophet had the ability to speak to animals?', opts: ['Dawud (AS)', 'Sulaiman (AS)', 'Idris (AS)', 'Yaqub (AS)'], ans: 1, exp: 'Prophet Sulaiman (Solomon, AS) was granted the ability to communicate with animals and jinn.', cat: 'Prophets' },
  { q: 'Which prophet is known as "Khalilullah" (Friend of Allah)?', opts: ['Musa (AS)', 'Isa (AS)', 'Ibrahim (AS)', 'Nuh (AS)'], ans: 2, exp: 'Prophet Ibrahim (AS) holds the title Khalilullah, meaning the close friend of Allah.', cat: 'Prophets' },

  // === PILLARS ===
  { q: 'How many pillars of Islam are there?', opts: ['3', '4', '5', '6'], ans: 2, exp: 'The five pillars of Islam are: Shahada, Salah, Zakah, Sawm, and Hajj.', cat: 'Pillars' },
  { q: 'How many times a day must a Muslim pray?', opts: ['3', '4', '5', '7'], ans: 2, exp: 'Muslims are required to perform 5 daily prayers: Fajr, Dhuhr, Asr, Maghrib, and Isha.', cat: 'Pillars' },
  { q: 'What percentage of savings is given as Zakah?', opts: ['1.5%', '2.5%', '5%', '10%'], ans: 1, exp: 'Zakah is calculated at 2.5% of savings held for one lunar year.', cat: 'Pillars' },
  { q: 'In which Islamic month is fasting obligatory?', opts: ['Shawwal', 'Dhul Hijjah', 'Ramadan', 'Rajab'], ans: 2, exp: 'Fasting during the month of Ramadan is one of the five pillars of Islam.', cat: 'Pillars' },
  { q: 'What is the first pillar of Islam?', opts: ['Salah', 'Shahada', 'Zakah', 'Hajj'], ans: 1, exp: 'The Shahada (testimony of faith) is the first pillar — declaring belief in Allah and His Messenger.', cat: 'Pillars' },
  { q: 'Hajj is performed in which city?', opts: ['Madinah', 'Makkah', 'Jerusalem', 'Baghdad'], ans: 1, exp: 'Hajj is the annual pilgrimage to the Kaaba in Makkah, Saudi Arabia.', cat: 'Pillars' },
  { q: 'How many Rakats are in the Fajr prayer?', opts: ['2', '3', '4', '1'], ans: 0, exp: 'Fajr prayer consists of 2 obligatory (Fard) Rakats.', cat: 'Pillars' },

  // === HADITH & SUNNAH ===
  { q: 'Who compiled the most authentic collection of Hadith?', opts: ['Imam Muslim', 'Imam Abu Dawud', 'Imam Bukhari', 'Imam Tirmidhi'], ans: 2, exp: 'Sahih al-Bukhari, compiled by Imam Muhammad ibn Ismail al-Bukhari, is considered the most authentic Hadith collection.', cat: 'Hadith' },
  { q: 'What does "Sunnah" literally mean?', opts: ['Law', 'Way/Path', 'Tradition', 'Command'], ans: 1, exp: 'Sunnah literally means "way" or "path" — referring to the practices of Prophet Muhammad (ﷺ).', cat: 'Hadith' },
  { q: 'How many main Hadith collections are there (Kutub al-Sittah)?', opts: ['4', '6', '8', '10'], ans: 1, exp: 'The six major Hadith collections are Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa\'i, and Ibn Majah.', cat: 'Hadith' },
  { q: 'What is said before eating according to the Sunnah?', opts: ['Alhamdulillah', 'SubhanAllah', 'Bismillah', 'Allahu Akbar'], ans: 2, exp: 'Saying "Bismillah" (In the name of Allah) before eating is from the Sunnah of the Prophet (ﷺ).', cat: 'Hadith' },
  { q: 'Which hand should be used for eating, according to Islamic etiquette?', opts: ['Left', 'Right', 'Both', 'Either'], ans: 1, exp: 'The Prophet (ﷺ) instructed eating and drinking with the right hand.', cat: 'Hadith' },
  { q: 'What should a Muslim say when sneezing?', opts: ['SubhanAllah', 'Alhamdulillah', 'Astaghfirullah', 'MashaAllah'], ans: 1, exp: 'The Prophet (ﷺ) taught saying "Alhamdulillah" (All praise is for Allah) after sneezing.', cat: 'Hadith' },

  // === GENERAL KNOWLEDGE ===
  { q: 'What is the holiest city in Islam?', opts: ['Madinah', 'Makkah', 'Jerusalem', 'Cairo'], ans: 1, exp: 'Makkah, the birthplace of Prophet Muhammad (ﷺ) and home of the Kaaba, is the holiest city.', cat: 'General' },
  { q: 'What is the name of the Islamic holy book?', opts: ['Torah', 'Injil', 'Quran', 'Zabur'], ans: 2, exp: 'The Quran is the final holy scripture revealed by Allah to Prophet Muhammad (ﷺ).', cat: 'General' },
  { q: 'What is the first month of the Islamic calendar?', opts: ['Ramadan', 'Safar', 'Muharram', 'Rajab'], ans: 2, exp: 'Muharram is the first month of the Islamic (Hijri) calendar.', cat: 'General' },
  { q: 'What is Laylatul Qadr?', opts: ['Eid night', 'Night of Power', 'Night of Forgiveness', 'Night of Journey'], ans: 1, exp: 'Laylatul Qadr (Night of Power/Decree) falls in the last 10 nights of Ramadan and is better than 1000 months.', cat: 'General' },
  { q: 'What event does "Hijrah" refer to?', opts: ['Birth of Prophet (ﷺ)', 'Conquest of Makkah', 'Migration to Madinah', 'Battle of Badr'], ans: 2, exp: 'Hijrah refers to the migration of Prophet Muhammad (ﷺ) from Makkah to Madinah in 622 CE.', cat: 'General' },
  { q: 'What is the Qibla direction?', opts: ['Madinah', 'Jerusalem', 'Makkah (Kaaba)', 'East'], ans: 2, exp: 'The Qibla is the direction of the Kaaba in Makkah, towards which Muslims face during prayer.', cat: 'General' },
  { q: 'What is Wudu?', opts: ['A type of prayer', 'Ritual ablution', 'A form of Dhikr', 'A fasting method'], ans: 1, exp: 'Wudu is the ritual washing/ablution performed before Salah to achieve spiritual and physical purity.', cat: 'General' },
  { q: 'How many angels are mentioned by name in the Quran?', opts: ['2', '4', '6', '10'], ans: 1, exp: 'Four angels mentioned by name: Jibril, Mikail, Israfil (in Hadith), and Malik.', cat: 'General' },
];

// Generate a daily quiz (5 questions) based on today's date
function getDailyQuestions() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const seed = today.getFullYear() * 1000 + dayOfYear;

  // Simple seeded shuffle
  const shuffled = [...allQuestions];
  let m = shuffled.length;
  let s = seed;
  while (m) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const i = s % m--;
    [shuffled[m], shuffled[i]] = [shuffled[i], shuffled[m]];
  }
  return shuffled.slice(0, 5);
}

function getTodayKey() {
  const d = new Date();
  return `quiz-${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export default function QuizPage() {
  const dailyQuestions = useMemo(() => getDailyQuestions(), []);
  const todayKey = getTodayKey();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); // track each answer
  const [showResult, setShowResult] = useState(false);
  const [completedToday, setCompletedToday] = useState(false);
  const [savedScore, setSavedScore] = useState(null);

  // Check if already completed today
  useEffect(() => {
    const saved = localStorage.getItem(todayKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedToday(true);
        setSavedScore(data.score);
        setAnswers(data.answers || []);
        setScore(data.score);
        setShowResult(true);
      } catch (e) { /* ignore */ }
    }
  }, [todayKey]);

  const handleSelect = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    const correct = idx === dailyQuestions[currentIdx].ans;
    const newAnswers = [...answers, { selected: idx, correct }];
    setAnswers(newAnswers);
    if (correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < dailyQuestions.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOpt(null);
    } else {
      const finalScore = score + (selectedOpt === dailyQuestions[currentIdx].ans && answers[answers.length - 1]?.correct ? 0 : 0);
      // Save completion
      localStorage.setItem(todayKey, JSON.stringify({ score, answers, completedAt: new Date().toISOString() }));
      setCompletedToday(true);
      setShowResult(true);
    }
  };

  const q = dailyQuestions[currentIdx];
  const progress = ((currentIdx + (selectedOpt !== null ? 1 : 0)) / dailyQuestions.length) * 100;

  const getScoreMessage = (s, total) => {
    const pct = (s / total) * 100;
    if (pct === 100) return { text: 'Perfect Score! MashaAllah! 🌟', color: 'text-emerald-600 dark:text-emerald-400' };
    if (pct >= 80) return { text: 'Excellent! May Allah increase your knowledge 📚', color: 'text-emerald-600 dark:text-emerald-400' };
    if (pct >= 60) return { text: 'Good effort! Keep learning InshaAllah 💪', color: 'text-amber-600 dark:text-amber-400' };
    return { text: 'Keep learning! Every step counts InshaAllah 🤲', color: 'text-blue-600 dark:text-blue-400' };
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader
        title="Daily Islamic Quiz"
        subtitle="Test your knowledge of Islam with 5 new questions every day."
      />

      {/* Daily badge */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-xs font-bold">
          <Clock className="w-3.5 h-3.5" />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        {completedToday && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        )}
      </div>

      {showResult ? (
        /* Results */
        <div className="card-premium p-8 sm:p-10 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0F5132] to-[#34D399] flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] mb-2">
            {score} / {dailyQuestions.length}
          </h2>
          <p className={`text-sm font-bold mb-6 ${getScoreMessage(score, dailyQuestions.length).color}`}>
            {getScoreMessage(score, dailyQuestions.length).text}
          </p>

          {/* Answer Review */}
          <div className="space-y-3 text-left mb-6">
            {dailyQuestions.map((dq, i) => {
              const ans = answers[i];
              return (
                <div key={i} className={`p-4 rounded-xl border ${ans?.correct ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 dark:border-emerald-700' : 'border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-700'}`}>
                  <p className="text-xs font-bold text-[var(--text-main)] mb-1">{i + 1}. {dq.q}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {ans?.correct ? '✅ Correct' : `❌ Wrong — Correct: ${dq.opts[dq.ans]}`}
                    {' · '}{dq.exp}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-[var(--text-sub)] mb-4">
            Come back tomorrow for a new set of questions InshaAllah! 🌙
          </p>
        </div>
      ) : (
        /* Quiz In Progress */
        <div className="card-premium p-6 sm:p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-sub)] mb-2">
              <span>Question {currentIdx + 1} of {dailyQuestions.length}</span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-[10px]">
                {q.cat}
              </span>
            </div>
            <div className="h-2 bg-[var(--bg-main)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0F5132] to-[#34D399] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-main)] mb-5 leading-snug">
            {q.q}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {q.opts.map((opt, idx) => {
              let style = 'border-[var(--border-color)] hover:border-[#0F5132]/40 hover:bg-[var(--primary-light)]';
              if (selectedOpt !== null) {
                if (idx === q.ans) style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/40 text-[var(--text-main)]';
                else if (idx === selectedOpt && idx !== q.ans) style = 'border-red-400 bg-red-50 dark:bg-red-900/40 text-[var(--text-main)]';
                else style = 'border-[var(--border-color)] opacity-50';
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedOpt !== null}
                  className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all text-sm font-medium text-[var(--text-main)] flex items-center gap-3 ${style} disabled:cursor-default`}
                >
                  <span className="w-7 h-7 rounded-lg bg-[var(--bg-main)] flex items-center justify-center text-xs font-bold text-[var(--text-sub)] flex-shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                  {selectedOpt !== null && idx === q.ans && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto" />}
                  {selectedOpt === idx && idx !== q.ans && <XCircle className="w-5 h-5 text-red-400 ml-auto" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {selectedOpt !== null && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 mb-5 leading-relaxed">
              <strong>Explanation:</strong> {q.exp}
            </div>
          )}

          {/* Next Button */}
          {selectedOpt !== null && (
            <button onClick={handleNext} className="btn-primary w-full !py-3 !font-bold text-sm">
              {currentIdx + 1 < dailyQuestions.length ? (
                <>Next Question <ChevronRight className="w-4 h-4" /></>
              ) : (
                <>See Results <Trophy className="w-4 h-4" /></>
              )}
            </button>
          )}

          {/* Score indicator */}
          <div className="flex items-center justify-center gap-3 mt-4">
            {dailyQuestions.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i < answers.length
                    ? answers[i]?.correct ? 'bg-emerald-500' : 'bg-red-400'
                    : i === currentIdx ? 'bg-[var(--primary-main)] scale-125' : 'bg-[var(--border-color)]'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <p className="text-center text-[10px] text-[var(--text-sub)] mt-6">
        {allQuestions.length} total questions · 5 questions daily · New quiz at midnight
      </p>
    </div>
  );
}
