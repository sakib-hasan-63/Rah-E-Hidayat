import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw, Plus, Minus, Sparkles, Volume2, VolumeX,
  Vibrate, Target, Award, CheckCircle2
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { useToast } from '../context/ToastContext';

const dhikrPresets = [
  { arabic: 'سُبْحَانَ ٱللَّٰهِ', transliteration: 'SubhanAllah', meaning: 'Glory be to Allah', target: 33 },
  { arabic: 'ٱلْحَمْدُ لِلَّٰهِ', transliteration: 'Alhamdulillah', meaning: 'All praise is due to Allah', target: 33 },
  { arabic: 'ٱللَّٰهُ أَكْبَرُ', transliteration: 'Allahu Akbar', meaning: 'Allah is the Greatest', target: 34 },
  { arabic: 'أَسْتَغْفِرُ ٱللَّٰهَ', transliteration: 'Astaghfirullah', meaning: 'I seek forgiveness from Allah', target: 100 },
  { arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', transliteration: 'La ilaha illallah', meaning: 'There is no god but Allah', target: 100 },
  { arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', transliteration: 'Salawat on the Prophet', meaning: 'O Allah, send blessings upon Muhammad', target: 100 },
];

export default function TasbeehPage() {
  const [selectedPreset, setSelectedPreset] = useState(dhikrPresets[0]);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [totalSessionCount, setTotalSessionCount] = useState(0);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    setTarget(selectedPreset.target);
    setCount(0);
    setIsCompleted(false);
  }, [selectedPreset]);

  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 600;
      gain.gain.value = 0.1;
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  };

  const increment = () => {
    const next = count + 1;
    setCount(next);
    setTotalSessionCount(prev => prev + 1);

    if (hapticEnabled && navigator.vibrate) {
      navigator.vibrate(next === target ? [100, 50, 100] : 40);
    }
    playBeep();

    if (next === target) {
      setIsCompleted(true);
      addToast(`Masha'Allah! Target of ${target} completed.`, 'success');
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setTotalSessionCount(Math.max(0, totalSessionCount - 1));
      if (hapticEnabled && navigator.vibrate) navigator.vibrate(20);
    }
  };

  const resetCount = () => {
    setCount(0);
    setIsCompleted(false);
  };

  const remaining = Math.max(0, target - count);
  const progressPercent = Math.min(Math.round((count / target) * 100), 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title="Digital Tasbeeh"
        subtitle="Keep your tongue moist with the remembrance and praise of Allah."
      />

      {/* Preset Badges Carousel / Grid */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {dhikrPresets.map((preset) => (
          <button
            key={preset.transliteration}
            onClick={() => setSelectedPreset(preset)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedPreset.transliteration === preset.transliteration
                ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013] shadow-md scale-105'
                : 'card-premium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[#0F5132]/30'
            }`}
          >
            {preset.transliteration}
          </button>
        ))}
      </div>

      {/* Main Tasbeeh Card */}
      <div className="card-premium max-w-lg mx-auto p-8 text-center relative overflow-hidden bg-white dark:bg-[#162118] border-2 border-[var(--border-color)] shadow-xl">
        {/* Active Dhikr Display */}
        <div className="mb-6">
          <p className="arabic-text text-3xl sm:text-4xl text-[#0F5132] dark:text-[#34D399] font-bold mb-1 leading-relaxed">
            {selectedPreset.arabic}
          </p>
          <h2 className="font-display text-xl font-bold text-[var(--text-main)]">
            {selectedPreset.transliteration}
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            "{selectedPreset.meaning}"
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 py-3 px-4 mb-6 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs">
          <div>
            <span className="text-[var(--text-sub)] block">Completed</span>
            <span className="font-bold text-sm text-[var(--primary-main)]">{count}</span>
          </div>
          <div>
            <span className="text-[var(--text-sub)] block">Target</span>
            <span className="font-bold text-sm text-[var(--text-main)]">{target}</span>
          </div>
          <div>
            <span className="text-[var(--text-sub)] block">Remaining</span>
            <span className="font-bold text-sm text-amber-600 dark:text-amber-400">{remaining}</span>
          </div>
        </div>

        {/* Big Tap Area Button */}
        <div className="relative flex flex-col items-center justify-center my-6">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={increment}
            className={`w-52 h-52 sm:w-60 sm:h-60 rounded-full flex flex-col items-center justify-center text-white select-none shadow-2xl transition-colors duration-200 border-4 ${
              isCompleted
                ? 'bg-gradient-to-br from-emerald-600 to-teal-700 border-[#C9A84C]'
                : 'bg-gradient-to-br from-[#0F5132] via-[#16653E] to-[#1B7A4E] dark:from-[#10B981] dark:to-[#047857] border-[#C9A84C]/50'
            }`}
          >
            <span className="text-6xl sm:text-7xl font-bold tracking-tight font-display text-[#FFFDF5] dark:text-[#062013]">
              {count}
            </span>
            <span className="text-xs uppercase tracking-widest text-[#FFFDF5]/80 dark:text-[#062013]/80 mt-1 font-bold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Tap to Count
            </span>
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-[var(--text-sub)] mb-1.5 font-bold">
            <span>Goal Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#0F5132] to-[#C9A84C] dark:from-[#34D399] dark:to-[#E6C66D] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Controls (- button, Reset, Custom Target) */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={decrement}
              disabled={count === 0}
              className="p-2.5 rounded-xl border border-[var(--border-color)] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-40 text-[var(--text-main)]"
              title="Decrement by 1"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={resetCount}
              className="p-2.5 rounded-xl border border-[var(--border-color)] hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-main)] inline-flex items-center gap-1 font-semibold"
              title="Reset Counter"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick target switches */}
            {[33, 99, 100].map(t => (
              <button
                key={t}
                onClick={() => { setTarget(t); setCount(0); }}
                className={`px-2.5 py-1.5 rounded-lg font-bold ${
                  target === t
                    ? 'bg-[var(--primary-light)] text-[var(--primary-main)]'
                    : 'text-[var(--text-sub)] hover:text-[var(--text-main)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
