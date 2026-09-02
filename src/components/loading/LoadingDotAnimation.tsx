type LoadingDotAnimationProps = {
  className?: string;
};

const dotClassName = "loading-dot inline-block";

export function LoadingDotAnimation({ className }: LoadingDotAnimationProps) {
  return (
    <span
      aria-hidden="true"
      className={`text-2xl font-bold leading-8 text-white ${className ?? ""}`}
    >
      <span
        className={dotClassName}
        style={{ animationDelay: "0ms" }}
      >
        .
      </span>
      <span
        className={dotClassName}
        style={{ animationDelay: "180ms" }}
      >
        .
      </span>
      <span className={dotClassName} style={{ animationDelay: "360ms" }}>
        .
      </span>
    </span>
  );
}
