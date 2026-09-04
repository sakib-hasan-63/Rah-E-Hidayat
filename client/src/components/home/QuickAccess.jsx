import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Heart, MessageSquareText, Calculator,
  BookOpenCheck, Clock, CalendarDays
} from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const quickAccessItems = [
  {
    label: 'Quran',
    description: '114 Surahs with audio & translation',
    path: '/quran',
    icon: BookOpen,
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-100 dark:bg-emerald-950/40',
  },
  {
    label: 'Duas',
    description: 'Daily authentic supplications',
    path: '/duas',
    icon: Heart,
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-100 dark:bg-purple-950/40',
  },
  {
    label: 'Hadith',
    description: 'Prophetic wisdom & Sahih collections',
    path: '/hadith',
    icon: MessageSquareText,
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-100 dark:bg-amber-950/40',
  },
  {
    label: 'Tasbeeh',
    description: 'Digital dhikr counter with targets',
    path: '/tasbeeh',
    icon: Calculator,
    color: 'text-cyan-700 dark:text-cyan-300',
    bg: 'bg-cyan-100 dark:bg-cyan-950/40',
  },
  {
    label: 'Azkar',
    description: 'Morning & evening fortress protection',
    path: '/azkar',
    icon: BookOpenCheck,
    color: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-100 dark:bg-teal-950/40',
  },
  {
    label: 'Prayer Times',
    description: 'Accurate location-based times',
    path: '/prayer-times',
    icon: Clock,
    color: 'text-rose-700 dark:text-rose-300',
    bg: 'bg-rose-100 dark:bg-rose-950/40',
  },
  {
    label: 'Calendar',
    description: 'Sacred Hijri months & blessed days',
    path: '/islamic-calendar',
    icon: CalendarDays,
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-100 dark:bg-blue-950/40',
  },
];

export default function QuickAccess() {
  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Explore & Worship"
          subtitle="Access essential Islamic resources and spiritual tools for your daily practice."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
          {quickAccessItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              id={`quick-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="card-premium p-5 flex flex-col items-center text-center group hover:border-[#0F5132] dark:hover:border-[#34D399] transition-all"
            >
              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <item.icon className="w-5 h-5" strokeWidth={2.2} />
              </div>

              {/* Title & Desc */}
              <h3 className="text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--primary-main)] transition-colors mb-1">
                {item.label}
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] leading-tight hidden sm:block">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
