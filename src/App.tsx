import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FindLobbyPage from './pages/FindLobbyPage';
import CreateLobbyPage from './pages/CreateLobbyPage';
import ActiveLobbyPage from './pages/ActiveLobbyPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-lobby" element={<FindLobbyPage />} />
        <Route path="/create-lobby" element={<CreateLobbyPage />} />
        <Route path="/lobby/:id" element={<ActiveLobbyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
