"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return isVisible ? (
    <Button
      onClick={scrollToTop}
      variant="secondary"
      size="icon"
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-white hover:bg-gray-100 border border-gray-300"
    >
      <ArrowUp className="w-5 h-5 text-gray-800" />
    </Button>
  ) : null;
}
