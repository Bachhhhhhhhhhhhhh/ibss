"use client";

export function SectionSkeleton() {
  return (
    <div className="py-28 md:py-44 animate-pulse" aria-hidden="true">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <div className="h-3 w-32 rounded-full bg-emerald-500/15 mb-6" />
          <div className="h-10 w-72 max-w-full rounded-2xl bg-white/5 mb-4" />
          <div className="h-5 w-96 max-w-full rounded-xl bg-white/[0.03]" />
          <div className="mt-10 h-px w-48 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-36 rounded-2xl bg-white/[0.04] border border-white/[0.06]"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}