import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <main className="pt-18 pb-28 md:pt-24 md:pb-32 px-4 md:px-8 max-w-3xl mx-auto">
      <section className="mb-8 md:mb-12">
        <div className="flex items-center gap-2 text-tertiary font-label text-[10px] tracking-[0.2em] uppercase mb-2">
          <span className="w-2 h-2 bg-tertiary" />
          SYS_LEGAL // PRIVACY
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none text-on-surface mb-4">
          Privacy <span className="text-primary-container">Protocol</span>
        </h1>
        <p className="font-body text-sm text-on-surface-variant">
          Last updated: March 30, 2026
        </p>
      </section>

      <div className="space-y-6">
        <section className="bg-surface-container-low p-6 border-l-4 border-primary-container">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            Our Commitment
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            QuickLobby is built on the principle of anonymity. We collect the absolute minimum data
            necessary to operate the Service. No accounts, no emails, no personal information required.
          </p>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            1. Information We Collect
          </h3>
          <div className="font-body text-sm text-on-surface-variant leading-relaxed space-y-3">
            <div>
              <h4 className="font-headline font-bold text-xs text-on-surface uppercase mb-1">Anonymous Session Token</h4>
              <p>
                When you first visit, a random anonymous session token is generated and stored in your browser's
                localStorage. This token is not linked to your identity, email, or any personal data. It exists
                solely to let you manage (extend/delete) lobbies you create.
              </p>
            </div>
            <div>
              <h4 className="font-headline font-bold text-xs text-on-surface uppercase mb-1">Lobby Data</h4>
              <p>
                When you create a lobby, we store the party code, region, game mode, rank preference, comms
                preference, playstyle, language, and optional notes you provide. This data is displayed publicly
                on the lobby feed and is automatically deleted when the lobby expires.
              </p>
            </div>
            <div>
              <h4 className="font-headline font-bold text-xs text-on-surface uppercase mb-1">Reports</h4>
              <p>
                If you report a lobby, the report reason and optional details are stored along with your
                anonymous session token for abuse prevention purposes.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            2. Information We Do NOT Collect
          </h3>
          <ul className="font-body text-sm text-on-surface-variant leading-relaxed space-y-2">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm text-tertiary mt-0.5">check_circle</span>
              No email addresses
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm text-tertiary mt-0.5">check_circle</span>
              No real names or usernames
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm text-tertiary mt-0.5">check_circle</span>
              No Riot account or game data
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm text-tertiary mt-0.5">check_circle</span>
              No IP addresses stored permanently
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm text-tertiary mt-0.5">check_circle</span>
              No location tracking
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm text-tertiary mt-0.5">check_circle</span>
              No cookies for tracking or advertising purposes
            </li>
          </ul>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            3. How We Use Your Data
          </h3>
          <ul className="font-body text-sm text-on-surface-variant leading-relaxed space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              Display active lobbies on the public feed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              Allow creators to manage their own lobbies
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              Enforce rate limits and prevent spam/abuse
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              Process lobby reports for community safety
            </li>
          </ul>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            4. Data Retention
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            Lobby data is automatically deleted when lobbies expire (5 minutes after creation, plus any extensions).
            Anonymous session records are kept for rate-limiting purposes but contain no personal information.
            Report data is retained for moderation review and then deleted periodically.
          </p>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            5. Third-Party Services
          </h3>
          <div className="font-body text-sm text-on-surface-variant leading-relaxed space-y-2">
            <p>We use the following third-party services:</p>
            <ul className="space-y-1 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <strong>Convex</strong> — Real-time database for storing lobby data
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <strong>Netlify</strong> — Website hosting
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <strong>Google AdSense</strong> — Advertising (may use cookies per Google's policies)
              </li>
            </ul>
            <p className="mt-2">
              Each third-party service has its own privacy policy. Google AdSense may collect data according
              to Google's advertising policies.
            </p>
          </div>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            6. Your Rights
          </h3>
          <div className="font-body text-sm text-on-surface-variant leading-relaxed space-y-2">
            <p>Since we don't collect personal data, there is minimal data to manage. However, you can:</p>
            <ul className="space-y-1 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Clear your browser localStorage to reset your anonymous session
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Delete your active lobbies at any time using the delete button
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Contact us to request removal of any data associated with your session
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-tertiary">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            7. Contact
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            For privacy-related questions or concerns, visit our{' '}
            <Link to="/support" className="text-primary hover:underline">Support page</Link>.
          </p>
        </section>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          className="strike-button px-10 py-4 bg-surface-container-high text-on-surface font-headline font-bold uppercase tracking-tighter hover:bg-surface-variant transition-all"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
