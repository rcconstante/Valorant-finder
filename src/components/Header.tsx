import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#0a141e]/80 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-black text-[#ece8e1] tracking-widest font-headline uppercase">
          VALORANDOMS
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`font-headline uppercase tracking-tighter font-bold pb-1 ${
              location.pathname === '/'
                ? 'text-[#FF4655] border-b-2 border-[#FF4655]'
                : 'text-on-surface-variant hover:text-[#FF4655]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/find-lobby"
            className={`font-headline uppercase tracking-tighter font-bold pb-1 ${
              location.pathname === '/find-lobby'
                ? 'text-[#FF4655] border-b-2 border-[#FF4655]'
                : 'text-on-surface-variant hover:text-[#FF4655]'
            }`}
          >
            Find Lobby
          </Link>
          <Link
            to="/create-lobby"
            className={`font-headline uppercase tracking-tighter font-bold pb-1 ${
              location.pathname === '/create-lobby'
                ? 'text-[#FF4655] border-b-2 border-[#FF4655]'
                : 'text-on-surface-variant hover:text-[#FF4655]'
            }`}
          >
            Create
          </Link>
          <Link
            to="/about"
            className={`font-headline uppercase tracking-tighter font-bold pb-1 ${
              location.pathname === '/about'
                ? 'text-[#FF4655] border-b-2 border-[#FF4655]'
                : 'text-on-surface-variant hover:text-[#FF4655]'
            }`}
          >
            About
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-1.5 bg-surface-container-high border-b-2 border-primary-container text-on-surface hover:bg-[#212b35] transition-all duration-200 active:scale-95">
          <span className="material-symbols-outlined text-sm">public</span>
          <span className="font-headline font-bold text-xs uppercase tracking-widest">Region Selector</span>
          <span className="text-[10px] text-tertiary opacity-80">APAC</span>
        </button>
      </div>
    </header>
  );
}
