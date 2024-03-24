"use client"; // This is a Client Component

import Image from "next/image";
import React from "react";
import QuickExitButton from "./QuickExitButton";

const HomeClientSection = () => {
    const handleQuickExit = () => {
        window.location.replace("https://weather.com");
      };

  return (
    <div className="font-semibold fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none ">
      <QuickExitButton onClick={handleQuickExit} />
    </div>
  );
};

export default HomeClientSection;