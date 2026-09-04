import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-20 lg:py-24 islamic-pattern-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <img
            src="/logo.png"
            alt="Rah-e-Hidayat Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl object-cover shadow-lg"
          />
        </motion.div>

        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-xs font-bold uppercase tracking-wider mb-6 border border-[var(--border-color)]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The Ultimate Islamic Companion
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-[var(--text-main)] tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto"
        >
          Walk the Path of{' '}
          <span className="text-[#0F5132] dark:text-[#34D399]">
            Guidance
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-base sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-normal leading-relaxed mb-8"
        >
          Read the Holy Quran, discover authentic Hadith, practice daily Azkar & Duas, and strengthen your faith in a serene, distraction-free sanctuary.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link to="/quran" className="btn-primary !py-3.5 !px-8 !text-base !font-bold w-full sm:w-auto shadow-lg">
            <BookOpen className="w-5 h-5" /> Explore Quran
          </Link>
          <Link to="/duas" className="btn-secondary !py-3.5 !px-8 !text-base !font-bold w-full sm:w-auto">
            <Heart className="w-5 h-5 text-rose-500" /> Daily Duas
          </Link>
        </motion.div>

        {/* Bismillah Calligraphy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="arabic-text text-2xl sm:text-4xl text-[var(--primary-main)] opacity-70 select-none"
          aria-hidden="true"
        >
          بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
        </motion.p>
      </div>
    </section>
  );
}
