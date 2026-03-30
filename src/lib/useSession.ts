import { useState, useEffect, useCallback } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const SESSION_KEY = 'quicklobby_session_token';

function generateToken(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return 'anon_' + Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function useSession() {
  const [sessionToken, setSessionToken] = useState<string>('');
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
    initSession({ sessionToken }).then((id) => {
      setSessionId(id as string);
    });
  }, [sessionToken, initSession]);

  const getToken = useCallback(() => {
    return sessionToken || localStorage.getItem(SESSION_KEY) || '';
  }, [sessionToken]);

  return { sessionToken, sessionId, getToken };
}
