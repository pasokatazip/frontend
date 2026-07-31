import { Fragment, useMemo } from "react";
import type { CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";
import { useTypewriterText } from "@/hooks/useTypewriterText";

type DialoguePanelProps = {
  emphasizedTerms?: readonly string[];
  message: string;
  nextLabel?: string;
  onNext?: () => void;
  speaker?: string;
  typingInterval?: number;
};

type MessageSegment = {
  emphasized: boolean;
  text: string;
};

const EMPTY_EMPHASIZED_TERMS: readonly string[] = [];

function escapeRegExp(text: string) {
  return text.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function splitMessage(
  message: string,
  emphasizedTerms: readonly string[],
): MessageSegment[] {
  const terms = emphasizedTerms.filter((term) => term.length > 0);

  if (terms.length === 0) {
    return [{ emphasized: false, text: message }];
  }

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "g");

  return message
    .split(pattern)
    .filter((text) => text.length > 0)
    .map((text) => ({ emphasized: terms.includes(text), text }));
}

function renderMessage(
  displayedMessage: string,
  segments: MessageSegment[],
) {
  let offset = 0;

  return segments.map((segment) => {
    const start = offset;
    offset += segment.text.length;
    const visibleText = displayedMessage.slice(
      start,
      Math.min(offset, displayedMessage.length),
    );

    if (!visibleText) {
      return null;
    }

    return segment.emphasized ? (
      <strong className="font-bold" key={`strong-${start}`}>
        {visibleText}
      </strong>
    ) : (
      <Fragment key={`text-${start}`}>{visibleText}</Fragment>
    );
  });
}

const panelStyle = {
  background: gradients.lightGreen,
  boxShadow: shadows.lightblue,
} satisfies CSSProperties;

export function DialoguePanel({
  emphasizedTerms = EMPTY_EMPHASIZED_TERMS,
  message,
  nextLabel,
  onNext,
  speaker,
  typingInterval,
}: DialoguePanelProps) {
  const { complete, displayedText, isComplete } = useTypewriterText(message, {
    interval: typingInterval,
  });
  const messageSegments = useMemo(
    () => splitMessage(message, emphasizedTerms),
    [emphasizedTerms, message],
  );

  return (
    <button
      aria-label={onNext ? "つぎのメッセージへ" : "メッセージを全文表示"}
      className="relative block h-[10.5rem] w-full rounded-[12px] border border-[#14B8A6] px-4 pt-8 pb-4 text-left"
      disabled={!onNext && isComplete}
      onClick={onNext ?? complete}
      style={panelStyle}
      type="button"
    >
      {speaker && (
        <span
          className="absolute top-2 left-4 text-sm leading-5 font-normal tracking-normal text-[#4C4F5E]"
          style={{ textShadow: shadows.dropwhite }}
        >
          {speaker}
        </span>
      )}

      <span className="absolute top-8 right-4 left-4 h-px bg-[#5BD4EC]/60" />

      <span
        aria-hidden="true"
        className="absolute top-10 right-4 left-4 block h-[72px] overflow-hidden p-0 text-left text-lg leading-6 font-normal tracking-normal whitespace-pre-line text-[#4C4F5E]"
        style={{ textShadow: shadows.dropwhite }}
      >
        {renderMessage(displayedText, messageSegments)}
      </span>

      <span
        aria-hidden="true"
        className="absolute right-4 bottom-4 text-sm leading-5 font-normal tracking-normal text-[#00B7AD]"
        style={{ textShadow: shadows.lightblue }}
      >
        {nextLabel && `${nextLabel} `}▼
      </span>
    </button>
  );
}
