import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'Do I need a Riot account to use VALORANDOMS?',
    a: 'No. VALORANDOMS is completely anonymous. You don\'t need to sign in, create an account, or link your Riot ID. Just create or find a lobby instantly.',
  },
  {
    q: 'How does lobby expiry work?',
    a: 'Every lobby expires after 5 minutes to keep the feed fresh. The creator can extend it up to 3 times (+5 minutes each). Once expired, the lobby disappears automatically.',
  },
  {
    q: 'Is this affiliated with Riot Games?',
    a: 'No. VALORANDOMS is a community tool and is not endorsed by or affiliated with Riot Games. We do not access any Riot APIs or game data.',
  },
  {
    q: 'How do I join a lobby?',
    a: 'Browse the Find Lobby page, click a lobby card, copy the party code, and paste it in Valorant\'s party code field. That\'s it — under 5 seconds.',
  },
  {
    q: 'Can someone edit or delete my lobby?',
    a: 'Only the device that created the lobby can extend or delete it. This is tied to an anonymous session stored in your browser.',
  },
  {
    q: 'How do I report a bad lobby?',
    a: 'Click on any lobby card and use the "Report Lobby" link in the modal. Select a reason and optionally add details. We review reports to keep the community safe.',
  },
  {
    q: 'What regions are supported?',
    a: 'We currently support APAC, NA, EU, LATAM, KR, JP, MENA, and OCE. More subregions may be added in the future.',
  },
];

export default function AboutPage() {
  return (
    <main className="pt-24 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
      {/* Header */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-tertiary font-label text-[10px] tracking-[0.2em] uppercase mb-2">
          <span className="w-2 h-2 bg-tertiary" />
          SYS_INFO // ABOUT
        </div>
        <h2 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none text-on-surface mb-4">
          About <span className="text-primary-container">VALORANDOMS</span>
        </h2>
        <p className="font-body text-base text-on-surface-variant max-w-xl leading-relaxed">
          A fast, anonymous, no-account Valorant lobby finder. Create a lobby in seconds, share your party code,
          and find teammates without Discord servers or Facebook groups.
        </p>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h3 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tighter mb-6 border-l-4 border-primary-container pl-4">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-container-low p-6 border-l-4 border-primary-container">
            <div className="text-4xl font-headline font-black text-primary-container mb-3">01</div>
            <h4 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-2">
              Create a Lobby
            </h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Paste your Valorant party code, set your region, mode, and preferences. Takes under 15 seconds.
            </p>
          </div>
          <div className="bg-surface-container-low p-6 border-l-4 border-tertiary">
            <div className="text-4xl font-headline font-black text-tertiary mb-3">02</div>
            <h4 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-2">
              Players Find You
            </h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Your lobby appears in the live feed. Players filter by region, mode, rank, and playstyle.
            </p>
          </div>
          <div className="bg-surface-container-low p-6 border-l-4 border-primary">
            <div className="text-4xl font-headline font-black text-primary mb-3">03</div>
            <h4 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-2">
              Copy & Play
            </h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              They copy your party code, paste it in Valorant, and join your team. No accounts, no friction.
            </p>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="mb-12 bg-surface-container-low p-6 border-l-4 border-error">
        <h3 className="font-headline text-lg font-black text-on-surface uppercase tracking-tighter mb-3">
          Player Safety
        </h3>
        <ul className="space-y-2 font-body text-sm text-on-surface-variant">
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-sm text-error mt-0.5">shield</span>
            Never share personal information in lobby notes or party codes.
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-sm text-error mt-0.5">flag</span>
            Report lobbies with offensive content, spam, or fake codes.
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-sm text-error mt-0.5">timer</span>
            Lobbies auto-expire after 5 minutes to prevent stale or misleading listings.
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-sm text-error mt-0.5">visibility_off</span>
            No accounts or personal data is collected. Your session is anonymous.
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h3 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tighter mb-6 border-l-4 border-tertiary pl-4">
          FAQ
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-surface-container-low p-6">
              <h4 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-2">
                {faq.q}
              </h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8">
        <p className="font-headline font-bold text-on-surface-variant uppercase tracking-tighter mb-4">
          Ready to find teammates?
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/create-lobby"
            className="strike-button px-10 py-4 bg-primary-container text-on-primary-container font-headline font-black uppercase tracking-tighter hover:bg-primary transition-all"
          >
            Create Lobby
          </Link>
          <Link
            to="/find-lobby"
            className="strike-button px-10 py-4 bg-surface-container-high text-on-surface font-headline font-bold uppercase tracking-tighter hover:bg-surface-variant transition-all"
          >
            Find Lobby
          </Link>
        </div>
      </section>
    </main>
  );
}
