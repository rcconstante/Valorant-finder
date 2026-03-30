import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center space-y-4 border-t border-[#212b35] mt-auto py-8 bg-[#0a141e]">
      <div className="flex gap-8">
        <Link className="font-body text-xs tracking-widest text-[#ece8e1] hover:text-[#FF4655] transition-opacity" to="/about">
          Terms of Engagement
        </Link>
        <Link className="font-body text-xs tracking-widest text-[#ece8e1] hover:text-[#FF4655] transition-opacity" to="/about">
          Privacy Protocol
        </Link>
        <Link className="font-body text-xs tracking-widest text-[#ece8e1] hover:text-[#FF4655] transition-opacity" to="/about">
          Support
        </Link>
      </div>
      <p className="font-body text-xs tracking-widest text-[#60dcb0]">
        © 2026 VALORANDOMS. TACTICAL PRECISION ASSURED.
      </p>
      <p className="font-body text-[9px] tracking-widest text-on-surface-variant/40 uppercase">
        Not affiliated with Riot Games
      </p>
    </footer>
  );
}
