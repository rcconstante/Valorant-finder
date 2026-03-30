import { useState } from 'react';
import { Link } from 'react-router-dom';

type ContactCategory = 'bug' | 'report' | 'feedback' | 'question' | 'other';

const categories: { value: ContactCategory; label: string; icon: string }[] = [
  { value: 'bug', label: 'Bug Report', icon: 'bug_report' },
  { value: 'report', label: 'Report Abuse', icon: 'flag' },
  { value: 'feedback', label: 'Feedback', icon: 'rate_review' },
  { value: 'question', label: 'Question', icon: 'help' },
  { value: 'other', label: 'Other', icon: 'more_horiz' },
];

export default function SupportPage() {
  const [category, setCategory] = useState<ContactCategory | ''>('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !message.trim()) return;
    // For now, just show confirmation. In production, this would send to a backend endpoint.
    setSubmitted(true);
  };

  const handleReset = () => {
    setCategory('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <main className="pt-18 pb-28 md:pt-24 md:pb-32 px-4 md:px-8 max-w-3xl mx-auto">
      <section className="mb-8 md:mb-12">
        <div className="flex items-center gap-2 text-tertiary font-label text-[10px] tracking-[0.2em] uppercase mb-2">
          <span className="w-2 h-2 bg-tertiary" />
          SYS_COMMS // SUPPORT
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none text-on-surface mb-4">
          Support <span className="text-primary-container">Center</span>
        </h2>
        <p className="font-body text-sm text-on-surface-variant max-w-xl leading-relaxed">
          Need help or want to report an issue? Check the resources below or send us a message.
        </p>
      </section>

      {/* Quick Links */}
      <section className="mb-8 md:mb-12">
        <h3 className="font-headline text-lg font-black text-on-surface uppercase tracking-tighter mb-4 border-l-4 border-primary-container pl-4">
          Quick Resources
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/about"
            className="bg-surface-container-low p-5 border-l-4 border-tertiary hover:bg-surface-container transition-colors group"
          >
            <span className="material-symbols-outlined text-2xl text-tertiary mb-2 block">info</span>
            <h4 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-1 group-hover:text-primary transition-colors">
              About & FAQ
            </h4>
            <p className="font-body text-xs text-on-surface-variant">
              Learn how VALORANDOMS works and find answers.
            </p>
          </Link>
          <Link
            to="/terms"
            className="bg-surface-container-low p-5 border-l-4 border-outline-variant hover:bg-surface-container transition-colors group"
          >
            <span className="material-symbols-outlined text-2xl text-on-surface-variant mb-2 block">gavel</span>
            <h4 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-1 group-hover:text-primary transition-colors">
              Terms of Engagement
            </h4>
            <p className="font-body text-xs text-on-surface-variant">
              Read our terms and conditions.
            </p>
          </Link>
          <Link
            to="/privacy"
            className="bg-surface-container-low p-5 border-l-4 border-outline-variant hover:bg-surface-container transition-colors group"
          >
            <span className="material-symbols-outlined text-2xl text-on-surface-variant mb-2 block">shield</span>
            <h4 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-1 group-hover:text-primary transition-colors">
              Privacy Protocol
            </h4>
            <p className="font-body text-xs text-on-surface-variant">
              Understand how we handle your data.
            </p>
          </Link>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mb-8">
        <h3 className="font-headline text-lg font-black text-on-surface uppercase tracking-tighter mb-4 border-l-4 border-tertiary pl-4">
          Contact Us
        </h3>

        {submitted ? (
          <div className="bg-surface-container-low p-8 border-l-4 border-tertiary text-center">
            <span className="material-symbols-outlined text-5xl text-tertiary mb-4 block">check_circle</span>
            <h4 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tighter mb-2">
              Message Received
            </h4>
            <p className="font-body text-sm text-on-surface-variant mb-6">
              Thank you for reaching out. We'll review your message and take appropriate action.
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-surface-container-high text-on-surface font-headline font-bold uppercase tracking-tighter hover:bg-surface-variant transition-all"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-surface-container-low p-6 border-l-4 border-primary-container">
              <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-3">
                Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`px-3 py-3 font-headline font-bold uppercase text-[10px] tracking-wider transition-colors flex flex-col items-center gap-1 ${
                      category === cat.value
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-low p-6">
              <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue, question, or feedback..."
                maxLength={500}
                rows={5}
                required
                className="w-full bg-surface-container-highest border border-outline-variant px-4 py-3 text-on-surface font-body text-sm placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-container transition-colors resize-none"
              />
              <p className="mt-1 text-[9px] font-label text-on-surface-variant/60 uppercase tracking-widest text-right">
                {message.length}/500
              </p>
            </div>

            <button
              type="submit"
              disabled={!category || !message.trim()}
              className="strike-button w-full py-5 bg-primary-container text-on-primary-container font-headline font-black text-xl uppercase tracking-tighter hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Message
            </button>
          </form>
        )}
      </section>

      {/* Safety Reminder */}
      <section className="bg-surface-container-low p-6 border-l-4 border-error">
        <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
          Reporting In-Game Issues
        </h3>
        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
          VALORANDOMS is not affiliated with Riot Games. For in-game issues, cheating reports, or account
          problems, please contact{' '}
          <a
            href="https://support-valorant.riotgames.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Riot Games Support
          </a>{' '}
          directly. We can only assist with issues related to the VALORANDOMS lobby finder service.
        </p>
      </section>
    </main>
  );
}
