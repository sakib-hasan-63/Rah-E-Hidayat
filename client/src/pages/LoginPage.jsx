import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      addToast('Please enter your email and password.', 'error');
      return;
    }

    setLoading(true);
    try {
      const user = await login(email.trim(), password);
      addToast(`Welcome back, ${user?.name || 'Brother/Sister'}! 🌙`, 'success');

      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || err.message || 'Invalid email or password';
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="card-premium p-8 sm:p-10 shadow-xl border-2 border-[var(--border-color)] bg-[var(--bg-card)]">
          {/* Header */}
          <div className="text-center mb-8">
            <img
              src="/logo.png"
              alt="Rah-e-Hidayat"
              className="w-16 h-16 rounded-2xl object-cover mx-auto mb-4 shadow-md"
            />
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-1.5">
              Sign In
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-sub)] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
                  autoComplete="email"
                />
                <Mail className="w-4.5 h-4.5 text-[var(--text-sub)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-sub)]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-[var(--primary-main)] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-11"
                  autoComplete="current-password"
                />
                <Lock className="w-4.5 h-4.5 text-[var(--text-sub)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 text-[var(--text-sub)] hover:text-[var(--text-main)] absolute right-2.5 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-3.5 !mt-6 !font-bold text-sm"
            >
              <LogIn className="w-4.5 h-4.5" /> {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 pt-5 border-t border-[var(--border-color)] text-center">
            <p className="text-xs text-[var(--text-muted)]">
              New to Rah-e-Hidayat?{' '}
              <Link to="/register" className="font-bold text-[var(--primary-main)] hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
