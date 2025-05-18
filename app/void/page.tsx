"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../lib/store/useAppStore';

export default function VoidPage() {
  const router = useRouter();
  const { setCurrentPage } = useAppStore();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setCurrentPage('void');
    setIsLoaded(true);
  }, [setCurrentPage]);
  
  if (!isLoaded) return <div>Loading...</div>;
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 grid-pattern">
      <div className="z-10 w-full max-w-4xl items-center justify-center text-center">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg border border-green-500">
          <h1 className="pixel-font text-3xl font-bold mb-6 text-green-500">The Void</h1>
          <p className="text-xl mb-8 text-white">
            You wake up in a dark void between blockchains, disoriented and wondering where you are...
          </p>
          <p className="text-lg mb-8 text-gray-300">
            Welcome to the first step of your omnichain journey!
          </p>
          <button 
            className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-md text-white font-semibold pixel-font"
            onClick={() => router.push('/')}
          >
            BACK TO MENU
          </button>
        </div>
      </div>
    </main>
  );
}
