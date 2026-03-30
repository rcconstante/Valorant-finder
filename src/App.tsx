import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import FindLobbyPage from './pages/FindLobbyPage';
import CreateLobbyPage from './pages/CreateLobbyPage';
import ActiveLobbyPage from './pages/ActiveLobbyPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SupportPage from './pages/SupportPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-lobby" element={<FindLobbyPage />} />
          <Route path="/create-lobby" element={<CreateLobbyPage />} />
          <Route path="/lobby/:id" element={<ActiveLobbyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Route>
      </Routes>
    </>
  );
}
