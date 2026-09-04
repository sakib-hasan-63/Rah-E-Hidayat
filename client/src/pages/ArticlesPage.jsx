import { useState, useMemo } from 'react';
import { BookOpen, Clock, ArrowRight, Search, X, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';

const articles = [
  {
    id: 1, title: 'The Spiritual Journey of Surah Al-Kahf',
    category: 'Quran', readTime: '6 min', date: 'Aug 20, 2026',
    excerpt: 'Discover the four profound parables of faith, wealth, knowledge, and power taught in Surah Al-Kahf every Friday.',
    content: 'Surah Al-Kahf (The Cave) is one of the most beloved chapters of the Quran, traditionally recited every Friday. It contains four powerful stories that address the trials of faith, wealth, knowledge, and power.\n\n**The People of the Cave** — A group of righteous youth who fled persecution and sought refuge in a cave, where Allah caused them to sleep for centuries. This story teaches us to hold firm to our faith even when society opposes it.\n\n**The Owner of Two Gardens** — A wealthy man who became arrogant about his wealth and denied the Day of Judgment. His gardens were destroyed as a reminder that all worldly possessions are temporary.\n\n**Musa and Al-Khidr** — Prophet Musa (AS) traveled with a mysterious servant of Allah who possessed divine knowledge. This story teaches humility and that Allah\'s wisdom surpasses our limited understanding.\n\n**Dhul-Qarnayn** — A just and powerful king who traveled the earth and used his power to help the oppressed. This teaches that power should be used for justice and righteousness.'
  },
  {
    id: 2, title: 'Cultivating Sincerity (Ikhlas) in Daily Worship',
    category: 'Spiritual Growth', readTime: '4 min', date: 'Aug 18, 2026',
    excerpt: 'How pure intentions transform simple habitual acts into immense spiritual rewards according to the Sunnah.',
    content: 'Ikhlas (sincerity) is the cornerstone of all accepted worship in Islam. The Prophet Muhammad (ﷺ) said: "Actions are judged by intentions, and everyone will be rewarded according to what they intended." (Bukhari & Muslim)\n\n**What is Ikhlas?** It means performing every act of worship solely for the sake of Allah, without seeking praise, recognition, or worldly gain from people.\n\n**Signs of Sincerity:**\n• Your worship doesn\'t change whether people are watching or not\n• You don\'t feel the need to announce your good deeds\n• You feel content with Allah\'s knowledge of your actions\n• You continue doing good even when no one appreciates it\n\n**How to Cultivate Ikhlas:**\n1. Constantly renew your intention before and during acts of worship\n2. Seek knowledge about Allah\'s names and attributes\n3. Remember death frequently — it purifies intentions\n4. Make dua asking Allah to purify your heart from showing off (riya)\n5. Practice secret acts of worship that only Allah knows about'
  },
  {
    id: 3, title: 'The Etiquettes and Power of Dua in Times of Hardship',
    category: 'Dua', readTime: '8 min', date: 'Aug 14, 2026',
    excerpt: 'Learn the optimal conditions and heart states under which prayers are accepted by Allah (SWT).',
    content: 'Dua (supplication) is described by the Prophet Muhammad (ﷺ) as "the essence of worship" (Tirmidhi). When a believer raises their hands to Allah in sincere supplication, they are engaging in one of the most powerful acts of worship.\n\n**Best Times for Dua:**\n• The last third of the night (Tahajjud time)\n• Between Adhan and Iqamah\n• During prostration (Sujood) in prayer\n• On Friday, especially the last hour before Maghrib\n• While fasting, especially before breaking the fast\n• During rain\n• While traveling\n\n**Etiquettes of Making Dua:**\n1. Begin with praising Allah and sending blessings upon the Prophet (ﷺ)\n2. Face the Qibla if possible\n3. Raise your hands\n4. Be in a state of Wudu\n5. Be certain that Allah will respond\n6. Be persistent and don\'t give up\n7. Ask with humility and sincerity\n\nAllah says: "Call upon Me; I will respond to you." (Quran 40:60)'
  },
  {
    id: 4, title: 'Understanding the Night Journey (Isra and Miraj)',
    category: 'Seerah', readTime: '7 min', date: 'Aug 10, 2026',
    excerpt: 'The miraculous journey of Prophet Muhammad (ﷺ) from Makkah to Jerusalem and the ascension through the heavens.',
    content: 'The Isra and Miraj is one of the most extraordinary events in Islamic history. In a single night, Prophet Muhammad (ﷺ) was transported from Masjid al-Haram in Makkah to Masjid al-Aqsa in Jerusalem (Isra), and then ascended through the seven heavens to the presence of Allah (Miraj).\n\n**The Isra (Night Journey):**\nThe Angel Jibril brought the Buraq, a celestial mount, to carry the Prophet (ﷺ). He traveled from Makkah to Jerusalem, where he led all the previous prophets in prayer at Masjid al-Aqsa.\n\n**The Miraj (Ascension):**\nFrom Jerusalem, the Prophet (ﷺ) ascended through the seven heavens:\n• 1st Heaven: Met Prophet Adam (AS)\n• 2nd Heaven: Met Prophets Isa and Yahya (AS)\n• 3rd Heaven: Met Prophet Yusuf (AS)\n• 4th Heaven: Met Prophet Idris (AS)\n• 5th Heaven: Met Prophet Harun (AS)\n• 6th Heaven: Met Prophet Musa (AS)\n• 7th Heaven: Met Prophet Ibrahim (AS)\n\n**The Gift of Salah:**\nDuring this journey, the five daily prayers were prescribed as an obligation — a direct gift from Allah to the Muslim Ummah.'
  },
  {
    id: 5, title: 'The Virtues and Blessings of Ramadan',
    category: 'Ramadan', readTime: '5 min', date: 'Aug 6, 2026',
    excerpt: 'A comprehensive guide to maximizing the spiritual benefits of the blessed month of Ramadan.',
    content: 'Ramadan is the ninth month of the Islamic calendar and the most sacred month of the year. It is the month in which the Quran was first revealed, and fasting during this month is one of the five pillars of Islam.\n\n**Spiritual Benefits of Ramadan:**\n• The gates of Paradise are opened\n• The gates of Hellfire are closed\n• The devils are chained\n• Every good deed is multiplied manifold\n• Laylatul Qadr falls within this month\n\n**How to Maximize Ramadan:**\n1. Increase Quran recitation — aim to complete at least one full reading\n2. Perform Taraweeh prayers every night\n3. Give generously in charity (Sadaqah)\n4. Make abundant Dua, especially before Iftar\n5. Seek Laylatul Qadr in the last 10 nights\n6. Practice Itikaf (spiritual retreat) if possible\n7. Guard your tongue from gossip and harmful speech\n8. Feed those who are fasting\n\nThe Prophet (ﷺ) said: "Whoever fasts during Ramadan with faith and seeking reward, all their previous sins will be forgiven." (Bukhari & Muslim)'
  },
  {
    id: 6, title: 'The Beautiful Names of Allah (Al-Asma Al-Husna)',
    category: 'Islamic Knowledge', readTime: '6 min', date: 'Aug 2, 2026',
    excerpt: 'Understanding the 99 beautiful names of Allah and how knowing them transforms our relationship with our Creator.',
    content: 'Allah says in the Quran: "To Allah belong the most beautiful names, so invoke Him by them." (7:180). The Prophet (ﷺ) said: "Allah has ninety-nine names. Whoever memorizes and understands them will enter Paradise." (Bukhari)\n\n**Some of the Beautiful Names:**\n• Ar-Rahman (The Most Merciful) — His mercy encompasses everything\n• Al-Wadud (The Loving) — He loves His servants unconditionally\n• As-Salam (The Source of Peace) — All peace and safety come from Him\n• Al-Ghaffar (The Forgiving) — He forgives sins repeatedly\n• Ar-Razzaq (The Provider) — He provides for all creation\n• Al-Hakim (The Wise) — Everything He does contains perfect wisdom\n\n**How to Benefit from Allah\'s Names:**\n1. Learn and memorize them with their meanings\n2. Call upon Allah by the name most relevant to your need\n3. Reflect on how these attributes manifest in your daily life\n4. Try to embody the attributes in your own character (e.g., be merciful, forgiving, patient)'
  },
  {
    id: 7, title: 'Islamic Manners: The Prophet\'s Way of Treating Others',
    category: 'Character', readTime: '5 min', date: 'Jul 28, 2026',
    excerpt: 'Learn from the Prophetic example of kindness, patience, and noble character in everyday interactions.',
    content: 'The Prophet Muhammad (ﷺ) said: "I was sent to perfect noble character." (Ahmad). His character was described by Aisha (RA) as "the Quran walking on earth."\n\n**Key Prophetic Manners:**\n\n**1. Greeting Others:** Always initiate the Salam. The Prophet (ﷺ) said the one who gives Salam first is closer to Allah.\n\n**2. Smiling:** "Your smile in the face of your brother is charity." (Tirmidhi)\n\n**3. Speaking Kindly:** "A good word is charity." (Bukhari & Muslim). The Prophet (ﷺ) never used harsh or vulgar language.\n\n**4. Being Patient:** When harassed or insulted, the Prophet (ﷺ) responded with kindness and prayers for the other person.\n\n**5. Visiting the Sick:** He regularly visited sick companions and made dua for their recovery.\n\n**6. Honoring Guests:** He gave his best food and attention to guests.\n\n**7. Being Truthful:** He was known as "As-Sadiq Al-Amin" (The Truthful, The Trustworthy) even before prophethood.'
  },
  {
    id: 8, title: 'The First Revelation: How the Quran Began',
    category: 'Seerah', readTime: '5 min', date: 'Jul 24, 2026',
    excerpt: 'The extraordinary moment when Angel Jibril appeared to Prophet Muhammad (ﷺ) in Cave Hira.',
    content: 'The first revelation of the Quran is one of the most pivotal moments in human history. Prophet Muhammad (ﷺ) was 40 years old and had been spending time in solitary contemplation in Cave Hira on Jabal al-Nur (Mountain of Light) near Makkah.\n\n**The Encounter:**\nDuring one of these retreats in the month of Ramadan, the Angel Jibril appeared and said "Iqra!" (Read/Recite). The Prophet (ﷺ) replied that he could not read. Jibril embraced him tightly three times, then revealed the first verses of Surah Al-Alaq:\n\n"Read in the name of your Lord who created. Created man from a clinging substance. Read, and your Lord is the Most Generous. Who taught by the pen. Taught man that which he knew not." (96:1-5)\n\n**The Aftermath:**\nShaken by this experience, the Prophet (ﷺ) returned home to Khadijah (RA), who comforted him and took him to her cousin Waraqah ibn Nawfal, a Christian scholar, who confirmed that this was the same divine message given to Prophet Musa (AS).'
  },
  {
    id: 9, title: 'The Importance of Seeking Knowledge in Islam',
    category: 'Islamic Knowledge', readTime: '4 min', date: 'Jul 20, 2026',
    excerpt: 'Islam\'s profound emphasis on learning, education, and the pursuit of beneficial knowledge.',
    content: 'The very first word revealed in the Quran was "Iqra" (Read) — establishing knowledge as a fundamental pillar of the faith.\n\n**Quranic Emphasis:**\n"Are those who know equal to those who do not know?" (39:9)\n"Allah will raise those who have been given knowledge in degrees." (58:11)\n\n**Prophetic Teachings:**\n• "Seeking knowledge is an obligation upon every Muslim." (Ibn Majah)\n• "Whoever treads a path in search of knowledge, Allah will make the path to Paradise easy for them." (Muslim)\n• "The ink of the scholar is more sacred than the blood of the martyr."\n\n**Types of Beneficial Knowledge:**\n1. Religious knowledge (Fardh Ayn — individually obligatory)\n2. Worldly sciences that benefit humanity\n3. Self-knowledge and spiritual development\n4. Skills that serve the community\n\n**How to Seek Knowledge:**\n• Start with the fundamentals of faith (Aqeedah, Fiqh)\n• Learn the Quran with understanding (Tafsir)\n• Study authentic Hadith\n• Find reliable scholars and teachers\n• Act upon what you learn — knowledge without practice is fruitless'
  },
  {
    id: 10, title: 'The Significance of Salah: Your Daily Meeting with Allah',
    category: 'Salah', readTime: '6 min', date: 'Jul 16, 2026',
    excerpt: 'Understanding the deep spiritual purpose behind the five daily prayers and how to improve your Salah.',
    content: 'Salah (prayer) is the second pillar of Islam and the most important act of worship after the Shahada. The Prophet (ﷺ) said: "The first thing a person will be asked about on the Day of Judgment is their Salah."\n\n**The Five Daily Prayers:**\n• Fajr (Dawn) — 2 Rakats — A powerful start to the day\n• Dhuhr (Noon) — 4 Rakats — A midday reset\n• Asr (Afternoon) — 4 Rakats — Renewed focus\n• Maghrib (Sunset) — 3 Rakats — Gratitude for the day\n• Isha (Night) — 4 Rakats — Peace before rest\n\n**Improving Your Salah:**\n1. Understand what you recite — learn the meanings of Al-Fatihah and common Surahs\n2. Pray on time — don\'t delay\n3. Perform Wudu mindfully\n4. Remove distractions — turn off your phone\n5. Pray as if it\'s your last prayer\n6. Take your time in each position — don\'t rush\n7. Make heartfelt Dua in Sujood\n\nAllah says: "Indeed, prayer prevents from immorality and wrongdoing." (29:45)'
  },
  {
    id: 11, title: 'The Story of Prophet Yusuf: Lessons in Patience',
    category: 'Quran', readTime: '7 min', date: 'Jul 12, 2026',
    excerpt: 'Allah called it "the best of stories" — the journey of Prophet Yusuf from a well to the throne of Egypt.',
    content: 'Surah Yusuf is unique in the Quran as it narrates a complete, continuous story from beginning to end. Allah says: "We relate to you the best of stories." (12:3)\n\n**Key Events:**\n1. Young Yusuf\'s dream of eleven stars, the sun and moon prostrating to him\n2. His brothers\' jealousy and throwing him into a well\n3. His sale into slavery in Egypt\n4. The trial with the wife of the Aziz\n5. His imprisonment despite his innocence\n6. His interpretation of the king\'s dream\n7. His rise to become the treasurer of Egypt\n8. His reunion with his family and fulfillment of his childhood dream\n\n**Timeless Lessons:**\n• Patience in hardship leads to ultimate victory\n• Allah\'s plan is always better than ours\n• Forgiveness is a sign of strength, not weakness\n• Beauty is a test — and chastity is noble\n• Trust in Allah even when everything seems to go wrong\n• Every difficulty is temporary in Allah\'s grand plan'
  },
  {
    id: 12, title: 'Islamic History: The Golden Age of Muslim Civilization',
    category: 'Islamic History', readTime: '8 min', date: 'Jul 8, 2026',
    excerpt: 'How Muslim scholars led the world in science, medicine, mathematics, and philosophy for centuries.',
    content: 'The Islamic Golden Age (8th–14th century) was a period of extraordinary cultural, economic, and scientific flourishing in the Muslim world.\n\n**Key Contributions:**\n\n**Mathematics:** Al-Khwarizmi developed algebra (the word itself comes from Arabic "al-jabr"). The concept of algorithms is named after him.\n\n**Medicine:** Ibn Sina (Avicenna) wrote "The Canon of Medicine," used as a textbook in European universities for over 500 years. Al-Zahrawi is considered the father of modern surgery.\n\n**Optics:** Ibn al-Haytham is known as the father of modern optics and the scientific method.\n\n**Geography:** Al-Idrisi created one of the most accurate world maps of the medieval era.\n\n**Astronomy:** Muslim astronomers refined the astrolabe, cataloged thousands of stars, and their work later influenced Copernicus.\n\n**Architecture:** The Alhambra in Spain, the Great Mosque of Cordoba, and many other structures showcase the pinnacle of Islamic art and architecture.\n\n**Libraries:** The House of Wisdom (Bayt al-Hikmah) in Baghdad was the world\'s largest repository of knowledge, translating and preserving Greek, Persian, and Indian texts.'
  },
];

const categories = ['All', ...new Set(articles.map(a => a.category))];

export default function ArticlesPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    return articles.filter(a => {
      const matchesCat = selectedCat === 'All' || a.category === selectedCat;
      const matchesSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCat, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader
        title="Islamic Articles & Reflections"
        subtitle="Thoughtful essays and beneficial knowledge to nurture your spiritual path."
      />

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="input-field !py-2.5 text-sm"
          />
          <Search className="w-4 h-4 text-[var(--text-sub)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--text-sub)] hover:text-[var(--text-main)]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCat === cat
                ? 'bg-[#0F5132] text-white dark:bg-[#34D399] dark:text-[#062013] shadow-xs'
                : 'bg-[var(--bg-main)] text-[var(--text-muted)] hover:bg-[var(--primary-light)] hover:text-[var(--text-main)] border border-[var(--border-color)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-xs text-[var(--text-sub)] mb-4">{filtered.length} article{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="card-premium p-10 text-center">
          <BookOpen className="w-10 h-10 text-[var(--text-sub)] mx-auto mb-3" />
          <p className="text-sm text-[var(--text-muted)]">No articles match your search.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((art) => (
            <div key={art.id} className="card-premium p-6 hover:border-[#0F5132]/30 dark:hover:border-[#34D399]/30 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-[11px] font-bold">
                      {art.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[var(--text-sub)]">
                      <Clock className="w-3 h-3" /> {art.readTime}
                    </span>
                  </div>
                  <h3
                    className="font-display text-base sm:text-lg font-bold text-[var(--text-main)] mb-1.5 cursor-pointer hover:text-[var(--primary-main)] transition-colors"
                    onClick={() => setExpandedId(expandedId === art.id ? null : art.id)}
                  >
                    {art.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{art.excerpt}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[11px] text-[var(--text-sub)]">{art.date}</span>
                  <button
                    onClick={() => setExpandedId(expandedId === art.id ? null : art.id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[var(--primary-main)] hover:underline"
                  >
                    {expandedId === art.id ? <>Collapse <ChevronUp className="w-3.5 h-3.5" /></> : <>Read More <ChevronDown className="w-3.5 h-3.5" /></>}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === art.id && (
                <div className="mt-5 pt-5 border-t border-[var(--border-color)]">
                  <div className="bg-[var(--bg-main)]/60 border border-[var(--border-color)] p-5 sm:p-7 rounded-2xl">
                    <div className="max-w-3xl space-y-3">
                      {art.content.split('\n').map((line, i) => {
                        const trimmed = line.trim();
                        if (!trimmed) return <div key={i} className="h-1.5" />;
                        
                        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                          return (
                            <h4
                              key={i}
                              className="font-display font-bold text-base sm:text-lg text-[var(--text-main)] pt-2 pb-0.5 border-b border-[var(--border-color)]/50"
                            >
                              {trimmed.replace(/\*\*/g, '')}
                            </h4>
                          );
                        }
                        
                        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                          return (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-main)] pl-2 leading-relaxed">
                              <span className="text-[var(--primary-main)] font-bold text-sm leading-none mt-0.5">•</span>
                              <span className="flex-1 text-[var(--text-main)]">{trimmed.replace(/^[•\-]\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</span>
                            </div>
                          );
                        }

                        if (/^\d+\.\s/.test(trimmed)) {
                          return (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-main)] pl-2 leading-relaxed">
                              <span className="text-[var(--primary-main)] font-bold">{trimmed.match(/^\d+\./)[0]}</span>
                              <span className="flex-1 text-[var(--text-main)]">{trimmed.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</span>
                            </div>
                          );
                        }

                        return (
                          <p key={i} className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed">
                            {trimmed.replace(/\*\*(.*?)\*\*/g, '$1')}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
