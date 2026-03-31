import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <main className="pt-18 pb-28 md:pt-24 md:pb-32 px-4 md:px-8 max-w-3xl mx-auto">
      <section className="mb-8 md:mb-12">
        <div className="flex items-center gap-2 text-tertiary font-label text-[10px] tracking-[0.2em] uppercase mb-2">
          <span className="w-2 h-2 bg-tertiary" />
          SYS_LEGAL // TERMS
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none text-on-surface mb-4">
          Terms of <span className="text-primary-container">Engagement</span>
        </h1>
        <p className="font-body text-sm text-on-surface-variant">
          Last updated: March 30, 2026
        </p>
      </section>

      <div className="space-y-6">
        <section className="bg-surface-container-low p-6 border-l-4 border-primary-container">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            1. Acceptance of Terms
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            By accessing or using QuickLobby ("the Service"), you agree to be bound by these Terms of Engagement.
            If you do not agree to these terms, do not use the Service. The Service is a community-built lobby finder
            tool and is not affiliated with, endorsed by, or connected to Riot Games in any way.
          </p>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            2. Description of Service
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            QuickLobby provides an anonymous, no-account lobby finder for Valorant players. Users can create
            temporary lobbies with party codes, browse active lobbies, and copy party codes to join games.
            All lobbies automatically expire after 5 minutes and can be extended up to 3 times by the creator.
          </p>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            3. User Conduct
          </h3>
          <div className="font-body text-sm text-on-surface-variant leading-relaxed space-y-2">
            <p>When using the Service, you agree NOT to:</p>
            <ul className="space-y-1 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-error mt-1">•</span>
                Post offensive, hateful, or harassing content in lobby notes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-1">•</span>
                Share fake or misleading party codes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-1">•</span>
                Spam the lobby feed with duplicate or meaningless listings
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-1">•</span>
                Attempt to exploit, disrupt, or abuse the Service
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-1">•</span>
                Share personal information (real names, addresses, phone numbers) in lobbies
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-1">•</span>
                Use automated scripts or bots to interact with the Service
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            4. Anonymous Sessions
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            The Service uses anonymous browser-based sessions to identify lobby creators. No account creation,
            email, or personal data is required. Your session token is stored locally in your browser and is
            used solely to manage your lobbies (extend, delete). Clearing your browser data will end your session.
          </p>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            5. Lobby Content & Moderation
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            We reserve the right to remove any lobby that violates these terms or is reported by users.
            Lobbies containing profanity, spam, offensive content, or fake codes may be removed without notice.
            Repeated violations may result in your session being blocked from creating new lobbies.
          </p>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            6. Intellectual Property
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            VALORANT is a registered trademark of Riot Games, Inc. QuickLobby is not affiliated with, endorsed by,
            or connected to Riot Games. All Riot Games trademarks and content belong to their respective owners.
            The QuickLobby website, design, and code are the property of the QuickLobby team.
          </p>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            7. Limitation of Liability
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            The Service is provided "as is" without warranties of any kind. We are not responsible for any
            negative in-game experiences, interactions with other players found through the Service, or any
            damages arising from use of the Service. Use the Service at your own risk.
          </p>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-outline-variant">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            8. Changes to Terms
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            We may update these terms from time to time. Continued use of the Service after changes are posted
            constitutes acceptance of the updated terms. We encourage you to review this page periodically.
          </p>
        </section>

        <section className="bg-surface-container-low p-6 border-l-4 border-tertiary">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-3">
            9. Contact
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            If you have questions about these terms, please visit our{' '}
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
