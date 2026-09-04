import SectionHeader from '../components/common/SectionHeader';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader
        title="Terms of Service"
        subtitle="Guidelines for using the Rah-e-Hidayat platform."
      />
      <div className="card p-8 space-y-4 text-sm text-[#4A5548] dark:text-[#B8C4B0] leading-relaxed">
        <h3 className="font-semibold text-base text-[#1A1A1A] dark:text-[#F0EDE5]">1. Religious Content Usage</h3>
        <p>All Quranic text, authentic Hadith, and Islamic resources on this platform are provided freely for personal study, spiritual remembrance, and non-commercial educational distribution.</p>
        
        <h3 className="font-semibold text-base text-[#1A1A1A] dark:text-[#F0EDE5]">2. Reverence & Respect</h3>
        <p>Users are expected to engage with sacred Islamic texts with utmost reverence, avoiding any disrespectful or abusive behavior on community features.</p>
      </div>
    </div>
  );
}
