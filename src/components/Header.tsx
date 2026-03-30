import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-6 h-14 md:h-16 bg-[#0a141e]/80 backdrop-blur-md">
      <div className="flex items-center gap-4 md:gap-8">
        <Link to="/" className="text-lg md:text-2xl font-black text-[#ece8e1] tracking-widest font-headline uppercase">
          QUICKLOBBY
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
    </header>
  );
}
