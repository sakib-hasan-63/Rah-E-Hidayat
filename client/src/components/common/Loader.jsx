export default function Loader({ variant = 'spinner', count = 3, className = '' }) {
  if (variant === 'spinner') {
    return (
      <div className={`flex items-center justify-center py-20 ${className}`} role="status" aria-label="Loading">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-3 border-[#0F5132]/10 dark:border-[#10B981]/10" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-3 border-transparent border-t-[#0F5132] dark:border-t-[#10B981] animate-spin" />
        </div>
      </div>
    );
  }

  if (variant === 'skeleton-cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="card p-6 space-y-4">
            <div className="skeleton h-5 w-3/4 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-5/6 rounded" />
            <div className="skeleton h-10 w-1/3 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'skeleton-list') {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="card p-4 flex items-center gap-4">
            <div className="skeleton w-12 h-12 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-2/3 rounded" />
              <div className="skeleton h-3 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
