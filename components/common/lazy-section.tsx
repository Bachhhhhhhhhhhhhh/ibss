"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "@/lib/hooks/use-in-view";
import { SectionSkeleton } from "@/components/common/section-skeleton";

interface LazySectionProps {
  id?: string;
  children: ReactNode;
  skeleton?: ReactNode;
  rootMargin?: string;
  minHeight?: string;
  priority?: boolean;
}

export function LazySection({
  id,
  children,
  skeleton,
  rootMargin = "500px 0px",
  minHeight = "min-h-[40vh]",
  priority = false,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { rootMargin, threshold: 0 });
  const [mounted, setMounted] = useState(priority);

  useEffect(() => {
    if (priority || inView) setMounted(true);
  }, [inView, priority]);

  return (
    <div ref={ref} id={id} className={minHeight}>
      {mounted ? children : (skeleton ?? <SectionSkeleton />)}
    </div>
  );
}