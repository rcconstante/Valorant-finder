import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center space-y-3 md:space-y-4 border-t border-[#212b35] mt-auto py-6 md:py-8 pb-24 md:pb-8 bg-[#0a141e] px-4">
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        <Link className="font-body text-[10px] md:text-xs tracking-widest text-[#ece8e1] hover:text-[#FF4655] transition-opacity" to="/terms">
          Terms of Engagement
        </Link>
        <Link className="font-body text-[10px] md:text-xs tracking-widest text-[#ece8e1] hover:text-[#FF4655] transition-opacity" to="/privacy">
          Privacy Protocol
        </Link>
        <Link className="font-body text-[10px] md:text-xs tracking-widest text-[#ece8e1] hover:text-[#FF4655] transition-opacity" to="/support">
          Support
        </Link>
      </div>
      <p className="font-body text-[10px] md:text-xs tracking-widest text-[#60dcb0] text-center">
        © 2026 QUICKLOBBY. TACTICAL PRECISION ASSURED.
      </p>
      <p className="font-body text-[9px] tracking-widest text-on-surface-variant/40 uppercase text-center">
        Not affiliated with Riot Games
      </p>
    </footer>
  );
}
