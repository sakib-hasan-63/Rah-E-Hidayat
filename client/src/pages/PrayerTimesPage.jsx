import { useState, useEffect, useCallback } from 'react';
import { Clock, MapPin, Moon, Sun, Sunrise, Compass, Loader2, LocateFixed, AlertCircle } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';

const indianCities = [
  { city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  { city: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { city: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { city: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
  { city: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  { city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { city: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
  { city: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { city: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { city: 'Patna', state: 'Bihar', lat: 25.6093, lng: 85.1376 },
  { city: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126 },
  { city: 'Srinagar', state: 'Jammu & Kashmir', lat: 34.0837, lng: 74.7973 },
  { city: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { city: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 },
];

const prayerKeys = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const prayerMeta = {
  Fajr: { icon: Moon, desc: 'Dawn Prayer' },
  Sunrise: { icon: Sunrise, desc: 'Shuruq' },
  Dhuhr: { icon: Sun, desc: 'Noon Prayer' },
  Asr: { icon: Sun, desc: 'Afternoon Prayer' },
  Maghrib: { icon: Sunrise, desc: 'Sunset Prayer' },
  Isha: { icon: Moon, desc: 'Night Prayer' },
};

function getNextPrayer(timings) {
  if (!timings) return null;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const key of prayerKeys) {
    const timeStr = timings[key];
    if (!timeStr) continue;
    // Remove timezone info like "(IST)" from time string
    const cleaned = timeStr.replace(/\s*\(.*\)\s*/, '').trim();
    const [h, m] = cleaned.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) continue;
    const prayerMinutes = h * 60 + m;
    if (prayerMinutes > currentMinutes) {
      return key;
    }
  }
  // If all prayers have passed, next prayer is Fajr (tomorrow)
  return 'Fajr';
}

function formatTime12h(timeStr) {
  if (!timeStr) return '--:--';
  const cleaned = timeStr.replace(/\s*\(.*\)\s*/, '').trim();
  const [h, m] = cleaned.split(':').map(Number);
  if (isNaN(h) || isNaN(m)) return timeStr;
  const period = h >= 12 ? 'PM' : 'AM';
  const hours12 = h % 12 || 12;
  return `${hours12}:${String(m).padStart(2, '0')} ${period}`;
}

function findNearestCity(lat, lng) {
  let nearest = indianCities[0];
  let minDist = Infinity;
  for (const c of indianCities) {
    const dist = Math.sqrt(Math.pow(lat - c.lat, 2) + Math.pow(lng - c.lng, 2));
    if (dist < minDist) {
      minDist = dist;
      nearest = c;
    }
  }
  return nearest;
}

export default function PrayerTimesPage() {
  const [selectedCity, setSelectedCity] = useState(indianCities[0]); // Default: Lucknow
  const [timings, setTimings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationStatus, setLocationStatus] = useState('idle'); // idle | requesting | granted | denied | error
  const [todayDate, setTodayDate] = useState('');
  const [hijriDate, setHijriDate] = useState('');

  const fetchPrayerTimes = useCallback(async (city) => {
    try {
      setLoading(true);
      // Use Aladhan API with method=1 (University of Islamic Sciences, Karachi — standard for Indian subcontinent)
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city.city)}&country=India&method=1`
      );
      const data = await res.json();
      if (data.code === 200 && data.data?.timings) {
        setTimings(data.data.timings);
        // Set date info
        if (data.data.date) {
          setTodayDate(data.data.date.readable || '');
          const h = data.data.date.hijri;
          if (h) {
            setHijriDate(`${h.day} ${h.month.en} ${h.year} AH`);
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch prayer times:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Try to detect user's location on mount
  useEffect(() => {
    const detectLocation = () => {
      if (!navigator.geolocation) {
        setLocationStatus('error');
        fetchPrayerTimes(indianCities[0]);
        return;
      }

      setLocationStatus('requesting');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus('granted');
          const nearest = findNearestCity(position.coords.latitude, position.coords.longitude);
          setSelectedCity(nearest);
          fetchPrayerTimes(nearest);
        },
        (err) => {
          console.warn('Location permission denied or unavailable:', err.message);
          setLocationStatus('denied');
          // Fall back to default city
          fetchPrayerTimes(indianCities[0]);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
      );
    };

    detectLocation();
  }, [fetchPrayerTimes]);

  const handleCityChange = (e) => {
    const found = indianCities.find((c) => c.city === e.target.value);
    if (found) {
      setSelectedCity(found);
      fetchPrayerTimes(found);
    }
  };

  const nextPrayer = getNextPrayer(timings);

  const prayers = prayerKeys.map((key) => ({
    name: key,
    time: timings ? formatTime12h(timings[key]) : '--:--',
    icon: prayerMeta[key].icon,
    desc: prayerMeta[key].desc,
    isNext: key === nextPrayer,
  }));

  const nextPrayerData = prayers.find((p) => p.isNext);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title="Prayer Times"
        subtitle="Accurate location-based Salah timings for cities across India."
      />

      {/* Location Status Banner */}
      {locationStatus === 'requesting' && (
        <div className="card-premium p-3 mb-4 flex items-center gap-2 text-xs text-[var(--text-muted)] bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <LocateFixed className="w-4 h-4 text-blue-500 animate-pulse" />
          <span>Requesting location permission to show prayer times for your nearest city...</span>
        </div>
      )}
      {locationStatus === 'denied' && (
        <div className="card-premium p-3 mb-4 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <span>Location access denied. Please select your city manually below.</span>
        </div>
      )}

      {/* City Selector */}
      <div className="flex items-center justify-center gap-2 mb-8 max-w-sm mx-auto">
        <MapPin className="w-4 h-4 text-[var(--primary-main)] flex-shrink-0" />
        <select
          value={selectedCity.city}
          onChange={handleCityChange}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-main)] outline-none focus:ring-2 focus:ring-[#0F5132] dark:focus:ring-[#34D399]"
        >
          {indianCities.map((c) => (
            <option key={c.city} value={c.city}>
              {c.city}, {c.state}
            </option>
          ))}
        </select>
      </div>

      {/* Highlight Next Prayer Card */}
      <div
        className="rounded-2xl p-8 text-center mb-8 text-white shadow-xl relative overflow-hidden border-2 border-[#C9A84C]/50"
        style={{
          background: 'linear-gradient(135deg, #0F5132 0%, #1B7A4E 50%, #0F5132 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-[#FFE082] font-bold mb-1 block">
            {nextPrayer === 'Fajr' && timings ? 'Next Prayer (Tomorrow)' : 'Next Prayer'}
          </span>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-4">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
              <span className="text-white/80 text-sm">Loading prayer times...</span>
            </div>
          ) : (
            <>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2 text-white drop-shadow-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {nextPrayerData?.name || 'Maghrib'} Prayer
              </h2>
              <p className="text-2xl sm:text-3xl font-mono text-[#FFE082] mb-4 font-bold">
                {nextPrayerData?.time || '--:--'}
              </p>
            </>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-white">
            <MapPin className="w-3.5 h-3.5" /> {selectedCity.city}, {selectedCity.state}, India
          </div>

          {/* Date info */}
          {(todayDate || hijriDate) && (
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-xs text-white/70">
              {todayDate && <span>{todayDate}</span>}
              {todayDate && hijriDate && <span className="hidden sm:inline">•</span>}
              {hijriDate && <span>{hijriDate}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Prayers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {prayers.map((prayer) => (
          <div
            key={prayer.name}
            className={`card-premium p-5 text-center transition-all ${
              prayer.isNext
                ? 'border-2 border-[#0F5132] dark:border-[#34D399] bg-[var(--primary-light)]/30 ring-2 ring-[#0F5132]/20 dark:ring-[#34D399]/20'
                : ''
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--primary-light)] text-[var(--primary-main)] flex items-center justify-center mx-auto mb-2">
              <prayer.icon className="w-4.5 h-4.5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-sub)] block mb-0.5">
              {prayer.name}
            </span>
            {loading ? (
              <div className="h-8 skeleton-box rounded-lg w-20 mx-auto mb-1" />
            ) : (
              <p className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-main)] mb-1">
                {prayer.time}
              </p>
            )}
            <span className="text-[11px] text-[var(--text-muted)]">{prayer.desc}</span>
            {prayer.isNext && (
              <span className="block mt-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--primary-main)]">
                ● Next
              </span>
            )}
          </div>
        ))}
      </div>

      {/* API Attribution */}
      <p className="text-center text-[10px] text-[var(--text-sub)] mt-6">
        Prayer times sourced from Aladhan API • Calculation: University of Islamic Sciences, Karachi
      </p>
    </div>
  );
}
