import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', icon: 'groups', label: 'Lobby' },
  { path: '/find-lobby', icon: 'shield', label: 'Agents' },
  { path: '/rankings', icon: 'leaderboard', label: 'Rankings' },
  { path: '/profile', icon: 'person', label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 pb-safe bg-[#050f19]/90 backdrop-blur-xl border-t-2 border-[#212b35]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 flex-1 h-full active:scale-90 duration-150 ${
              isActive
                ? 'text-[#FF4655] bg-[#121c27]'
                : 'text-[#60dcb0] opacity-60 hover:opacity-100 hover:bg-[#212b35]'
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="font-headline text-[10px] uppercase font-bold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
