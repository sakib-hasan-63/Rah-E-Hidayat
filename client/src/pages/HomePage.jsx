import HeroSection from '../components/home/HeroSection';
import QuickAccess from '../components/home/QuickAccess';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Quote, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Daily Ayah & Hadith Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ayah of the Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-6 sm:p-8 border-l-4 border-l-[var(--primary-main)] relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Ayah of the Day
              </span>
              <span className="text-xs text-[var(--text-sub)] font-medium">Surah Al-Baqarah (2:152)</span>
            </div>

            <p className="arabic-text mb-4 text-right leading-loose">
              فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ
            </p>
            <p className="text-sm sm:text-base text-[var(--text-muted)] italic mb-6">
              "So remember Me; I will remember you. And be grateful to Me and do not deny Me."
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
              <Link to="/quran" className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary-main)] hover:underline">
                Read in context <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-xs text-[var(--text-sub)]">Sahih International</span>
            </div>
          </motion.div>

          {/* Hadith of the Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card p-6 sm:p-8 border-l-4 border-l-[var(--accent-gold)] relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-gold-light)] text-[var(--accent-gold-text)] text-xs font-semibold uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5" /> Hadith of the Day
              </span>
              <span className="text-xs text-[var(--text-sub)] font-medium">Sahih al-Bukhari #1</span>
            </div>

            <p className="arabic-text mb-4 text-right leading-loose">
              إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى
            </p>
            <p className="text-sm sm:text-base text-[var(--text-muted)] italic mb-6">
              "Actions are judged by intentions, and every person will get the reward according to what he intended."
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
              <Link to="/hadith" className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-gold-text)] hover:underline">
                Explore Hadith <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-xs text-[var(--text-sub)]">Narrated by Umar bin Al-Khattab</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Quick Access Services Grid */}
      <QuickAccess />

      {/* 4. Core Pillars of Rah-e-Hidayat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-3">
            Built with Sincerity & Precision
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base">
            Every feature on Rah-e-Hidayat is crafted for spiritual tranquility, verified references, and ease of daily worship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[var(--primary-light)] text-[var(--primary-main)] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Authentic Sources</h3>
            <p className="text-sm text-[var(--text-muted)]">
              All Quranic verses, Sahih Hadith, and prescribed Duas are strictly verified with authentic scholarly citations.
            </p>
          </div>

          <div className="card p-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-gold-light)] text-[var(--accent-gold-text)] flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Distraction-Free Experience</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Clean typography with high-contrast Arabic script, customizable font sizes, and serene dark mode reading.
            </p>
          </div>

          <div className="card p-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Personal Growth & Tracking</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Keep track of your daily Azkar streaks, bookmarked verses, and Tasbeeh targets without worldly distractions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
