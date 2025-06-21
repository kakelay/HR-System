"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignInForm } from "@/components/sign-in/sign-in-form";

export default function SignInPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        router.replace("/");
        return;
      }
      setIsCheckingAuth(false);
    };

    const timer = setTimeout(checkAuthStatus, 50);
    return () => clearTimeout(timer);
  }, [router]);

  // Show loading while checking auth status
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return <SignInForm />;
}
