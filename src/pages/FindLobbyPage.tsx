import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Doc } from '../../convex/_generated/dataModel';
import LobbyCard from '../components/LobbyCard';
import JoinLobbyModal from '../components/JoinLobbyModal';
import { useSession } from '../lib/useSession';
import { REGIONS, GAME_MODES, COMMS_OPTIONS, PLAYSTYLE_OPTIONS } from '../lib/constants';

const regionFilters = ['All Regions', ...REGIONS] as const;
const modeFilters = ['All Modes', ...GAME_MODES] as const;

export default function FindLobbyPage() {
  const { sessionToken } = useSession();
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [modeFilter, setModeFilter] = useState('All Modes');
  const [playstyleFilter, setPlaystyleFilter] = useState('All');
  const [commsFilter, setCommsFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLobby, setSelectedLobby] = useState<Doc<'lobbies'> | null>(null);

  const lobbies = useQuery(api.lobbies.listActive, {
    region: regionFilter === 'All Regions' ? undefined : regionFilter,
    gameMode: modeFilter === 'All Modes' ? undefined : modeFilter,
    playstyle: playstyleFilter === 'All' ? undefined : playstyleFilter,
    comms: commsFilter === 'All' ? undefined : commsFilter,
  });

  const handleJoin = (lobby: Doc<'lobbies'>) => {
    setSelectedLobby(lobby);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLobby(null);
  };

  return (
    <>
      <main className="pt-18 pb-28 md:pt-24 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Tactical Header Section */}
        <section className="mb-6 md:mb-10">
          <div className="space-y-1 mb-4 md:mb-0">
            <div className="flex items-center gap-2 text-tertiary font-label text-[10px] tracking-[0.2em] uppercase mb-2">
              <span className="w-2 h-2 bg-tertiary" />
              SYS_FEED_ACTIVE // LIVE_LOBBIES
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none text-on-surface">
              Find <span className="text-primary-container">Lobby</span>
            </h2>
          </div>

          {/* Region Quick Filters */}
          <div className="flex gap-2 items-center overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible md:pb-0 scrollbar-hide mt-4">
            {regionFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setRegionFilter(filter)}
                className={`px-3 sm:px-5 py-2 font-headline font-bold uppercase text-[10px] sm:text-xs tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                  regionFilter === filter
                    ? 'bg-surface-container-high border-b-2 border-primary text-on-surface'
                    : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {filter}
              </button>
            ))}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant font-headline font-bold uppercase text-xs tracking-wider transition-colors flex items-center gap-1 shrink-0"
            >
              <span className="material-symbols-outlined text-sm">tune</span>
              Filters
            </button>
          </div>
        </section>

        {/* Extended Filters */}
        {showFilters && (
          <section className="mb-6 md:mb-8 bg-surface-container-low p-4 sm:p-6 border-l-4 border-tertiary">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Game Mode
                </div>
                <div className="flex flex-wrap gap-2">
                  {modeFilters.map((m) => (
                    <button
                      key={m}
                      onClick={() => setModeFilter(m)}
                      className={`px-3 py-1.5 font-headline font-bold uppercase text-[10px] tracking-wider transition-colors ${
                        modeFilter === m
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Playstyle
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setPlaystyleFilter('All')}
                    className={`px-3 py-1.5 font-headline font-bold uppercase text-[10px] tracking-wider transition-colors ${
                      playstyleFilter === 'All'
                        ? 'bg-tertiary-container text-on-tertiary-container'
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                  >
                    All
                  </button>
                  {PLAYSTYLE_OPTIONS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlaystyleFilter(p)}
                      className={`px-3 py-1.5 font-headline font-bold uppercase text-[10px] tracking-wider transition-colors ${
                        playstyleFilter === p
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Comms
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCommsFilter('All')}
                    className={`px-3 py-1.5 font-headline font-bold uppercase text-[10px] tracking-wider transition-colors ${
                      commsFilter === 'All'
                        ? 'bg-tertiary-container text-on-tertiary-container'
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                  >
                    All
                  </button>
                  {COMMS_OPTIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCommsFilter(c)}
                      className={`px-3 py-1.5 font-headline font-bold uppercase text-[10px] tracking-wider transition-colors ${
                        commsFilter === c
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Feed Grid */}
        {lobbies === undefined ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin mb-4" />
            <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
              Scanning frequencies...
            </span>
          </div>
        ) : lobbies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">
              satellite_alt
            </span>
            <h3 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tighter mb-2">
              No Active Lobbies
            </h3>
            <p className="font-body text-sm text-on-surface-variant max-w-md">
              No active lobbies right now. Create one and be the first.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {lobbies.map((lobby) => (
              <LobbyCard key={lobby._id} lobby={lobby} onJoin={handleJoin} />
            ))}
          </div>
        )}
      </main>

      <JoinLobbyModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        lobby={selectedLobby}
        sessionToken={sessionToken}
      />
    </>
  );
}
