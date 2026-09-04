import { useState, useEffect } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { Calendar as CalendarIcon, Moon, Star, Info, Sparkles, Loader2 } from 'lucide-react';

const upcomingEvents = [
  { name: '1st Ramadan (Expected)', hijri: '1 Ramadan 1448', date: 'February 2027', desc: 'The blessed month of compulsory fasting, night prayers (Taraweeh), and Quran recitation.' },
  { name: 'Laylatul Qadr (Night of Power)', hijri: '27 Ramadan 1448', date: 'March 2027', desc: 'The supreme night of decree and worship, celebrated as better than a thousand months.' },
  { name: 'Eid al-Fitr', hijri: '1 Shawwal 1448', date: 'March 2027', desc: 'Celebration marking the conclusion of the blessed fasting month of Ramadan.' },
  { name: 'Day of Arafah', hijri: '9 Dhul Hijjah 1448', date: 'May 2027', desc: 'The pinnacle day of Hajj pilgrimmage and the greatest day of forgiveness and supplication.' },
  { name: 'Eid al-Adha', hijri: '10 Dhul Hijjah 1448', date: 'May 2027', desc: 'Feast of the Sacrifice commemorating the devotion of Prophet Ibrahim (AS).' },
  { name: 'Islamic New Year', hijri: '1 Muharram 1449', date: 'June 2027', desc: 'Commencement of the new Hijri lunar calendar year.' },
  { name: 'Day of Ashura', hijri: '10 Muharram 1449', date: 'June 2027', desc: 'Day Allah saved Prophet Musa (AS) and the Children of Israel from Pharaoh.' },
];

export default function IslamicCalendarPage() {
  const [hijriDate, setHijriDate] = useState(null);
  const [gregorianDate, setGregorianDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHijriDate = async () => {
      try {
        setLoading(true);
        // Format today's date as DD-MM-YYYY for the Aladhan API
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const dateStr = `${dd}-${mm}-${yyyy}`;

        const res = await fetch(`https://api.aladhan.com/v1/gToH?date=${dateStr}`);
        const data = await res.json();

        if (data.code === 200 && data.data) {
          const hijri = data.data.hijri;
          const greg = data.data.gregorian;

          setHijriDate({
            day: hijri.day,
            month: hijri.month.en,
            monthAr: hijri.month.ar,
            year: hijri.year,
            designation: hijri.designation?.abbreviated || 'AH',
            weekdayEn: hijri.weekday?.en || '',
          });

          // Format Gregorian date nicely
          const gregDate = new Date(
            parseInt(greg.year),
            parseInt(greg.month.number) - 1,
            parseInt(greg.day)
          );
          setGregorianDate(
            gregDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          );
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err) {
        console.error('Failed to fetch Hijri date:', err);
        setError('Unable to fetch today\'s Islamic date. Please check your internet connection.');
        // Fallback to display today's Gregorian date at least
        const today = new Date();
        setGregorianDate(
          today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHijriDate();
  }, []);

  const hijriDisplayText = hijriDate
    ? `${hijriDate.day} ${hijriDate.month} ${hijriDate.year} ${hijriDate.designation}`
    : '';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title="Islamic Hijri Calendar"
        subtitle="Track sacred Islamic months, fasts, and blessed occasions throughout the lunar year."
      />

      {/* Current Hijri Date Banner */}
      <div
        className="rounded-2xl p-8 mb-8 text-center shadow-xl border-2 border-[#C9A84C]/50 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0F5132 0%, #1B7A4E 50%, #0F5132 100%)',
        }}
      >
        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10">
          {/* Today's Date Label */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm mb-4">
            <span
              className="w-2 h-2 rounded-full bg-[#FFE082]"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            />
            <span className="text-xs uppercase tracking-widest text-[#FFE082] font-bold">
              Today's Islamic Date
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-6">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
              <span className="text-white/80 text-sm font-medium">Fetching Islamic date...</span>
            </div>
          ) : error && !hijriDate ? (
            <div className="py-4">
              <p className="text-white/80 text-sm">{error}</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl sm:text-5xl font-extrabold mb-3 text-white drop-shadow-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {hijriDisplayText}
              </h2>
              {hijriDate?.monthAr && (
                <p className="text-lg sm:text-xl text-[#FFE082]/90 font-medium mb-2" style={{ fontFamily: "'Amiri', serif" }}>
                  {hijriDate.monthAr}
                </p>
              )}
              <p className="text-sm text-white/80 font-medium">
                {gregorianDate} CE
              </p>
            </>
          )}
        </div>
      </div>

      {/* Note about moon sighting */}
      <div className="card-premium p-4 mb-8 flex items-start gap-3 bg-amber-500/10 border-amber-500/30 text-xs text-amber-900 dark:text-amber-300">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
        <span className="leading-relaxed">
          Islamic dates are determined by lunar cycles and may vary by 1–2 days according to regional moon-sighting authorities.
          Dates shown are based on the Aladhan Islamic Date API.
        </span>
      </div>

      {/* Major Upcoming Occasions */}
      <h3 className="font-display text-xl font-bold text-[var(--text-main)] mb-4">
        Major Islamic Occasions (1448 AH)
      </h3>

      <div className="space-y-3 sm:space-y-4">
        {upcomingEvents.map((evt) => (
          <div
            key={evt.name}
            className="card-premium p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-[#0F5132] dark:hover:border-[#34D399] transition-all"
          >
            <div>
              <h4 className="font-bold text-base text-[var(--text-main)] mb-1">{evt.name}</h4>
              <p className="text-xs text-[var(--text-muted)] max-w-xl leading-relaxed">{evt.desc}</p>
            </div>
            <div className="text-left sm:text-right flex-shrink-0">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-xs font-bold mb-1">
                {evt.hijri}
              </span>
              <p className="text-xs text-[var(--text-sub)] font-semibold">{evt.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
