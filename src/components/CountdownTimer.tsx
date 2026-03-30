import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  expiresAt: number;
  className?: string;
  onExpire?: () => void;
}

export default function CountdownTimer({ expiresAt, className = '', onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, expiresAt - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, expiresAt - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const totalSeconds = Math.floor(timeLeft / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const isUrgent = totalSeconds <= 60;
  const isExpired = totalSeconds <= 0;

  if (isExpired) {
    return (
      <span className={`font-headline font-bold uppercase text-error ${className}`}>
        EXPIRED
      </span>
    );
  }

  return (
    <span
      className={`font-headline font-bold tabular-nums ${
        isUrgent ? 'text-error animate-pulse' : 'text-tertiary'
      } ${className}`}
    >
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </span>
  );
}
