"use client";
import { useRouter } from 'next/navigation';
import { useMenuStore } from '../../lib/store/useMenuStore';

export default function SettingsPage() {
  const router = useRouter();
  const { soundEnabled, storeCookies, toggleSound, toggleStoreCookies } = useMenuStore();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 grid-pattern">
      <div className="z-10 w-full max-w-md items-center justify-center">
        <div className="bg-black p-8 rounded-lg border border-green-500 mt-4">
          <h3 className="pixel-font text-green-500 mb-6 text-center text-2xl">SETTINGS</h3>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between gap-8">
              <span className="text-white pixel-font text-sm">SOUND</span>
              <button 
                className={`px-4 py-2 rounded pixel-font text-sm ${soundEnabled ? 'bg-green-500' : 'bg-red-500'}`}
                onClick={toggleSound}
              >
                {soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-white pixel-font text-sm">STORE COOKIES</span>
              <button 
                className={`px-4 py-2 rounded pixel-font text-sm ${storeCookies ? 'bg-green-500' : 'bg-red-500'}`}
                onClick={toggleStoreCookies}
              >
                {storeCookies ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="mt-4 px-4 py-2 bg-gray-800 bg-opacity-50 rounded text-xs text-gray-300">
              <p>Storing cookies allows us to remember your learning progress if you close the browser.</p>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button 
              className="pixel-font text-yellow-300 hover:text-green-500 focus:outline-none"
              onClick={() => router.push('/')}
            >
              BACK TO MENU
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
