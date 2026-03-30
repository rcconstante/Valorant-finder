import CountdownTimer from './CountdownTimer';
import type { Doc } from '../../convex/_generated/dataModel';

interface LobbyCardProps {
  lobby: Doc<'lobbies'>;
  onJoin: (lobby: Doc<'lobbies'>) => void;
}

function getCommsIcon(comms: string) {
  if (comms === 'Voice Required') return { icon: 'mic', color: 'text-tertiary' };
  if (comms === 'Text Only') return { icon: 'chat', color: 'text-outline' };
  return { icon: 'headphones', color: 'text-tertiary' };
}

function getBorderColor(lobby: Doc<'lobbies'>) {
  if (lobby.gameMode === 'Competitive' || lobby.gameMode === 'Premier') return 'border-primary';
  return 'border-outline-variant';
}

function getRegionBadge(lobby: Doc<'lobbies'>) {
  if (lobby.gameMode === 'Competitive' || lobby.gameMode === 'Premier')
    return 'bg-primary-container text-on-primary-container';
  return 'bg-surface-container-highest text-on-surface';
}

function getModeBadge(lobby: Doc<'lobbies'>) {
  if (lobby.gameMode === 'Competitive' || lobby.gameMode === 'Premier')
    return 'text-tertiary border-tertiary/30';
  return 'text-on-surface-variant border-outline-variant';
}

function getSlotsColor(lobby: Doc<'lobbies'>) {
  if (lobby.slotsNeeded >= 3) return 'text-primary';
  if (lobby.gameMode === 'Competitive') return 'text-primary';
  return 'text-on-surface';
}

function getJoinButton(lobby: Doc<'lobbies'>) {
  if (lobby.gameMode === 'Competitive' || lobby.gameMode === 'Premier')
    return 'bg-primary-container text-on-primary-container hover:bg-primary';
  return 'bg-surface-container-highest text-on-surface hover:bg-surface-variant';
}

function getRankDisplay(lobby: Doc<'lobbies'>) {
  if (lobby.rankAny) return 'Any Rank';
  if (lobby.rankMin && lobby.rankMax) return `${lobby.rankMin} - ${lobby.rankMax}`;
  if (lobby.rankMin) return `${lobby.rankMin}+`;
  return 'Any Rank';
}

export default function LobbyCard({ lobby, onJoin }: LobbyCardProps) {
  const comms = getCommsIcon(lobby.commsPreference);
  const playerCount = 5 - lobby.slotsNeeded;

  return (
    <div
      className={`relative group bg-surface-container-low border-l-4 ${getBorderColor(lobby)} p-6 hover:bg-surface-container transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={`${getRegionBadge(lobby)} px-2 py-0.5 font-label text-[10px] font-black uppercase tracking-wider`}
            >
              {lobby.region}
            </span>
            <span
              className={`font-label text-[10px] font-bold uppercase tracking-widest border px-2 py-0.5 ${getModeBadge(lobby)}`}
            >
              {lobby.gameMode}
            </span>
          </div>
          {lobby.notes ? (
            <h3 className="text-2xl font-headline font-bold text-on-surface tracking-tight uppercase mt-2">
              {lobby.notes}
            </h3>
          ) : (
            <h3 className="text-2xl font-headline font-bold text-on-surface tracking-tight uppercase mt-2">
              {lobby.gameMode} Lobby
            </h3>
          )}
        </div>
        <div className="text-right">
          <div className={`${getSlotsColor(lobby)} font-headline font-black text-3xl leading-none`}>
            {lobby.slotsNeeded}{' '}
            <span className="text-xs font-medium text-on-surface-variant/50">NEEDED</span>
          </div>
          <div className="text-[10px] font-label text-on-surface-variant uppercase tracking-tighter mt-1">
            Slots: {playerCount}/{5}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-surface-container-high p-3">
          <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Rank</div>
          <div className="font-headline font-bold text-sm text-on-surface uppercase">{getRankDisplay(lobby)}</div>
        </div>
        <div className="bg-surface-container-high p-3">
          <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Comms</div>
          <div className="flex items-center gap-1 text-on-surface font-headline font-bold text-sm uppercase">
            <span className={`material-symbols-outlined text-sm ${comms.color}`}>{comms.icon}</span>
            <span className="truncate">{lobby.commsPreference}</span>
          </div>
        </div>
        <div className="bg-surface-container-high p-3">
          <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Style</div>
          <div className="font-headline font-bold text-sm text-on-surface uppercase truncate">{lobby.playstyle}</div>
        </div>
        <div className="bg-surface-container-high p-3">
          <div className="text-[9px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Timer</div>
          <CountdownTimer expiresAt={lobby.expiresAt} className="text-sm" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {Array.from({ length: playerCount }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-surface-container-highest border border-outline-variant flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-xs text-on-surface-variant">person</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => onJoin(lobby)}
          className={`strike-button px-10 py-3 font-headline font-black uppercase tracking-tighter transition-all active:scale-95 ${getJoinButton(lobby)}`}
        >
          Join Lobby
        </button>
      </div>
    </div>
  );
}
