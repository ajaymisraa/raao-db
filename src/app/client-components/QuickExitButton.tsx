"use client"; // This is a Client Component

import React, { useEffect } from "react";

export default function QuickExitButton({ onClick }: { onClick: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "x" || event.key === "X") {
        onClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClick]);

  return (
    <button
      onClick={onClick}
      className="ml-4 rounded-md bg-red-500 px-4 py-2 font-bold text-white"
    >
      <code>x</code>
    </button>
  );
}