export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  return (
    <div className={`mb-8 sm:mb-10 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[var(--text-main)] mb-2 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-muted)] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-3.5 mx-auto w-12 h-1 bg-gradient-to-r from-[#0F5132] to-[#C9A84C] dark:from-[#34D399] dark:to-[#E6C66D] rounded-full" />
    </div>
  );
}
