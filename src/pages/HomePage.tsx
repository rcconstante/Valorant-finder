import { Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import CountdownTimer from '../components/CountdownTimer';

export default function HomePage() {
  const lobbies = useQuery(api.lobbies.listActive, {});
  const previewLobbies = lobbies?.slice(0, 3) ?? [];
  const activeCount = lobbies?.length ?? 0;

  return (
    <main className="pt-20 pb-28 md:pt-24 md:pb-32 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
        {/* CREATE LOBBY */}
        <Link to="/create-lobby" className="group relative h-52 md:h-80 overflow-hidden cut-corner bg-surface-container-low border-l-4 border-primary-container transition-all hover:shadow-[0_0_30px_rgba(255,82,93,0.2)]">
          <div
            className="absolute inset-0 opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-e3yh7kP23X9HakO5hPTbrFmhrQtHuQzBHbIsjD6TkqpCPaFAbuS5PqR1o-R_CGf6XMma7m53Fk6YeejecAmsXmI3_7tqaNruzowlaDGszp0c-ybFDHXSt-XZhqgZfl7gleT4xVzVFYEZf57AnZrzdbjjIdg8wgaYtOyCz_-jL9f7uy5ziaUdnGoWipItuHwZk4C0WK1xxEEh49nz8i4viikOoyOc4i4W9iN_eNXnhEW9I5hzO73DiIFveSTDd82S6n_IH-vVqrHR')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-5 md:p-8 text-left">
            <span className="font-label text-[10px] md:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-1 md:mb-2">
              SYS_INIT_SEQUENCE
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase leading-none mb-2 md:mb-4">
              CREATE
              <br />
              <span className="text-primary-container">LOBBY</span>
            </h2>
            <p className="font-body text-xs md:text-sm text-on-surface-variant max-w-xs mb-4 md:mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
              Assemble your tactical unit. Define parameters and secure the AO.
            </p>
            <div className="h-1 w-12 bg-primary-container group-hover:w-full transition-all duration-500" />
          </div>
        </Link>

        {/* FIND LOBBY */}
        <Link
          to="/find-lobby"
          className="group relative h-52 md:h-80 overflow-hidden cut-corner bg-surface-container-low border-l-4 border-tertiary transition-all hover:shadow-[0_0_30px_rgba(96,220,176,0.2)]"
        >
          <div
            className="absolute inset-0 opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAj7yWdxyF048XWy_T9wxWH677A54ZgK_U-Pom8F0LIErZUZHOfi-K1s-PZ9OTxZIJW9OIiVA5WtJLue-CzrpFRdWMaXi5fy30deDLu8I_m26YBVF9aS3HLywJ-R3iQOq3XB8eJ_JhJWh3HJTaLFA5eq0eNm6MXUVmRSounRds0_D9biemvLp-pwzBpIySZQC4JuRYGDAVZB70GclunxitTXEVQmqE4dOysGQ8XKunplNa4ECczGBga4op8KXdbvyktfAj9yiUKtvYg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-5 md:p-8 text-left">
            <span className="font-label text-[10px] md:text-xs font-bold text-tertiary uppercase tracking-[0.3em] mb-1 md:mb-2">
              SCANNING_FREQUENCIES
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase leading-none mb-2 md:mb-4">
              FIND
              <br />
              <span className="text-tertiary">LOBBY</span>
            </h2>
            <p className="font-body text-xs md:text-sm text-on-surface-variant max-w-xs mb-4 md:mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
              Join an existing operation. Fill the ranks and execute with precision.
            </p>
            <div className="h-1 w-12 bg-tertiary group-hover:w-full transition-all duration-500" />
          </div>
        </Link>
      </section>

      {/* Live Feed Section */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 md:mb-8 border-l-4 border-primary-container pl-4">
          <div>
            <span className="font-label text-[10px] text-primary uppercase tracking-[0.4em]">
              Satellite Uplink Active
            </span>
            <h3 className="font-headline text-xl md:text-2xl font-black text-[#ece8e1] uppercase tracking-tighter">
              LIVE LOBBY FEED
            </h3>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-primary animate-pulse" />
            <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
              {activeCount} active {activeCount === 1 ? 'node' : 'nodes'}
            </span>
          </div>
        </div>

        {/* Live Lobby Feed */}
        {lobbies === undefined ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin mb-4" />
            <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
              Scanning frequencies...
            </span>
          </div>
        ) : previewLobbies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">satellite_alt</span>
            <h3 className="font-headline text-xl font-black text-on-surface uppercase tracking-tighter mb-2">
              No Active Lobbies
            </h3>
            <p className="font-body text-sm text-on-surface-variant mb-4">
              Be the first — create a lobby now.
            </p>
            <Link
              to="/create-lobby"
              className="strike-button px-8 py-3 bg-primary-container text-on-primary-container font-headline font-bold uppercase tracking-tighter hover:bg-primary transition-all"
            >
              Create Lobby
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {previewLobbies.map((lobby) => (
              <Link
                key={lobby._id}
                to="/find-lobby"
                className="bg-surface-container-low p-4 md:p-6 flex flex-col justify-between min-h-[140px] md:min-h-[160px] hover:bg-surface-container transition-colors cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col min-w-0 flex-1 mr-2">
                    <span className="font-headline text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors truncate">
                      {lobby.notes || `${lobby.gameMode} Lobby`}
                    </span>
                    <span className="font-label text-[10px] text-on-surface-variant uppercase">
                      {lobby.region} • {lobby.playstyle}
                    </span>
                  </div>
                  <div className="bg-tertiary-container/20 px-2 py-0.5 border border-tertiary/30 shrink-0">
                    <span className="text-tertiary font-label text-[10px] font-bold uppercase tracking-widest">
                      {lobby.region}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 md:mt-8">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="font-label text-[9px] text-on-surface-variant uppercase">Mode</span>
                      <span className="font-headline text-xs font-bold text-white uppercase">{lobby.gameMode}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label text-[9px] text-on-surface-variant uppercase">Timer</span>
                      <CountdownTimer expiresAt={lobby.expiresAt} className="text-xs" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-label text-[9px] text-primary uppercase font-bold tracking-widest">
                      SLOTS NEEDED
                    </span>
                    <span className="font-headline text-2xl font-black text-white">
                      {lobby.slotsNeeded}
                      <span className="text-on-surface-variant text-sm font-normal">/5</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {previewLobbies.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Link
              to="/find-lobby"
              className="font-label text-[10px] font-bold uppercase tracking-[0.4em] text-on-surface-variant hover:text-primary transition-colors"
            >
              View all lobbies →
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
