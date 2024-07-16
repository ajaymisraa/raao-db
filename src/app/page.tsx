'use client';

import Image from "next/image";
import HomeClientSection from "./client-components/HomeClientSection";
import { useTypewriter } from "react-simple-typewriter";

export default function Home() {

  const [text] = useTypewriter({
    words: ["Anti-AAPI Hate 501(c)(3)", "Mental Health Database", "Anti-AAPI Hate Highschool Club", "Anti-AAPI Hate City Collaborator"],
    loop: 0,
    delaySpeed: 1500,
    typeSpeed: 150,
    deleteSpeed: 70,
  });

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow flex flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
  Largest&nbsp;<span className="font-bold">
  {text}
  </span>&nbsp;in Minnesota
</p>
<div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none hidden lg:block">
  <HomeClientSection />
</div>
      </div>
      

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/transparent.png"
          alt="RAAO Logo"
          width={200}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

        
        <a
          href="/posts/ethan"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Ethan{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            A mental health companion providing resources, support, and guidance. Designed, built, and maintained by RAAO.
          </p>
        </a>

        <a
          href="/providers"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Database{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            The largest mental health database in the midwest - curated, developed, and maintained by RAAO.
          </p>
        </a>

        <a
          href="/posts/purpose"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Purpose{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore what we do, why we do it, and how we safely do it. Learn more about our mission, how we handle data, and security.
          </p>
        </a>

        <a
          href="mailto:ajaymisra1@outlook.com"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Contact{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Contact us for more information, questions, or concerns. We are here to help.
          </p>
        </a>
      </div>
      


      
    </main>
    <footer className="text-gray-500 py-4 text-sm">
        <div className="container mx-auto">
          <div className="flex justify-center">
            
          {/*
          <div
              className="w-full max-w-[550px] relative lg:w-80 xl:w-96 cursor-pointer"
            >
              <input
                type="text"
                placeholder="Search for resources..."
                autoComplete="off"
                className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
                name="search"
                value=""
                readOnly
              />
              <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  ></path>
                </svg>
              </div>
            </div>
          */}
          
            
          </div>
          <div className="text-center mt-4">
            <p>
              &copy; Copyright Rochester Asian American Organization LLC {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    
  </div>
  );
}
