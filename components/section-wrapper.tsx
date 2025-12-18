"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
  style?: CSSProperties;
}

export function SectionWrapper({
  children,
  className = "",
  id,
  fullHeight = true,
  style,
}: SectionWrapperProps) {
  const ref = useRef(null);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative snap-start scroll-mt-20 ${
        fullHeight ? "min-h-screen" : ""
      } ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}
