import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import AdBanner from './AdBanner';

export default function Layout() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen flex flex-col">
      <Header />
      <div className="hidden md:block max-w-7xl mx-auto w-full px-4 pt-20">
        <AdBanner slot="HEADER_AD_SLOT" format="horizontal" className="mb-4" />
      </div>
      <Outlet />
      <div className="hidden md:block max-w-7xl mx-auto w-full px-4 pb-4">
        <AdBanner slot="FOOTER_AD_SLOT" format="horizontal" className="mt-4" />
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
}
