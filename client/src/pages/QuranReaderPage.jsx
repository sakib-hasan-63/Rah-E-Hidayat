import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Play, Pause, Square, Volume2, VolumeX,
  Bookmark, Check, Copy, ChevronLeft, ChevronRight,
  Eye, EyeOff, Headphones, AlertCircle, Loader2, Share2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import LoaderComponent from '../components/common/Loader';

// Reciters with verified numeric IDs for cdn.islamic.network
const reciters = [
  { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy', cdnId: 'ar.alafasy' },
  { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)', cdnId: 'ar.abdulbasitmurattal' },
  { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', cdnId: 'ar.husary' },
  { id: 'ar.minshawi', name: 'Mohamed Siddiq El-Minshawi', cdnId: 'ar.minshawi' },
  { id: 'ar.abdurrahmaansudais', name: 'Abdur-Rahman As-Sudais', cdnId: 'ar.abdurrahmaansudais' },
];

export default function QuranReaderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const surahNumber = parseInt(id, 10) || 1;
  const { addToast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const [surahData, setSurahData] = useState(null);
  const [translationData, setTranslationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [arabicFontSize, setArabicFontSize] = useState(28);
  const [showTranslation, setShowTranslation] = useState(true);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState({});
  const [copiedAyah, setCopiedAyah] = useState(null);
  const [activeAyah, setActiveAyah] = useState(null);

  // Audio Player State
  const [selectedReciter, setSelectedReciter] = useState('ar.alafasy');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null);
  const audioTimeoutRef = useRef(null);

  // Load saved bookmarks
  useEffect(() => {
    localStorage.setItem('rah-last-surah', surahNumber);
    const saved = localStorage.getItem(`rah-bookmarks-surah-${surahNumber}`);
    if (saved) {
      try { setBookmarkedAyahs(JSON.parse(saved)); } catch (e) {}
    } else {
      setBookmarkedAyahs({});
    }
  }, [surahNumber]);

  // Fetch Surah Arabic + English Translation
  useEffect(() => {
    let isMounted = true;
    const fetchSurah = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih`);
        const data = await res.json();

        if (isMounted && data.code === 200 && data.data?.length >= 2) {
          setSurahData(data.data[0]);
          setTranslationData(data.data[1]);
        } else if (isMounted) {
          setFetchError('Unable to load Quran content. Please try again.');
        }
      } catch (err) {
        console.warn('API error, loading fallback for Surah', surahNumber);
        if (isMounted) {
          if (surahNumber === 1) {
            setSurahData({
              number: 1, name: 'سُورَةُ ٱلْفَاتِحَةِ', englishName: 'Al-Fatihah',
              englishNameTranslation: 'The Opening', numberOfAyahs: 7, revelationType: 'Meccan',
              ayahs: [
                { numberInSurah: 1, text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
                { numberInSurah: 2, text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
                { numberInSurah: 3, text: 'الرَّحْمَٰنِ الرَّحِيمِ' },
                { numberInSurah: 4, text: 'مَالِكِ يَوْمِ الدِّينِ' },
                { numberInSurah: 5, text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ' },
                { numberInSurah: 6, text: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ' },
                { numberInSurah: 7, text: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ' },
              ]
            });
            setTranslationData({
              ayahs: [
                { text: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
                { text: '[All] praise is [due] to Allah, Lord of the worlds -' },
                { text: 'The Entirely Merciful, the Especially Merciful,' },
                { text: 'Sovereign of the Day of Recompense.' },
                { text: 'It is You we worship and You we ask for help.' },
                { text: 'Guide us to the straight path -' },
                { text: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.' },
              ]
            });
          } else {
            setFetchError('Unable to load Quran content. Please check your internet connection and try again.');
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSurah();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => { isMounted = false; };
  }, [surahNumber]);

  // ==================== AUDIO SYSTEM ====================

  // Build audio URL
  const getAudioUrl = useCallback((reciterId, surahNum) => {
    return `https://cdn.islamic.network/quran/audio-surah/128/${reciterId}/${surahNum}.mp3`;
  }, []);

  // Cleanup audio completely (only for unmount / reciter-surah change)
  const cleanupAudio = useCallback(() => {
    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
      audioTimeoutRef.current = null;
    }

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load(); // Reset the audio element
    }

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setAudioReady(false);
    setAudioError(null);
    setAudioLoading(false);
  }, []);

  // Load audio for current reciter + surah
  const loadAudio = useCallback((reciterId, surahNum) => {
    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
      audioTimeoutRef.current = null;
    }

    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setAudioReady(false);
    setAudioLoading(true);
    setAudioError(null);

    const url = getAudioUrl(reciterId, surahNum);
    audio.src = url;
    audio.volume = volume;
    audio.muted = isMuted;
    audio.load();

    // Timeout: if audio doesn't load within 15 seconds, show error
    audioTimeoutRef.current = setTimeout(() => {
      if (!audioReady && audioLoading) {
        setAudioLoading(false);
        setAudioError('Audio is taking too long to load. Please try another reciter.');
      }
    }, 15000);
  }, [getAudioUrl]);

  // Sync volume and mute state directly with audio element without restarting audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => {
      setAudioLoading(false);
      setAudioReady(true);
      setAudioError(null);
      if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
        audioTimeoutRef.current = null;
      }
    };

    const onError = () => {
      setAudioLoading(false);
      setAudioReady(false);
      setIsPlaying(false);
      setAudioError('Unable to load this recitation. Please try another reciter.');
      if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
        audioTimeoutRef.current = null;
      }
    };

    const onWaiting = () => {
      setAudioLoading(true);
    };

    const onPlaying = () => {
      setAudioLoading(false);
      setIsPlaying(true);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    // Attach listeners
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('error', onError);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  // Load audio ONLY when reciter or surah changes
  useEffect(() => {
    loadAudio(selectedReciter, surahNumber);

    return () => {
      // Cleanup on unmount or reciter/surah change
      if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
      }
    };
  }, [selectedReciter, surahNumber]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, [cleanupAudio]);

  // Audio Controls
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioError) {
      // Retry loading
      loadAudio(selectedReciter, surahNumber);
      return;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => {
        console.warn('Audio playback error', e);
        setAudioError('Unable to play this recitation. Please try another reciter.');
        setIsPlaying(false);
      });
    }
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (audio && audioReady) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    if (vol === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }
  };

  const handleReciterChange = (e) => {
    const newReciter = e.target.value;
    setSelectedReciter(newReciter);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Bookmark Toggle
  const toggleBookmark = (ayahNum) => {
    const updated = { ...bookmarkedAyahs, [ayahNum]: !bookmarkedAyahs[ayahNum] };
    setBookmarkedAyahs(updated);
    localStorage.setItem(`rah-bookmarks-surah-${surahNumber}`, JSON.stringify(updated));
    addToast(updated[ayahNum] ? `Ayah ${ayahNum} bookmarked!` : `Bookmark removed`, 'success');
  };

  // Copy Ayah
  const copyAyah = (arabic, translation, ayahNum) => {
    const text = `${arabic}\n\n"${translation}"\n\n- [Surah ${surahData?.englishName} ${surahNumber}:${ayahNum}]`;
    navigator.clipboard.writeText(text);
    setCopiedAyah(ayahNum);
    addToast(`Ayah ${ayahNum} copied!`, 'success');
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  // Share Ayah
  const shareAyah = (arabic, translation, ayahNum) => {
    const text = `${arabic}\n\n"${translation}"\n\n— Surah ${surahData?.englishName} (${surahNumber}:${ayahNum})\nvia Rah-e-Hidayat`;
    if (navigator.share) {
      navigator.share({ title: `Surah ${surahData?.englishName} - Ayah ${ayahNum}`, text });
    } else {
      navigator.clipboard.writeText(text);
      addToast('Ayah copied for sharing!', 'success');
    }
  };

  // Get selected reciter name
  const selectedReciterName = reciters.find(r => r.id === selectedReciter)?.name || 'Select Reciter';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="none" />

      {/* Top Bar Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-color)]">
        <Link
          to="/quran"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--primary-main)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Surahs
        </Link>

        {/* Quick Surah Jump */}
        <div className="flex items-center gap-3">
          <label htmlFor="surah-jump" className="text-xs font-semibold text-[var(--text-sub)] hidden sm:block">Jump to Surah:</label>
          <select
            id="surah-jump"
            value={surahNumber}
            onChange={(e) => navigate(`/quran/${e.target.value}`)}
            className="px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-main)] outline-none focus:ring-2 focus:ring-[var(--primary-main)]"
          >
            {Array.from({ length: 114 }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}. Surah {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <LoaderComponent variant="skeleton-list" count={6} />
      ) : fetchError ? (
        <div className="text-center py-20">
          <AlertCircle className="w-12 h-12 text-[var(--danger)] mx-auto mb-4" />
          <h2 className="text-lg font-bold text-[var(--text-main)] mb-2">Unable to Load Quran Content</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">{fetchError}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Surah Header */}
          <div className="card-static p-6 sm:p-8 text-center mb-6 bg-gradient-to-br from-[var(--bg-card)] to-[var(--primary-light)] relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary-main)] text-xs font-bold uppercase tracking-wider border border-[var(--border-color)]">
                Surah {surahData?.number} • {surahData?.revelationType}
              </span>
              <span className="text-xs font-semibold text-[var(--text-sub)]">
                {surahData?.numberOfAyahs} Ayahs
              </span>
            </div>

            <h1 className="arabic-text text-4xl sm:text-5xl text-[var(--text-main)] mb-2 font-bold leading-relaxed">
              {surahData?.name}
            </h1>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-1">
              {surahData?.englishName}
            </h2>

            <p className="text-sm font-medium text-[var(--text-muted)]">
              "{surahData?.englishNameTranslation}"
            </p>
          </div>

          {/* ==================== AUDIO PLAYER ==================== */}
          <div className="sticky top-16 z-30 card-static p-4 sm:p-5 mb-8 bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg backdrop-blur-sm">
            {/* Reciter Selection */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Headphones className="w-4 h-4 text-[var(--primary-main)] flex-shrink-0" />
              <label htmlFor="reciter-select" className="text-xs font-bold text-[var(--text-sub)] uppercase tracking-wider">Reciter</label>
              <select
                id="reciter-select"
                value={selectedReciter}
                onChange={handleReciterChange}
                className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm font-medium text-[var(--text-main)] outline-none focus:ring-2 focus:ring-[var(--primary-main)]"
              >
                {reciters.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            {/* Audio Error State */}
            {audioError && (
              <div className="flex items-center gap-3 p-3 mb-3 rounded-xl bg-[var(--danger-bg)] border border-[var(--danger)]/20">
                <AlertCircle className="w-4 h-4 text-[var(--danger)] flex-shrink-0" />
                <p className="text-xs font-medium text-[var(--danger)] flex-1">{audioError}</p>
                <button
                  onClick={() => loadAudio(selectedReciter, surahNumber)}
                  className="text-xs font-bold text-[var(--primary-main)] hover:underline flex-shrink-0"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Audio Loading State */}
            {audioLoading && !audioError && (
              <div className="flex items-center gap-3 p-3 mb-3 rounded-xl bg-[var(--primary-light)]">
                <Loader2 className="w-4 h-4 text-[var(--primary-main)] animate-spin flex-shrink-0" />
                <p className="text-xs font-medium text-[var(--primary-main)]">Loading recitation...</p>
              </div>
            )}

            {/* Player Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                disabled={audioLoading && !audioError}
                className="w-11 h-11 rounded-full bg-[#0F5132] dark:bg-[#34D399] text-white dark:text-[#062013] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                title={audioError ? 'Retry' : isPlaying ? 'Pause' : 'Play'}
                aria-label={audioError ? 'Retry loading audio' : isPlaying ? 'Pause audio' : 'Play audio'}
              >
                {audioLoading && !audioError ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>

              {/* Stop */}
              <button
                onClick={stopAudio}
                className="btn-icon flex-shrink-0"
                title="Stop"
                aria-label="Stop audio"
              >
                <Square className="w-4 h-4" />
              </button>

              {/* Progress Bar */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs font-mono text-[var(--text-muted)] flex-shrink-0 w-10 text-right">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  disabled={!audioReady}
                  className="audio-slider flex-1 min-w-0 disabled:opacity-40"
                  aria-label="Seek audio position"
                />
                <span className="text-xs font-mono text-[var(--text-muted)] flex-shrink-0 w-10">{formatTime(duration)}</span>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={toggleMute}
                  className="btn-icon"
                  title={isMuted ? 'Unmute' : 'Mute'}
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider w-16 hidden sm:block"
                  aria-label="Volume"
                />
              </div>
            </div>

            {/* Reading Customization */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border-color)]">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setArabicFontSize(s => Math.max(s - 2, 20))}
                  className="btn-icon text-xs font-bold"
                  title="Decrease font size"
                  aria-label="Decrease Arabic font size"
                >
                  A-
                </button>
                <span className="text-[10px] text-[var(--text-sub)] font-mono mx-1">{arabicFontSize}px</span>
                <button
                  onClick={() => setArabicFontSize(s => Math.min(s + 2, 48))}
                  className="btn-icon text-sm font-bold"
                  title="Increase font size"
                  aria-label="Increase Arabic font size"
                >
                  A+
                </button>
              </div>

              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`btn-icon text-xs flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg ${
                  showTranslation ? 'text-[var(--primary-main)] bg-[var(--primary-light)]' : 'text-[var(--text-muted)]'
                }`}
                title="Toggle English Translation"
                aria-label={showTranslation ? 'Hide translation' : 'Show translation'}
              >
                {showTranslation ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="hidden sm:inline">{showTranslation ? 'Translation On' : 'Translation Off'}</span>
              </button>
            </div>
          </div>

          {/* ==================== QURAN TEXT — CONTINUOUS READING ==================== */}
          <div className="card-static p-6 sm:p-8 lg:p-10 mb-8">
            {/* Bismillah */}
            {surahNumber !== 9 && surahNumber !== 1 && (
              <div className="text-center mb-8 pb-6 border-b border-[var(--border-color)]">
                <p className="arabic-text text-2xl sm:text-3xl text-[var(--primary-main)] font-bold">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>
            )}

            {/* Continuous Arabic Text Flow */}
            <div
              className="quran-reading-container mb-8"
              style={{ fontSize: `${arabicFontSize}px` }}
            >
              {surahData?.ayahs?.map((ayah, idx) => {
                const ayahNum = ayah.numberInSurah || idx + 1;
                const isBookmarked = !!bookmarkedAyahs[ayahNum];
                const isActive = activeAyah === ayahNum;

                return (
                  <span
                    key={ayahNum}
                    className={`ayah-segment cursor-pointer transition-colors duration-150 ${
                      isBookmarked ? 'bg-[var(--accent-gold-light)] rounded-md px-1' : ''
                    } ${isActive ? 'bg-[var(--primary-light)] rounded-md px-1' : ''}`}
                    onClick={() => setActiveAyah(isActive ? null : ayahNum)}
                  >
                    {ayah.text}
                    <span className="ayah-number">{ayahNum}</span>
                  </span>
                );
              })}
            </div>

            {/* Translations — Below the Arabic */}
            {showTranslation && (
              <div className="border-t border-[var(--border-color)] pt-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-sub)] mb-4">English Translation — Sahih International</h3>
                {surahData?.ayahs?.map((ayah, idx) => {
                  const ayahNum = ayah.numberInSurah || idx + 1;
                  const translation = translationData?.ayahs?.[idx]?.text || '';
                  const isBookmarked = !!bookmarkedAyahs[ayahNum];
                  const isActive = activeAyah === ayahNum;

                  return (
                    <div
                      key={ayahNum}
                      id={`ayah-${ayahNum}`}
                      className={`group flex gap-3 py-3 px-3 -mx-3 rounded-xl transition-colors duration-150 ${
                        isActive ? 'bg-[var(--primary-light)]' : 'hover:bg-[var(--bg-card-hover)]'
                      } ${isBookmarked ? 'border-l-3 border-l-[var(--accent-gold)]' : ''}`}
                    >
                      {/* Verse Number */}
                      <span className="text-xs font-bold text-[var(--primary-main)] bg-[var(--primary-light)] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        {ayahNum}
                      </span>

                      {/* Translation Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                          {translation}
                        </p>

                        {/* Ayah Actions — visible on hover/active */}
                        <div className={`flex items-center gap-1 mt-2 transition-opacity duration-200 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          <button
                            onClick={(e) => { e.stopPropagation(); copyAyah(ayah.text, translation, ayahNum); }}
                            className="btn-icon !p-1.5"
                            title="Copy Ayah"
                            aria-label={`Copy ayah ${ayahNum}`}
                          >
                            {copiedAyah === ayahNum ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={(e) => { e.stopPropagation(); toggleBookmark(ayahNum); }}
                            className={`btn-icon !p-1.5 ${isBookmarked ? 'text-amber-500' : ''}`}
                            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Ayah'}
                            aria-label={isBookmarked ? `Remove bookmark from ayah ${ayahNum}` : `Bookmark ayah ${ayahNum}`}
                          >
                            <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
                          </button>

                          <button
                            onClick={(e) => { e.stopPropagation(); shareAyah(ayah.text, translation, ayahNum); }}
                            className="btn-icon !p-1.5"
                            title="Share Ayah"
                            aria-label={`Share ayah ${ayahNum}`}
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)]">
            {surahNumber > 1 ? (
              <Link
                to={`/quran/${surahNumber - 1}`}
                className="btn-secondary !text-xs !py-2.5 !px-4 inline-flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Surah
              </Link>
            ) : <div />}

            <Link
              to="/quran"
              className="text-xs font-semibold text-[var(--primary-main)] hover:underline"
            >
              All Surahs
            </Link>

            {surahNumber < 114 ? (
              <Link
                to={`/quran/${surahNumber + 1}`}
                className="btn-primary !text-xs !py-2.5 !px-4 inline-flex items-center gap-1.5"
              >
                Next Surah <ChevronRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </div>
        </>
      )}
    </div>
  );
}
