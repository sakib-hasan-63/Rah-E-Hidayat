import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminRoute from './routes/AdminRoute';

// Public Pages
import HomePage from './pages/HomePage';
import QuranPage from './pages/QuranPage';
import QuranReaderPage from './pages/QuranReaderPage';
import HadithPage from './pages/HadithPage';
import DuasPage from './pages/DuasPage';
import AzkarPage from './pages/AzkarPage';
import TasbeehPage from './pages/TasbeehPage';
import PrayerTimesPage from './pages/PrayerTimesPage';
import IslamicCalendarPage from './pages/IslamicCalendarPage';
import ArticlesPage from './pages/ArticlesPage';
import QuizPage from './pages/QuizPage';
import KidsCornerPage from './pages/KidsCornerPage';
import DownloadsPage from './pages/DownloadsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import BookmarksPage from './pages/BookmarksPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminQuran from './pages/admin/AdminQuran';
import AdminBookmarks from './pages/admin/AdminBookmarks';
import AdminFeedback from './pages/admin/AdminFeedback';
import AdminProfile from './pages/admin/AdminProfile';
import ScrollToTop from './components/common/ScrollToTop';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Main Public & Member Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="quran" element={<QuranPage />} />
                <Route path="quran/:id" element={<QuranReaderPage />} />
                <Route path="hadith" element={<HadithPage />} />
                <Route path="duas" element={<DuasPage />} />
                <Route path="azkar" element={<AzkarPage />} />
                <Route path="tasbeeh" element={<TasbeehPage />} />
                <Route path="prayer-times" element={<PrayerTimesPage />} />
                <Route path="islamic-calendar" element={<IslamicCalendarPage />} />
                <Route path="articles" element={<ArticlesPage />} />
                <Route path="quiz" element={<QuizPage />} />
                <Route path="kids" element={<KidsCornerPage />} />
                <Route path="downloads" element={<DownloadsPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="bookmarks" element={<BookmarksPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Protected Admin Routes */}
              <Route path="admin" element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="feedback" element={<AdminFeedback />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="quran" element={<AdminQuran />} />
                  <Route path="bookmarks" element={<AdminBookmarks />} />
                  <Route path="profile" element={<AdminProfile />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
