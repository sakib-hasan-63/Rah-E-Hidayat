import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-[#0F5132]/10 dark:bg-[#10B981]/15 text-[#0F5132] dark:text-[#6EE7B7] flex items-center justify-center mb-6 shadow-sm">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#0F5132] dark:text-[#6EE7B7] mb-2">
        404
      </h1>

      <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-[#F0EDE5] mb-3">
        This Path Could Not Be Found
      </h2>

      <p className="text-sm text-[#7A8578] max-w-sm mb-8">
        The page you are looking for may have moved or does not exist. Let us return to guidance.
      </p>

      <Link to="/" className="btn-primary !py-3 !px-6 inline-flex items-center gap-2">
        <Home className="w-4 h-4" /> Return to Home
      </Link>
    </div>
  );
}
