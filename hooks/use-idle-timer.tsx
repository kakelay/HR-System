"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface UseIdleTimerProps {
  timeout?: number; // in milliseconds
  warningTime?: number; // in milliseconds
  onIdle?: () => void;
  onActive?: () => void;
  onWarning?: () => void;
}

export function useIdleTimer({
  timeout = 1 * 60 * 1000, // 1 minutes default
  warningTime = 0.5 * 60 * 1000, // 0.5 minutes warning default
  onIdle,
  onActive,
  onWarning,
}: UseIdleTimerProps = {}) {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
  }, []);

  const handleIdle = useCallback(() => {
    // Clear stored data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");

    // Call custom idle handler if provided
    onIdle?.();

    // Redirect to sign-in page
    router.replace("/sign-in");
  }, [onIdle, router]);

  const handleWarning = useCallback(() => {
    onWarning?.();
  }, [onWarning]);

  const resetTimer = useCallback(() => {
    clearTimers();
    lastActivityRef.current = Date.now();

    // Set warning timer
    warningTimeoutRef.current = setTimeout(() => {
      handleWarning();
    }, timeout - warningTime);

    // Set idle timer
    timeoutRef.current = setTimeout(() => {
      handleIdle();
    }, timeout);

    onActive?.();
  }, [timeout, warningTime, handleIdle, handleWarning, onActive, clearTimers]);

  useEffect(() => {
    // Only run if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      return;
    }

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimer, true);
    });

    // Start the timer
    resetTimer();

    // Cleanup
    return () => {
      clearTimers();
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, [resetTimer, clearTimers]);

  return {
    resetTimer,
    clearTimers,
    getLastActivity: () => lastActivityRef.current,
  };
}
