import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/auth/forgot-password', { email: email.trim() });
      if (res.data?.success) {
        setServerMessage(res.data.message || 'Password reset link sent! Please check your email inbox.');
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      const msg = err.response?.data?.message || 'Something went wrong. Please check your email and try again.';
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
              Forgot Password
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Enter your registered email address and we'll send you a password reset link.
            </p>
          </div>

          {submitted ? (
            /* Success State */
            <div className="text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Check Your Email</h3>
              <p className="text-sm text-[var(--text-main)] mb-3 leading-relaxed">
                {serverMessage}
              </p>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 mb-6 text-left leading-relaxed">
                💡 <strong>Note:</strong> The link is valid for <strong>15 minutes</strong>. If you don't see it in your inbox, please check your spam/junk folder.
              </div>
              <Link
                to="/login"
                className="btn-primary !py-2.5 !px-6 !text-xs inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>
            </div>
          ) : (
            /* Form */
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-sub)] mb-1.5">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      placeholder="you@example.com"
                      className="input-field"
                      autoComplete="email"
                      autoFocus
                    />
                    <Mail className="w-4.5 h-4.5 text-[var(--text-sub)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                      <Loader2 className="w-4.5 h-4.5 animate-spin" /> Sending Link...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-[var(--border-color)] text-center">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-[var(--primary-main)] hover:underline inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
