"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the void page after a short delay
    const timer = setTimeout(() => {
      router.push('/void');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 grid-pattern">
      <div className="z-10 w-full max-w-5xl items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-6">
          LayerZero: The Omnichain Explorer
        </h1>
        <p className="text-xl opacity-60 mb-8">Loading your journey...</p>
      </div>
    </main>
  );
}
