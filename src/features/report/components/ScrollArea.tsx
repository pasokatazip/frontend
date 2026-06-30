"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type ScrollAreaProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollArea({ children, className = "" }: ScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      const height = 55;
      const top =
        scrollHeight <= clientHeight
          ? 0
          : (scrollTop / (scrollHeight - clientHeight)) *
            (clientHeight - height);

      setThumbHeight(height);
      setThumbTop(top);
    };

    update();

    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={`relative h-full ${className}`}>
      <div
        ref={scrollRef}
        className="h-full overflow-y-scroll pr-4 scrollbar-none"
      >
        {children}
      </div>

      <div className="absolute right-0 top-0 h-full w-2 rounded-full bg-gray-300">
        <div
          className="   
            absolute w-full
            rounded-full
            px-1
            border border-gray-300
            bg-[linear-gradient(180deg,#D0D0D0_47.12%,#EBEBEB_99.04%)]
            shadow-[inset_0_4px_10px_0_#FFF,0_0_4px_0_#5BD4EC]"
          style={{
            height: thumbHeight,
            transform: `translateY(${thumbTop}px)`,
          }}
        />
      </div>
    </div>
  );
}
