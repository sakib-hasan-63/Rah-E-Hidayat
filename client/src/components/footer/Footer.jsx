import { Link } from 'react-router-dom';

const footerLinks = {
  'Explore': [
    { label: 'The Quran', path: '/quran' },
    { label: 'Duas & Supplications', path: '/duas' },
    { label: 'Hadith Collections', path: '/hadith' },
    { label: 'Daily Azkar', path: '/azkar' },
  ],
  'Spiritual Tools': [
    { label: 'Digital Tasbeeh', path: '/tasbeeh' },
    { label: 'Prayer Times', path: '/prayer-times' },
    { label: 'Hijri Calendar', path: '/islamic-calendar' },
    { label: 'Islamic Quiz', path: '/quiz' },
  ],
  'Information': [
    { label: 'About Us', path: '/about' },
    { label: 'Contact & Feedback', path: '/contact' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Use', path: '/terms' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A160D] text-[#A8BBAA] border-t border-white/5 mb-16 lg:mb-0">
      {/* Gold accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Rah-e-Hidayat"
                className="w-10 h-10 rounded-xl object-cover border border-white/10 shadow-md"
              />
              <span className="font-display text-xl font-bold text-[#F4F1EA]">
                Rah-e-Hidayat
              </span>
            </Link>
            <p className="text-xs text-[#8A9D8C] leading-relaxed mb-4">
              Walk the Path of Guidance. A peaceful digital sanctuary to read the Quran, learn authentic prophetic traditions, and remember Allah.
            </p>
            <p className="text-xs text-[#E6C66D] italic font-serif mb-4">
              "Walk the Path of Guidance."
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/rah_.e_.hidayat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#A8BBAA] hover:text-[#E1306C] hover:bg-white/10 hover:border-[#E1306C]/30 transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@rah_.e._hidayat12"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe on YouTube"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#A8BBAA] hover:text-[#FF0000] hover:bg-white/10 hover:border-[#FF0000]/30 transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1d7aAqvKHM/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#A8BBAA] hover:text-[#1877F2] hover:bg-white/10 hover:border-[#1877F2]/30 transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#34D399] mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-xs text-[#A8BBAA] hover:text-[#F4F1EA] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 lg:mt-12 pt-6 lg:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6A7D6C]">
          <p>© {currentYear} Rah-e-Hidayat. Built with sincerity for the Ummah.</p>
          <p className="text-center sm:text-right">All authentic Quranic and Hadith texts preserved accurately.</p>
        </div>
      </div>
    </footer>
  );
}
