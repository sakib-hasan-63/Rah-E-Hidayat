import { useState, useEffect } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { Mail, MessageSquare, Send, Loader2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const feedbackTypes = [
  'General Feedback',
  'Suggestion',
  'Content Correction',
  'Inquiry',
  'Bug Report',
  'Other',
];

export default function ContactPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'General Feedback',
  });
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/api/feedback', formData);
      if (res.data?.success) {
        addToast(res.data.message || 'Thank you! Your feedback has been received.', 'success');
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          subject: '',
          message: '',
          type: 'General Feedback',
        });
      }
    } catch (err) {
      console.error('Feedback submit error:', err);
      const msg = err.response?.data?.message || 'Failed to submit feedback. Please try again.';
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader
        title="Contact & Feedback"
        subtitle="We warmly welcome your suggestions, content corrections, or inquiries."
      />

      {/* Official Admin / Contact Email Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-[#0F5132]/5 dark:bg-[#10B981]/5 border border-[#0F5132]/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0F5132]/10 dark:bg-white/10 flex items-center justify-center text-[#0F5132] dark:text-[#34D399] shrink-0">
            <Mail className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="font-bold text-[var(--text-main)]">Official Admin & Contact Email</p>
            <a
              href="mailto:rah.e.hidayat1265@gmail.com"
              className="text-[#0F5132] dark:text-[#34D399] hover:underline font-mono text-xs font-semibold"
            >
              rah.e.hidayat1265@gmail.com
            </a>
          </div>
        </div>
        <span className="text-[var(--text-muted)] text-[11px]">
          Direct queries or feedback welcome
        </span>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A8578] mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#111810] border border-[#0F5132]/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A8578] mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#111810] border border-[#0F5132]/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A8578] mb-1">
                Feedback Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#111810] border border-[#0F5132]/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
              >
                {feedbackTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A8578] mb-1">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief summary (optional)"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#111810] border border-[#0F5132]/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A8578] mb-1">
              Feedback / Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="5"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your feedback, suggestion, or question here..."
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#111810] border border-[#0F5132]/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full !py-3 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Send Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
