import { useState, useEffect, useCallback } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const SESSION_KEY = 'quicklobby_session_token';
const FP_KEY = 'quicklobby_fp';

function generateToken(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return 'anon_' + Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Generate a simple device fingerprint based on browser properties */
function getFingerprint(): string {
  const cached = localStorage.getItem(FP_KEY);
  if (cached) return cached;

  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.hardwareConcurrency || 0,
  ].join('|');

  // Simple hash
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const chr = raw.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  const fp = 'fp_' + Math.abs(hash).toString(36);
  localStorage.setItem(FP_KEY, fp);
  return fp;
}

export function useSession() {
  const [sessionToken, setSessionToken] = useState<string>('');
  const [fingerprint] = useState(() => getFingerprint());
  const [sessionId, setSessionId] = useState<string | null>(null);
  const initSession = useMutation(api.sessions.initSession);

  useEffect(() => {
    let token = localStorage.getItem(SESSION_KEY);
    if (!token) {
      token = generateToken();
      localStorage.setItem(SESSION_KEY, token);
    }
    setSessionToken(token);
  }, []);

  useEffect(() => {
    if (!sessionToken) return;
    initSession({ sessionToken, fingerprint }).then((id) => {
      setSessionId(id as string);
    });
  }, [sessionToken, fingerprint, initSession]);

  const getToken = useCallback(() => {
    return sessionToken || localStorage.getItem(SESSION_KEY) || '';
  }, [sessionToken]);

  return { sessionToken, sessionId, fingerprint, getToken };
}
