"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts down from durationSeconds, anchored to a start timestamp stored in
 * localStorage under `key` so a page refresh resumes the correct remaining
 * time instead of restarting the clock.
 */
export function useCountdown(
  key: string,
  durationSeconds: number,
  onExpire: () => void,
) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    const storageKey = `lc-sat-timer:${key}`;
    expiredRef.current = false;

    let startedAt = Number(localStorage.getItem(storageKey));
    if (!startedAt) {
      startedAt = Date.now();
      localStorage.setItem(storageKey, String(startedAt));
    }

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const left = Math.max(durationSeconds - elapsed, 0);
      setRemaining(left);
      if (left <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [key, durationSeconds]);

  return remaining;
}

export function formatCountdown(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
