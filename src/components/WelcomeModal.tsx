import { useState, useEffect } from 'react';

const STORAGE_KEY = 'quicklobby_welcomed';

const features = [
  {
    icon: 'bolt',
    title: 'Instant Lobbies',
    desc: 'Create or join a lobby in seconds — no account or sign-up required.',
  },
  {
    icon: 'visibility_off',
    title: '100% Anonymous',
    desc: 'No login, no Discord, no personal data. Just a party code.',
  },
  {
    icon: 'timer',
    title: 'Auto-Expiring',
    desc: 'Lobbies expire automatically after 15 minutes. Extend up to 3 times.',
  },
  {
    icon: 'public',
    title: 'All Regions & Ranks',
    desc: 'Filter by region, game mode, rank range, language, and playstyle.',
  },
  {
    icon: 'shield',
    title: 'Safe & Moderated',
    desc: 'Report inappropriate lobbies. Profanity and abuse are automatically blocked.',
  },
  {
    icon: 'sync',
    title: 'Real-Time Updates',
    desc: 'Lobby feed updates live — no need to refresh the page.',
  },
];

export default function WelcomeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const welcomed = localStorage.getItem(STORAGE_KEY);
    if (!welcomed) {
      // Small delay so the page loads first
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="w-full max-w-lg bg-surface-container border-t-4 border-primary-container max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-2xl">sports_esports</span>
            <h2 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tighter">
              Welcome to QuickLobby
            </h2>
          </div>
          <p className="font-body text-sm text-on-surface-variant">
            The fastest way to find Valorant teammates. Here's what you can do:
          </p>
        </div>

        {/* Features */}
        <div className="px-6 space-y-3">
          {features.map((f) => (
            <div key={f.icon} className="flex items-start gap-3 bg-surface-container-low p-3">
              <span className="material-symbols-outlined text-primary text-xl mt-0.5 shrink-0">
                {f.icon}
              </span>
              <div>
                <div className="font-headline font-bold text-sm text-on-surface uppercase tracking-tight">
                  {f.title}
                </div>
                <div className="font-body text-xs text-on-surface-variant leading-relaxed">
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-6 pt-5">
          <button
            onClick={dismiss}
            className="w-full py-4 bg-primary-container text-on-primary-container font-headline font-black uppercase tracking-tighter text-lg hover:bg-primary transition-all active:scale-[0.98]"
          >
            Got It — Let's Go!
          </button>
          <p className="text-center font-label text-[9px] text-on-surface-variant uppercase tracking-widest mt-3">
            This won't show again
          </p>
        </div>
      </div>
    </div>
  );
}
