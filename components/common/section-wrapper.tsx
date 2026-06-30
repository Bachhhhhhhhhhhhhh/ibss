"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  sectionNumber?: string;
  align?: "center" | "left";
}

export function SectionWrapper({
  id,
  children,
  className,
  title,
  subtitle,
  eyebrow,
  sectionNumber,
  align = "center",
}: SectionWrapperProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numberY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.02, 0.04, 0.04, 0.02]);

  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative py-28 md:py-44 overflow-hidden", className)}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      {sectionNumber && (
        <motion.div
          className="absolute top-8 right-4 md:right-8 font-display text-[8rem] md:text-[14rem] leading-none text-foreground/[0.025] select-none pointer-events-none"
          style={reduced ? {} : { y: numberY, opacity: numberOpacity }}
          aria-hidden="true"
        >
          {sectionNumber}
        </motion.div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {(eyebrow || title || subtitle) && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 70, damping: 18 }}
            className={cn("mb-16 md:mb-24", align === "center" ? "text-center" : "text-left")}
          >
            {eyebrow && (
              <p className={cn("section-eyebrow mb-6", align === "center" && "justify-center")}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={`${id}-title`}
                className="font-display text-4xl md:text-5xl lg:text-[3.75rem] text-foreground mb-6 leading-[1.06] tracking-tight title-luxury"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-lg md:text-xl text-body-friendly font-light max-w-2xl",
                  align === "center" && "mx-auto"
                )}
              >
                {subtitle}
              </p>
            )}
            <motion.div
              className={cn("mt-10 beam-divider max-w-lg", align === "center" && "mx-auto")}
              initial={reduced ? false : { scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: align === "center" ? 0.5 : 0 }}
              aria-hidden="true"
            />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}