"use client";

import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  isPast: boolean;
}

export function useCountdown(target: Date): Countdown {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const total = differenceInSeconds(target, now);
  const isPast = total <= 0;
  const abs = Math.max(0, total);

  return {
    days: Math.floor(abs / 86400),
    hours: Math.floor((abs % 86400) / 3600),
    minutes: Math.floor((abs % 3600) / 60),
    seconds: abs % 60,
    total: abs,
    isPast,
  };
}