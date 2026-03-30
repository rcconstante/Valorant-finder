import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import AdBanner from './AdBanner';
import CookieConsent from './CookieConsent';

export default function Layout() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <div className="hidden md:block max-w-7xl mx-auto w-full px-4 pt-20">
        <AdBanner slot="7902162081" format="horizontal" className="mb-4" />
      </div>
      <Outlet />
      <div className="hidden md:block max-w-7xl mx-auto w-full px-4 pb-4">
        <AdBanner slot="1435991937" format="horizontal" className="mt-4" />
      </div>
      <Footer />
      <BottomNav />
      <CookieConsent />
    </div>
  );
}
