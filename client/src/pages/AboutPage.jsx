import SectionHeader from '../components/common/SectionHeader';
import { Heart, Compass, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader
        title="About Rah-e-Hidayat"
        subtitle="“Walk the Path of Guidance”"
      />

      <div className="card p-8 space-y-6 text-sm sm:text-base text-[#4A5548] dark:text-[#B8C4B0] leading-relaxed">
        <p>
          <strong className="text-[#0F5132] dark:text-[#6EE7B7] text-lg font-display">Rah-e-Hidayat</strong> was created with a heartfelt mission: to offer Muslims worldwide a serene, modern, and trustworthy digital sanctuary to read the Quran, remember Allah through daily Azkar & Duas, and deepen authentic Islamic knowledge.
        </p>

        <h3 className="font-display text-xl font-bold text-[#1A1A1A] dark:text-[#F0EDE5]">
          Our Principles
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#0F5132]/5 dark:bg-[#10B981]/5 border border-[#0F5132]/10 dark:border-white/10">
            <h4 className="font-semibold text-[#0F5132] dark:text-[#6EE7B7] mb-1">Authenticity</h4>
            <p className="text-xs text-[#7A8578]">Verified references for every Ayah, Hadith, and supplication.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0F5132]/5 dark:bg-[#10B981]/5 border border-[#0F5132]/10 dark:border-white/10">
            <h4 className="font-semibold text-[#0F5132] dark:text-[#6EE7B7] mb-1">Tranquility</h4>
            <p className="text-xs text-[#7A8578]">Ad-free, distraction-free reading experience crafted with care.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0F5132]/5 dark:bg-[#10B981]/5 border border-[#0F5132]/10 dark:border-white/10">
            <h4 className="font-semibold text-[#0F5132] dark:text-[#6EE7B7] mb-1">Accessibility</h4>
            <p className="text-xs text-[#7A8578]">Responsive, dark-mode ready, and accessible for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
