"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../lib/store/useAppStore';
import dynamic from 'next/dynamic';

// Import components with dynamic loading to avoid SSR issues
const ProgressIndicator = dynamic(() => import('../../components/ui/ProgressIndicator'), { ssr: false });

export default function TraditionalBridgePage() {
  const router = useRouter();
  const { setCurrentPage } = useAppStore();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [introStage, setIntroStage] = useState(0);
  
  // Initialize the page
  useEffect(() => {
    setCurrentPage('traditional-bridge');
    setPageLoaded(true);
    
    // Create intro sequence
    const sequence = async () => {
      // First stage - fade in page
      await new Promise(resolve => setTimeout(resolve, 500));
      setIntroStage(1); // Show "Stage 2 - Traditional Bridges" centered
      
      // Wait and then transition to next stage
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIntroStage(3); // Skip to content stage
    };
    
    sequence();
  }, [setCurrentPage]);

  if (!pageLoaded) {
    return <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div className="text-white pixel-font text-xl">Loading...</div>
    </div>;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8 grid-pattern fade-in">
      {/* Stage introduction - ONLY shown during intro stage 1 */}
      {introStage === 1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 fade-in">
          <h1 className="pixel-font text-4xl text-white text-center">
            Stage 2<br/>
            <span className="text-green-500">Traditional Bridges</span>
          </h1>
        </div>
      )}
      
      {/* Progress indicator - ONLY shown for stage 3+ */}
      {introStage >= 3 && <ProgressIndicator />}
      
      {/* Content - placeholder for now */}
      <div className="z-10 w-full max-w-4xl items-center justify-center text-center">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg border border-green-500">
          <h1 className="pixel-font text-3xl font-bold mb-6 text-green-500">Traditional Bridges</h1>
          <p className="text-xl mb-8 text-white">
            Coming soon: Experience the traditional bridge approach.
          </p>
          <button 
            className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-md text-white font-semibold pixel-font"
            onClick={() => router.push('/')}
          >
            BACK TO MENU
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
