import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function EmptyState({
  icon: Icon = BookOpen,
  title = 'Nothing here yet',
  description = "Content will appear here once it's available.",
  action,
  actionLabel,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#0F5132]/5 dark:bg-[#10B981]/10 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-[#0F5132]/40 dark:text-[#10B981]/40" />
      </div>
      <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#F0EDE5] mb-2">{title}</h3>
      <p className="text-sm text-[#7A8578] max-w-sm mb-6">{description}</p>
      {action && actionLabel && (
        <button onClick={action} className="btn-primary !py-2.5 !px-5 !text-sm">
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
