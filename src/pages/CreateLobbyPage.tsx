import { useState } from 'react';
import { useMutation } from 'convex/react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../convex/_generated/api';
import { useSession } from '../lib/useSession';
import {
  REGIONS,
  GAME_MODES,
  RANKS,
  COMMS_OPTIONS,
  PLAYSTYLE_OPTIONS,
  LANGUAGE_OPTIONS,
  SLOTS_OPTIONS,
} from '../lib/constants';

export default function CreateLobbyPage() {
  const navigate = useNavigate();
  const { sessionToken } = useSession();
  const createLobby = useMutation(api.lobbies.create);

  const [partyCode, setPartyCode] = useState('');
  const [region, setRegion] = useState('APAC');
  const [gameMode, setGameMode] = useState('Competitive');
  const [slotsNeeded, setSlotsNeeded] = useState(2);
  const [rankAny, setRankAny] = useState(true);
  const [rankMin, setRankMin] = useState('Iron');
  const [rankMax, setRankMax] = useState('Radiant');
  const [commsPreference, setCommsPreference] = useState('Either');
  const [playstyle, setPlaystyle] = useState('Balanced');
  const [language, setLanguage] = useState('English');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionToken) return;
    setError('');
    setIsSubmitting(true);

    try {
      const lobbyId = await createLobby({
        sessionToken,
        partyCode: partyCode.trim(),
        region,
        gameMode,
        rankAny,
        rankMin: rankAny ? undefined : rankMin,
        rankMax: rankAny ? undefined : rankMax,
        slotsNeeded,
        commsPreference,
        playstyle,
        language,
        notes: notes.trim() || undefined,
      });
      navigate(`/lobby/${lobbyId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lobby');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-24 pb-32 px-4 md:px-8 max-w-3xl mx-auto">
      {/* Header */}
      <section className="mb-10">
        <div className="flex items-center gap-2 text-tertiary font-label text-[10px] tracking-[0.2em] uppercase mb-2">
          <span className="w-2 h-2 bg-tertiary" />
          SYS_INIT_SEQUENCE // LOBBY_CREATE
        </div>
        <h2 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none text-on-surface">
          Create <span className="text-primary-container">Lobby</span>
        </h2>
        <p className="font-body text-sm text-on-surface-variant mt-3 max-w-lg">
          Set up your lobby in seconds. Your party code will be shown to players who join.
        </p>
      </section>

      {error && (
        <div className="mb-6 p-4 bg-error-container/20 border-l-4 border-error text-error font-label text-sm uppercase">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Party Code */}
        <div className="bg-surface-container-low p-6 border-l-4 border-primary-container">
          <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
            Party Code *
          </label>
          <input
            type="text"
            value={partyCode}
            onChange={(e) => setPartyCode(e.target.value)}
            placeholder="Paste your Valorant party code"
            maxLength={30}
            required
            className="w-full bg-surface-container-highest border border-outline-variant px-4 py-3 text-on-surface font-headline font-bold text-lg uppercase tracking-wider placeholder:text-on-surface-variant/30 placeholder:font-normal placeholder:text-sm focus:outline-none focus:border-primary-container transition-colors"
          />
          <p className="mt-2 text-[9px] font-label text-on-surface-variant/60 uppercase tracking-widest">
            This code will be visible when players join your lobby
          </p>
        </div>

        {/* Region & Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-6">
            <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-3">
              Region *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  className={`px-4 py-2 font-headline font-bold uppercase text-xs tracking-wider transition-colors ${
                    region === r
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low p-6">
            <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-3">
              Game Mode *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {GAME_MODES.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setGameMode(m)}
                  className={`px-4 py-2 font-headline font-bold uppercase text-xs tracking-wider transition-colors ${
                    gameMode === m
                      ? 'bg-tertiary-container text-on-tertiary-container'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Slots Needed */}
        <div className="bg-surface-container-low p-6">
          <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-3">
            Slots Needed *
          </label>
          <div className="flex gap-3">
            {SLOTS_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlotsNeeded(s)}
                className={`w-16 h-16 font-headline font-black text-2xl transition-colors ${
                  slotsNeeded === s
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Rank Preference */}
        <div className="bg-surface-container-low p-6">
          <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-3">
            Rank Preference
          </label>
          <div className="flex items-center gap-4 mb-4">
            <button
              type="button"
              onClick={() => setRankAny(true)}
              className={`px-6 py-2 font-headline font-bold uppercase text-xs tracking-wider transition-colors ${
                rankAny
                  ? 'bg-tertiary-container text-on-tertiary-container'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              Any Rank
            </button>
            <button
              type="button"
              onClick={() => setRankAny(false)}
              className={`px-6 py-2 font-headline font-bold uppercase text-xs tracking-wider transition-colors ${
                !rankAny
                  ? 'bg-tertiary-container text-on-tertiary-container'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              Specific Range
            </button>
          </div>
          {!rankAny && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Min Rank
                </label>
                <select
                  value={rankMin}
                  onChange={(e) => setRankMin(e.target.value)}
                  className="w-full bg-surface-container-highest border border-outline-variant px-4 py-3 text-on-surface font-headline font-bold text-sm uppercase focus:outline-none focus:border-primary-container"
                >
                  {RANKS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Max Rank
                </label>
                <select
                  value={rankMax}
                  onChange={(e) => setRankMax(e.target.value)}
                  className="w-full bg-surface-container-highest border border-outline-variant px-4 py-3 text-on-surface font-headline font-bold text-sm uppercase focus:outline-none focus:border-primary-container"
                >
                  {RANKS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Comms & Playstyle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-6">
            <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-3">
              Comms Preference
            </label>
            <div className="flex flex-col gap-2">
              {COMMS_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCommsPreference(c)}
                  className={`px-4 py-3 text-left font-headline font-bold uppercase text-xs tracking-wider transition-colors ${
                    commsPreference === c
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm mr-2 align-middle">
                    {c === 'Voice Required' ? 'mic' : c === 'Text Only' ? 'chat' : 'headphones'}
                  </span>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low p-6">
            <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-3">
              Playstyle
            </label>
            <div className="flex flex-col gap-2">
              {PLAYSTYLE_OPTIONS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlaystyle(p)}
                  className={`px-4 py-3 text-left font-headline font-bold uppercase text-xs tracking-wider transition-colors ${
                    playstyle === p
                      ? 'bg-tertiary-container text-on-tertiary-container'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="bg-surface-container-low p-6">
          <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-3">
            Language
          </label>
          <div className="flex flex-wrap gap-2">
            {LANGUAGE_OPTIONS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                className={`px-5 py-2 font-headline font-bold uppercase text-xs tracking-wider transition-colors ${
                  language === l
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-surface-container-low p-6">
          <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Need chill teammates with mic"
            maxLength={120}
            rows={2}
            className="w-full bg-surface-container-highest border border-outline-variant px-4 py-3 text-on-surface font-body text-sm placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-container transition-colors resize-none"
          />
          <p className="mt-1 text-[9px] font-label text-on-surface-variant/60 uppercase tracking-widest text-right">
            {notes.length}/120
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !sessionToken || !partyCode.trim()}
          className="strike-button w-full py-5 bg-primary-container text-on-primary-container font-headline font-black text-xl uppercase tracking-tighter hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'DEPLOYING...' : 'DEPLOY LOBBY'}
        </button>
      </form>
    </main>
  );
}
