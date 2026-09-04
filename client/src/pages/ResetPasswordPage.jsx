import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const { addToast } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.put(`/api/auth/reset-password/${token}`, { password });
      if (res.data?.success) {
        if (res.data.token && res.data.user) {
          localStorage.setItem('rah-token', res.data.token);
          localStorage.setItem('rah-user', JSON.stringify(res.data.user));
          updateUser(res.data.user);
        }
        setSuccess(true);
        addToast('Password successfully reset! 🌙', 'success');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      console.error('Reset password error:', err);
      const msg = err.response?.data?.message || 'Invalid or expired reset token. Please request a new one.';
      setError(msg);
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
              Reset Password
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Choose a strong, secure new password for your account.
            </p>
          </div>

          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Password Reset Successful!</h3>
              <p className="text-xs text-[var(--text-muted)] mb-6">
                Your password has been securely updated. Redirecting to home...
              </p>
              <Link to="/" className="btn-primary !py-2.5 !px-6 !text-xs inline-flex items-center gap-2">
                Continue to Homepage
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-sub)] mb-1.5">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    placeholder="At least 6 characters"
                    className="input-field pr-11"
                    autoComplete="new-password"
                    autoFocus
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

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-sub)] mb-1.5">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                    placeholder="Re-enter new password"
                    className="input-field"
                    autoComplete="new-password"
                  />
                  <Lock className="w-4.5 h-4.5 text-[var(--text-sub)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 p-3 rounded-xl border border-red-200 dark:border-red-900">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !py-3.5 !mt-4 !font-bold text-sm"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="w-4.5 h-4.5 animate-spin" /> Updating Password...
                  </span>
                ) : (
                  'Save New Password'
                )}
              </button>

              <div className="mt-6 pt-5 border-t border-[var(--border-color)] text-center">
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-[var(--primary-main)] hover:underline inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Request a new reset link
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
