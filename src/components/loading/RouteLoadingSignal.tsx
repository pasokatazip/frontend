"use client";

import { useEffect } from "react";
import { useLoading } from "./LoadingProvider";

export function RouteLoadingSignal() {
  const { startLoading } = useLoading();

  useEffect(() => startLoading(), [startLoading]);

  return null;
}
