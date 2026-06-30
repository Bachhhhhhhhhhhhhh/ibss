"use client";

import { useEffect, useState, type RefObject } from "react";

const DEFAULT_OPTIONS: IntersectionObserverInit = {
  rootMargin: "200px",
  threshold: 0.1,
};

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  options: IntersectionObserverInit = DEFAULT_OPTIONS
): boolean {
  const [inView, setInView] = useState(false);
  const rootMargin = options.rootMargin ?? DEFAULT_OPTIONS.rootMargin;
  const threshold = options.threshold ?? DEFAULT_OPTIONS.threshold;
  const root = options.root;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { rootMargin, threshold, root });

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold, root]);

  return inView;
}