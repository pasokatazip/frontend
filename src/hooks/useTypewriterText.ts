import { useEffect, useMemo, useState } from "react";

type TypewriterOptions = {
  interval?: number;
};

type TypewriterState = {
  sourceText: string;
  visibleCount: number;
};

function splitGraphemes(text: string) {
  if ("Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });

    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useTypewriterText(
  text: string,
  { interval = 50 }: TypewriterOptions = {},
) {
  const graphemes = useMemo(() => splitGraphemes(text), [text]);
  const [typewriterState, setTypewriterState] = useState<TypewriterState>({
    sourceText: text,
    visibleCount: 0,
  });
  const { sourceText, visibleCount } = typewriterState;
  const characterCount = graphemes.length;

  useEffect(() => {
    if (sourceText !== text) {
      setTypewriterState({
        sourceText: text,
        visibleCount: prefersReducedMotion() ? characterCount : 0,
      });
      return;
    }

    if (prefersReducedMotion()) {
      if (visibleCount < characterCount) {
        setTypewriterState({ sourceText: text, visibleCount: characterCount });
      }
      return;
    }

    if (visibleCount >= characterCount) {
      return;
    }

    const timer = window.setTimeout(() => {
      setTypewriterState({ sourceText: text, visibleCount: visibleCount + 1 });
    }, interval);

    return () => window.clearTimeout(timer);
  }, [characterCount, interval, sourceText, text, visibleCount]);

  const currentVisibleCount = sourceText === text ? visibleCount : 0;
  const isComplete = currentVisibleCount >= characterCount;

  function complete() {
    setTypewriterState({
      sourceText: text,
      visibleCount: characterCount,
    });
  }

  return {
    complete,
    displayedText: graphemes.slice(0, currentVisibleCount).join(""),
    isComplete,
  };
}
