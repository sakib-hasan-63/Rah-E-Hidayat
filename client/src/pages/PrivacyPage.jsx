import SectionHeader from '../components/common/SectionHeader';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader
        title="Privacy Policy"
        subtitle="Your privacy and personal worship data are safeguarded with full transparency."
      />
      <div className="card p-8 space-y-4 text-sm text-[#4A5548] dark:text-[#B8C4B0] leading-relaxed">
        <h3 className="font-semibold text-base text-[#1A1A1A] dark:text-[#F0EDE5]">1. Data Collection</h3>
        <p>Rah-e-Hidayat only collects the minimum necessary information (e.g. email, display name) to enable profile features, bookmarks synchronization, and personal streak tracking.</p>
        
        <h3 className="font-semibold text-base text-[#1A1A1A] dark:text-[#F0EDE5]">2. No Advertising or Data Selling</h3>
        <p>We do not sell, rent, or trade your personal information with third-party advertisers or data brokers under any circumstances.</p>

        <h3 className="font-semibold text-base text-[#1A1A1A] dark:text-[#F0EDE5]">3. Account Deletion & Inquiries</h3>
        <p>You may request full account and data removal at any time through your Profile Settings or by reaching out to us directly at <a href="mailto:rah.e.hidayat1265@gmail.com" className="text-[#0F5132] dark:text-[#34D399] font-medium hover:underline">rah.e.hidayat1265@gmail.com</a>.</p>
      </div>
    </div>
  );
}
