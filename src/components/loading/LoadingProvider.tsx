"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { LoadingScreen } from "./LoadingScreen";

type FinishLoading = () => void;

type LoadingContextValue = {
  startLoading: () => FinishLoading;
  withLoading: <T>(task: () => Promise<T>) => Promise<T>;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

type LoadingProviderProps = {
  children: ReactNode;
};

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    let readyFrame: number | undefined;

    const finishInitialLoading = () => {
      readyFrame = window.requestAnimationFrame(() => {
        setIsInitialLoading(false);
      });
    };

    if (document.readyState === "complete") {
      finishInitialLoading();
    } else {
      window.addEventListener("load", finishInitialLoading, { once: true });
    }

    return () => {
      window.removeEventListener("load", finishInitialLoading);
      if (readyFrame !== undefined) {
        window.cancelAnimationFrame(readyFrame);
      }
    };
  }, []);

  const startLoading = useCallback(() => {
    let isFinished = false;

    setPendingCount((count) => count + 1);

    return () => {
      if (isFinished) {
        return;
      }

      isFinished = true;
      setPendingCount((count) => Math.max(0, count - 1));
    };
  }, []);

  const withLoading = useCallback(
    async <T,>(task: () => Promise<T>) => {
      const finishLoading = startLoading();

      try {
        return await task();
      } finally {
        finishLoading();
      }
    },
    [startLoading],
  );

  const contextValue = useMemo(
    () => ({ startLoading, withLoading }),
    [startLoading, withLoading],
  );
  const isLoading = isInitialLoading || pendingCount > 0;

  return (
    <LoadingContext value={contextValue}>
      {children}
      <LoadingScreen visible={isLoading} />
    </LoadingContext>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }

  return context;
}
