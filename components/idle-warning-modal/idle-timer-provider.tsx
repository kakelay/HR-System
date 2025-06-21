"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useIdleTimer } from "@/hooks/use-idle-timer";
import { IdleWarningModal } from "./idle-warning-modal";
import { useRouter } from "next/navigation";

interface IdleTimerProviderProps {
  children: React.ReactNode;
}

export function IdleTimerProvider({ children }: IdleTimerProviderProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginStatus === "true");
    };

    checkLoginStatus();

    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const { resetTimer } = useIdleTimer({
    timeout: 1 * 60 * 1000, // 1 minute for testing
    warningTime: 15 * 1000, // 15 seconds warning for testing
    onWarning: () => {
      if (isLoggedIn) {
        setShowWarning(true);
      }
    },
    onIdle: () => {
      setShowWarning(false);
      setIsLoggedIn(false);
    },
  });

  const handleStayLoggedIn = () => {
    setShowWarning(false);
    resetTimer();
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    setShowWarning(false);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <>
      {children}
      {isLoggedIn && (
        <IdleWarningModal
          isOpen={showWarning}
          onStayLoggedIn={handleStayLoggedIn}
          onLogout={handleLogout}
          warningTime={120} // 2 minutes in seconds
        />
      )}
    </>
  );
}
