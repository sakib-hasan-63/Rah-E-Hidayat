import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';
import {
  ShieldCheck, Lock, Eye, EyeOff, CheckCircle2,
  Key, AlertCircle, Loader2, Save, User
} from 'lucide-react';

export default function AdminProfile() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(user?.name || 'Admin');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'A';

  const handleUpdateSecurity = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (password) {
      if (password.length < 6) {
        setError('New password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('New password and confirmation do not match.');
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
      };

      if (password) {
        payload.password = password;
      }

      const res = await api.put('/api/auth/profile', payload);

      if (res.data?.success && res.data.user) {
        updateUser(res.data.user);
        setPassword('');
        setConfirmPassword('');
        setSuccessMsg(password ? 'Admin profile and password updated successfully! 🔒' : 'Admin profile details updated!');
        addToast('Security settings saved successfully', 'success');
      }
    } catch (err) {
      console.error('Failed to update admin settings:', err);
      const msg = err.response?.data?.message || 'Failed to update profile settings.';
      setError(msg);
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
          Admin Profile & Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
          Manage your administrator profile, system credentials, and security settings.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="card-premium p-6 sm:p-8 bg-gradient-to-br from-white via-[#FAF8F2] to-[#E7F4ED]/40 dark:from-[#162118] dark:to-[#0E1610] border-2 border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F5132] to-[#1B7A4E] dark:from-[#34D399] dark:to-[#059669] text-white dark:text-[#062013] font-serif font-bold text-2xl flex items-center justify-center shadow-lg border border-[#C9A84C]/40 flex-shrink-0">
              {initial}
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-[var(--text-main)]">{user?.name || 'Administrator'}</h2>
              <p className="text-xs text-[var(--text-muted)]">{user?.email}</p>
              <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase">
                <ShieldCheck className="w-3 h-3" /> System Super Administrator
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Role: admin
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[var(--border-color)] text-xs">
          <div className="p-3.5 rounded-xl bg-[var(--bg-main)]">
            <span className="text-[var(--text-sub)] block mb-0.5 font-medium">Access Rights</span>
            <p className="font-bold text-[var(--text-main)]">Full Control & Dashboard Privileges (/admin)</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-main)]">
            <span className="text-[var(--text-sub)] block mb-0.5 font-medium">Database Status</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> MongoDB Active & Connected
            </p>
          </div>
        </div>
      </div>

      {/* Password & Profile Settings Form */}
      <div className="card-premium p-6 sm:p-8 border-2 border-[var(--border-color)]">
        <div className="flex items-center gap-2.5 pb-5 border-b border-[var(--border-color)] mb-6">
          <Key className="w-5 h-5 text-[var(--primary-main)]" />
          <div>
            <h3 className="font-display font-bold text-lg text-[var(--text-main)]">
              Change Admin Password & Details
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Update your administrator password securely. Passwords are never stored in plain text.
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-200 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 flex items-center gap-3 text-xs text-red-900 dark:text-red-200 font-medium">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleUpdateSecurity} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Admin Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-sub)] mb-1.5">
                Admin Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Admin Name"
                  required
                />
                <User className="w-4.5 h-4.5 text-[var(--text-sub)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Admin Email (Read-only for safety) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-sub)] mb-1.5">
                Admin Email (Fixed)
              </label>
              <input
                type="email"
                value={user?.email || 'rah.e.hidayat1265@gmail.com'}
                disabled
                className="input-field !bg-[var(--bg-main)] opacity-70 cursor-not-allowed text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-color)]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-sub)] mb-3">
              Set New Password (Optional)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-sub)] mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                    minLength={6}
                    className="input-field pr-11"
                    autoComplete="new-password"
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

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-sub)] mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    minLength={6}
                    className="input-field"
                    autoComplete="new-password"
                  />
                  <Lock className="w-4.5 h-4.5 text-[var(--text-sub)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
            {password && (
              <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
                Password must be at least 6 characters long.
              </p>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary !py-2.5 !px-6 !text-xs font-bold inline-flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving Settings...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Security Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
