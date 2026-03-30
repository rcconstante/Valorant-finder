import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import CountdownTimer from '../components/CountdownTimer';
import AdInterstitial from '../components/AdInterstitial';
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

export default function ActiveLobbyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sessionToken } = useSession();
  const lobby = useQuery(api.lobbies.getById, id ? { lobbyId: id as Id<'lobbies'> } : 'skip');
  const extendLobby = useMutation(api.lobbies.extend);
  const deleteLobbyMut = useMutation(api.lobbies.deleteLobby);
  const editLobbyMut = useMutation(api.lobbies.editLobby);

  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [extending, setExtending] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showExtendAd, setShowExtendAd] = useState(false);
  // Edit form state
  const [editPartyCode, setEditPartyCode] = useState('');
  const [editRegion, setEditRegion] = useState('');
  const [editGameMode, setEditGameMode] = useState('');
  const [editSlotsNeeded, setEditSlotsNeeded] = useState(2);
  const [editRankAny, setEditRankAny] = useState(true);
  const [editRankMin, setEditRankMin] = useState('Iron');
  const [editRankMax, setEditRankMax] = useState('Radiant');
  const [editComms, setEditComms] = useState('Either');
  const [editPlaystyle, setEditPlaystyle] = useState('Balanced');
  const [editLanguage, setEditLanguage] = useState('English');
  const [editNotes, setEditNotes] = useState('');

  const openEdit = () => {
    if (!lobby) return;
    setEditPartyCode(lobby.partyCode);
    setEditRegion(lobby.region);
    setEditGameMode(lobby.gameMode);
    setEditSlotsNeeded(lobby.slotsNeeded);
    setEditRankAny(lobby.rankAny);
    setEditRankMin(lobby.rankMin ?? 'Iron');
    setEditRankMax(lobby.rankMax ?? 'Radiant');
    setEditComms(lobby.commsPreference);
    setEditPlaystyle(lobby.playstyle);
    setEditLanguage(lobby.language ?? 'English');
    setEditNotes(lobby.notes ?? '');
    setShowEdit(true);
    setError('');
  };

  const handleSaveEdit = async () => {
    if (!sessionToken || !lobby || saving) return;
    setError('');
    setSaving(true);
    try {
      await editLobbyMut({
        lobbyId: lobby._id,
        sessionToken,
        partyCode: editPartyCode.trim(),
        region: editRegion,
        gameMode: editGameMode,
        slotsNeeded: editSlotsNeeded,
        rankAny: editRankAny,
        rankMin: editRankAny ? undefined : editRankMin,
        rankMax: editRankAny ? undefined : editRankMax,
        commsPreference: editComms,
        playstyle: editPlaystyle,
        language: editLanguage,
        notes: editNotes.trim() || undefined,
      });
      setShowEdit(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (!id) {
    return (
      <main className="pt-18 pb-28 md:pt-24 md:pb-32 px-4 md:px-8 max-w-3xl mx-auto text-center">
        <p className="font-headline text-xl text-on-surface-variant uppercase">Invalid lobby ID</p>
      </main>
    );
  }

  if (lobby === undefined) {
    return (
      <main className="pt-18 pb-28 md:pt-24 md:pb-32 px-4 md:px-8 max-w-3xl mx-auto flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin mb-4" />
        <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
          Loading lobby...
        </span>
      </main>
    );
  }

  if (lobby === null) {
    return (
      <main className="pt-18 pb-28 md:pt-24 md:pb-32 px-4 md:px-8 max-w-3xl mx-auto text-center py-20">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">
          error
        </span>
        <h2 className="font-headline text-3xl font-black text-on-surface uppercase tracking-tighter mb-2">
          Lobby Not Found
        </h2>
        <p className="font-body text-sm text-on-surface-variant mb-6">
          This lobby may have been deleted or expired.
        </p>
        <Link
          to="/find-lobby"
          className="inline-block px-8 py-3 bg-primary-container text-on-primary-container font-headline font-bold uppercase tracking-tighter"
        >
          Find Lobbies
        </Link>
      </main>
    );
  }

  const isExpired = lobby.status !== 'active' || lobby.expiresAt <= Date.now();
  const canExtend = !isExpired && lobby.extensionsUsed < lobby.maxExtensions;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(lobby.partyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExtend = () => {
    if (!sessionToken || extending) return;
    setShowExtendAd(true);
  };

  const performExtend = async () => {
    if (!sessionToken || !lobby) return;
    setShowExtendAd(false);
    setError('');
    setExtending(true);
    try {
      await extendLobby({ lobbyId: lobby._id, sessionToken });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extend');
    } finally {
      setExtending(false);
    }
  };

  const handleDelete = async () => {
    if (!sessionToken || deleting) return;
    setError('');
    setDeleting(true);
    try {
      await deleteLobbyMut({ lobbyId: lobby._id, sessionToken });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
      setDeleting(false);
    }
  };

  function getRankDisplay() {
    if (lobby!.rankAny) return 'Any Rank';
    if (lobby!.rankMin && lobby!.rankMax) return `${lobby!.rankMin} – ${lobby!.rankMax}`;
    if (lobby!.rankMin) return `${lobby!.rankMin}+`;
    return 'Any Rank';
  }

  return (
    <main className="pt-18 pb-28 md:pt-24 md:pb-32 px-4 md:px-8 max-w-3xl mx-auto">
      {/* Header */}
      <section className="mb-6 md:mb-8">
        <div className="flex items-center gap-2 text-tertiary font-label text-[10px] tracking-[0.2em] uppercase mb-2">
          <span className="w-2 h-2 bg-tertiary animate-pulse" />
          {isExpired ? 'LOBBY_INACTIVE' : 'LOBBY_ACTIVE // BROADCASTING'}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter leading-none text-on-surface">
          Your <span className="text-primary-container">Lobby</span>
        </h2>
      </section>

      {error && (
        <div className="mb-6 p-4 bg-error-container/20 border-l-4 border-error text-error font-label text-sm uppercase">
          {error}
        </div>
      )}

      {/* Party Code Hero */}
      <div className={`bg-surface-container-low border-l-4 ${isExpired ? 'border-error' : 'border-primary-container'} p-5 sm:p-8 md:p-12 mb-6 text-center relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        <div className="text-[10px] font-label text-on-surface-variant uppercase tracking-[0.3em] mb-4">
          PARTY_ACCESS_CODE
        </div>
        <div className="text-3xl sm:text-5xl md:text-7xl font-headline font-black text-primary tracking-[0.05em] sm:tracking-[0.1em] mb-4 relative break-all">
          {lobby.partyCode}
        </div>

        {!isExpired ? (
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">
              Expires in
            </span>
            <CountdownTimer expiresAt={lobby.expiresAt} className="text-xl" />
          </div>
        ) : (
          <div className="mb-6">
            <span className="font-headline font-bold text-xl text-error uppercase">
              {lobby.status === 'deleted' ? 'Deleted' : 'Expired'}
            </span>
          </div>
        )}

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-8 py-3 bg-surface-container-high text-on-surface font-headline font-bold uppercase tracking-tighter hover:bg-surface-variant transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(window.location.href);
              setLinkCopied(true);
              setTimeout(() => setLinkCopied(false), 2000);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container-high text-on-surface-variant font-headline font-bold uppercase tracking-tighter hover:bg-surface-variant transition-all active:scale-95 text-sm"
          >
            <span className="material-symbols-outlined text-sm">
              {linkCopied ? 'check' : 'link'}
            </span>
            {linkCopied ? 'Link Copied!' : 'Share Link'}
          </button>
        </div>
      </div>

      {/* Lobby Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-6">
        <div className="bg-surface-container-low p-4">
          <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Region</div>
          <div className="font-headline font-bold text-lg text-on-surface uppercase">{lobby.region}</div>
        </div>
        <div className="bg-surface-container-low p-4">
          <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Mode</div>
          <div className="font-headline font-bold text-lg text-on-surface uppercase">{lobby.gameMode}</div>
        </div>
        <div className="bg-surface-container-low p-4">
          <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Slots</div>
          <div className="font-headline font-bold text-lg text-primary uppercase">{lobby.slotsNeeded} needed</div>
        </div>
        <div className="bg-surface-container-low p-4">
          <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Rank</div>
          <div className="font-headline font-bold text-sm text-on-surface uppercase">{getRankDisplay()}</div>
        </div>
        <div className="bg-surface-container-low p-4">
          <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Comms</div>
          <div className="font-headline font-bold text-sm text-on-surface uppercase">{lobby.commsPreference}</div>
        </div>
        <div className="bg-surface-container-low p-4">
          <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Playstyle</div>
          <div className="font-headline font-bold text-sm text-on-surface uppercase">{lobby.playstyle}</div>
        </div>
      </div>

      {lobby.notes && (
        <div className="bg-surface-container-low p-4 mb-6 border-l-4 border-outline-variant">
          <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Notes</div>
          <div className="font-body text-sm text-on-surface">{lobby.notes}</div>
        </div>
      )}

      {/* Creator Actions */}
      {!isExpired && (
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <button
            onClick={openEdit}
            className="flex-1 py-4 bg-primary-container text-on-primary-container font-headline font-black uppercase tracking-tighter text-lg hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit Lobby
          </button>

          <button
            onClick={handleExtend}
            disabled={!canExtend || extending}
            className="flex-1 py-4 bg-tertiary-container text-on-tertiary-container font-headline font-black uppercase tracking-tighter text-lg hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">schedule</span>
            {extending ? 'Extending...' : `Extend +5 min`}
            <span className="text-xs font-label font-normal tracking-widest opacity-70">
              ({lobby.extensionsUsed}/{lobby.maxExtensions})
            </span>
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex-1 py-4 bg-surface-container-high text-error font-headline font-bold uppercase tracking-tighter text-lg hover:bg-error hover:text-on-error transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Delete Lobby
          </button>
        </div>
      )}

      {isExpired && (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Link
            to="/create-lobby"
            className="flex-1 py-4 bg-primary-container text-on-primary-container font-headline font-black uppercase tracking-tighter text-lg text-center hover:bg-primary transition-all"
          >
            Create New Lobby
          </Link>
          <Link
            to="/find-lobby"
            className="flex-1 py-4 bg-surface-container-high text-on-surface font-headline font-bold uppercase tracking-tighter text-lg text-center hover:bg-surface-variant transition-all"
          >
            Browse Lobbies
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
          onClick={(e) => { if (e.target === e.currentTarget) setShowDeleteConfirm(false); }}
        >
          <div className="w-full max-w-md bg-surface-container border-t-4 border-error p-8">
            <h3 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tighter mb-3">
              Delete This Lobby?
            </h3>
            <p className="font-body text-sm text-on-surface-variant mb-6">
              This action cannot be undone. Your lobby will be immediately removed from the feed.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 bg-surface-container-high text-on-surface font-headline font-bold uppercase tracking-tighter hover:bg-surface-variant transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 bg-error text-on-error font-headline font-bold uppercase tracking-tighter hover:opacity-90 transition-all disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Lobby Modal */}
      {showEdit && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
          onClick={(e) => { if (e.target === e.currentTarget) setShowEdit(false); }}
        >
          <div className="w-full max-w-2xl bg-surface-container border-t-4 border-primary-container max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <h3 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tighter mb-6">
              Edit Lobby
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-error-container/20 border-l-4 border-error text-error font-label text-xs uppercase">
                {error}
              </div>
            )}

            <div className="space-y-5">
              {/* Party Code */}
              <div>
                <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Party Code
                </label>
                <input
                  type="text"
                  value={editPartyCode}
                  onChange={(e) => setEditPartyCode(e.target.value)}
                  maxLength={30}
                  className="w-full bg-surface-container-highest border border-outline-variant px-4 py-3 text-on-surface font-headline font-bold text-lg uppercase tracking-wider focus:outline-none focus:border-primary-container transition-colors"
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Region
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {REGIONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setEditRegion(r)}
                      className={`px-3 py-2 font-headline font-bold uppercase text-[10px] tracking-wider transition-colors ${
                        editRegion === r
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Mode */}
              <div>
                <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Game Mode
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {GAME_MODES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setEditGameMode(m)}
                      className={`px-3 py-2 font-headline font-bold uppercase text-[10px] tracking-wider transition-colors ${
                        editGameMode === m
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slots */}
              <div>
                <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Slots Needed
                </label>
                <div className="flex gap-2">
                  {SLOTS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setEditSlotsNeeded(s)}
                      className={`w-12 h-12 font-headline font-black text-xl transition-colors ${
                        editSlotsNeeded === s
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rank */}
              <div>
                <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Rank
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setEditRankAny(true)}
                    className={`px-4 py-2 font-headline font-bold uppercase text-xs tracking-wider transition-colors ${
                      editRankAny ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    Any
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditRankAny(false)}
                    className={`px-4 py-2 font-headline font-bold uppercase text-xs tracking-wider transition-colors ${
                      !editRankAny ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    Range
                  </button>
                </div>
                {!editRankAny && (
                  <div className="grid grid-cols-2 gap-3">
                    <select value={editRankMin} onChange={(e) => setEditRankMin(e.target.value)} className="bg-surface-container-highest border border-outline-variant px-3 py-2 text-on-surface font-headline font-bold text-sm uppercase focus:outline-none focus:border-primary-container">
                      {RANKS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <select value={editRankMax} onChange={(e) => setEditRankMax(e.target.value)} className="bg-surface-container-highest border border-outline-variant px-3 py-2 text-on-surface font-headline font-bold text-sm uppercase focus:outline-none focus:border-primary-container">
                      {RANKS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                )}
              </div>

              {/* Comms & Playstyle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                    Comms
                  </label>
                  <div className="flex flex-col gap-1">
                    {COMMS_OPTIONS.map((c) => (
                      <button key={c} type="button" onClick={() => setEditComms(c)} className={`px-3 py-2 text-left font-headline font-bold uppercase text-[10px] tracking-wider transition-colors ${editComms === c ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                    Playstyle
                  </label>
                  <div className="flex flex-col gap-1">
                    {PLAYSTYLE_OPTIONS.map((p) => (
                      <button key={p} type="button" onClick={() => setEditPlaystyle(p)} className={`px-3 py-2 text-left font-headline font-bold uppercase text-[10px] tracking-wider transition-colors ${editPlaystyle === p ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Language
                </label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGE_OPTIONS.map((l) => (
                    <button key={l} type="button" onClick={() => setEditLanguage(l)} className={`px-4 py-2 font-headline font-bold uppercase text-[10px] tracking-wider transition-colors ${editLanguage === l ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                  Notes
                </label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  maxLength={120}
                  rows={2}
                  className="w-full bg-surface-container-highest border border-outline-variant px-4 py-3 text-on-surface font-body text-sm focus:outline-none focus:border-primary-container transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowEdit(false)}
                className="flex-1 py-3 bg-surface-container-high text-on-surface font-headline font-bold uppercase tracking-tighter hover:bg-surface-variant transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving || !editPartyCode.trim()}
                className="flex-1 py-3 bg-primary-container text-on-primary-container font-headline font-bold uppercase tracking-tighter hover:bg-primary transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Extend Ad Interstitial */}
      {showExtendAd && <AdInterstitial onClose={performExtend} />}
    </main>
  );
}
