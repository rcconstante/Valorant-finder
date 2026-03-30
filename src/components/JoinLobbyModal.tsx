import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Doc } from '../../convex/_generated/dataModel';
import CountdownTimer from './CountdownTimer';

interface JoinLobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lobby: Doc<'lobbies'> | null;
  sessionToken: string;
}

export default function JoinLobbyModal({ isOpen, onClose, lobby, sessionToken }: JoinLobbyModalProps) {
  const [copied, setCopied] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSent, setReportSent] = useState(false);
  const reportLobby = useMutation(api.lobbies.report);

  if (!isOpen || !lobby) return null;

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(lobby.partyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReport = async () => {
    if (!reportReason) return;
    try {
      await reportLobby({
        lobbyId: lobby._id,
        sessionToken,
        reason: reportReason,
        details: reportDetails || undefined,
      });
      setReportSent(true);
      setTimeout(() => {
        setReportOpen(false);
        setReportSent(false);
        setReportReason('');
        setReportDetails('');
      }, 1500);
    } catch {
      // silently fail
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg bg-surface-container border-t-8 border-primary relative max-h-[90vh] overflow-y-auto">
        {/* Decorative Element */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary flex items-center justify-center strike-button rotate-12 hidden sm:flex">
          <span
            className="material-symbols-outlined text-on-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            security
          </span>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="text-tertiary font-label text-[10px] tracking-[0.2em] uppercase mb-1">
                TRANSMISSION_ESTABLISHED
              </div>
              <h2 className="text-4xl font-headline font-black uppercase tracking-tighter text-on-surface">
                Lobby Joined
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>

            <div className="bg-surface-container-lowest p-4 sm:p-8 border border-outline-variant mb-6 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="text-[10px] font-label text-on-surface-variant uppercase tracking-[0.3em] mb-3 sm:mb-4">
              ACCESS_CODE
            </div>
            <div className="text-3xl sm:text-5xl md:text-6xl font-headline font-black text-primary tracking-[0.05em] sm:tracking-[0.1em] mb-2 break-all">
              {lobby.partyCode}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-body uppercase tracking-widest">
              <span className="text-on-surface-variant">Expires in</span>
              <CountdownTimer expiresAt={lobby.expiresAt} className="text-sm" />
            </div>
          </div>

          {/* Lobby details */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
            <div className="bg-surface-container-high p-3 text-center">
              <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Region</div>
              <div className="font-headline font-bold text-sm text-on-surface uppercase">{lobby.region}</div>
            </div>
            <div className="bg-surface-container-high p-3 text-center">
              <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Mode</div>
              <div className="font-headline font-bold text-sm text-on-surface uppercase">{lobby.gameMode}</div>
            </div>
            <div className="bg-surface-container-high p-3 text-center">
              <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Slots</div>
              <div className="font-headline font-bold text-sm text-on-surface uppercase">{lobby.slotsNeeded} needed</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={handleCopyCode}
              className="strike-button w-full py-3 sm:py-4 bg-surface-container-high text-on-surface font-headline font-bold text-xs sm:text-base uppercase tracking-widest hover:bg-surface-variant transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(lobby.partyCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                window.open('https://playvalorant.com', '_blank', 'noopener,noreferrer');
              }}
              className="strike-button w-full py-3 sm:py-4 bg-primary text-on-primary font-headline font-black text-xs sm:text-base uppercase tracking-widest hover:bg-primary-container transition-all flex items-center justify-center gap-2"
            >
              Launch Game
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-surface-container-highest border border-outline-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">chat</span>
              </div>
              <div>
                <div className="text-[9px] font-label text-on-surface-variant uppercase">Comms</div>
                <div className="text-xs font-bold text-on-surface font-headline">{lobby.commsPreference}</div>
              </div>
            </div>
            <button
              onClick={() => setReportOpen(!reportOpen)}
              className="text-primary font-headline font-bold text-xs uppercase tracking-tighter hover:underline"
            >
              Report Lobby
            </button>
          </div>

          {/* Report form */}
          {reportOpen && (
            <div className="mt-4 p-4 bg-surface-container-lowest border border-outline-variant">
              {reportSent ? (
                <div className="text-tertiary font-headline font-bold text-sm uppercase text-center">
                  Report submitted. Thank you.
                </div>
              ) : (
                <>
                  <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                    Reason
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {['spam', 'offensive', 'fake_code', 'harassment', 'other'].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setReportReason(r)}
                        className={`px-3 py-1 font-headline font-bold uppercase text-[10px] tracking-wider transition-colors ${
                          reportReason === r
                            ? 'bg-error text-on-error'
                            : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                        }`}
                      >
                        {r.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Additional details (optional)"
                    maxLength={250}
                    rows={2}
                    className="w-full bg-surface-container-highest border border-outline-variant px-3 py-2 text-on-surface font-body text-xs placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-container transition-colors resize-none mb-3"
                  />
                  <button
                    onClick={handleReport}
                    disabled={!reportReason}
                    className="px-6 py-2 bg-error text-on-error font-headline font-bold uppercase text-xs tracking-wider disabled:opacity-50 hover:opacity-90 transition-opacity"
                  >
                    Submit Report
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
