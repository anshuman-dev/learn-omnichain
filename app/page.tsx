"use client";
import MainMenu from '../components/menu/MainMenu';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 grid-pattern relative">
      {/* Grid lines for retro effect */}
      <div className="absolute inset-0 grid-pattern"></div>
      
      {/* Content */}
      <div className="z-10 w-full max-w-5xl items-center justify-center text-center">
        <h1 className="pixel-font text-4xl md:text-6xl font-bold mb-16 text-green-500">
          LAYERZERO: THE OMNICHAIN EXPLORER
        </h1>
        
        <MainMenu />
      </div>
    </main>
  );
}
