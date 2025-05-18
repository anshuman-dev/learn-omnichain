"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../lib/store/useAppStore';
import dynamic from 'next/dynamic';

// Import components with dynamic loading to avoid SSR issues
const Stickman = dynamic(() => import('../../components/characters/Stickman'), { ssr: false });
const Professor0x = dynamic(() => import('../../components/characters/Professor0x'), { ssr: false });
const SpeechBubble = dynamic(() => import('../../components/ui/SpeechBubble'), { ssr: false });
const ProgressIndicator = dynamic(() => import('../../components/ui/ProgressIndicator'), { ssr: false });

export default function VoidPage() {
  const router = useRouter();
  const { setCurrentPage, markPageComplete } = useAppStore();
  const [state, setState] = useState({
    // Stages: 'intro', 'dialog', 'complete'
    currentStage: 'loading',
    introPhase: 0,
    dialogStep: 0,
    showStickman: false,
    showProfessor: false,
    stickmanState: 'idle' as 'idle' | 'confused' | 'walking' | 'talking',
    professorState: 'idle' as 'idle' | 'talking' | 'explaining',
    showInstructions: false,
    showTitleAtTop: false
  });
  
  // Initialize the page
  useEffect(() => {
    setCurrentPage('void');
    
    // Sequence for intro
    const startSequence = async () => {
      // Start with loading
      setState(s => ({...s, currentStage: 'loading'}));
      await new Promise(r => setTimeout(r, 500));
      
      // Show intro title
      setState(s => ({...s, currentStage: 'intro', introPhase: 1}));
      await new Promise(r => setTimeout(r, 2000));
      
      // Move title to top
      setState(s => ({...s, introPhase: 2, showTitleAtTop: true}));
      await new Promise(r => setTimeout(r, 1000));
      
      // Move to dialog phase with title remaining at top
      setState(s => ({
        ...s, 
        currentStage: 'dialog',
        showStickman: true,
        introPhase: 0
      }));
      
      await new Promise(r => setTimeout(r, 1000));
      setState(s => ({...s, stickmanState: 'confused'}));
      
      await new Promise(r => setTimeout(r, 500));
      setState(s => ({...s, dialogStep: 1, showInstructions: true}));
    };
    
    startSequence();
  }, [setCurrentPage]);
  
  // Track dialog changes
  useEffect(() => {
    // Only process if we're in dialog stage
    if (state.currentStage !== 'dialog') return;
    
    switch (state.dialogStep) {
      case 2:
        setState(s => ({...s, showProfessor: true, professorState: 'idle'}));
        break;
      case 3:
        setState(s => ({...s, professorState: 'talking'}));
        break;
      case 4:
        setState(s => ({...s, professorState: 'explaining'}));
        break;
      case 5:
        setState(s => ({...s, stickmanState: 'talking'}));
        break;
      case 6:
        setState(s => ({...s, professorState: 'explaining'}));
        break;
      case 7:
        markPageComplete('void');
        setState(s => ({
          ...s, 
          currentStage: 'complete',
          professorState: 'idle',
          stickmanState: 'idle'
        }));
        break;
    }
  }, [state.dialogStep, state.currentStage, markPageComplete]);
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (state.currentStage === 'intro') {
          // If in intro phase 1, move to phase 2 (title to top)
          if (state.introPhase === 1) {
            setState(s => ({ ...s, introPhase: 2, showTitleAtTop: true }));
          } 
          // If in intro phase 2, move to dialog
          else if (state.introPhase === 2) {
            setState(s => ({
              ...s, 
              currentStage: 'dialog',
              showStickman: true,
              introPhase: 0,
              stickmanState: 'confused',
              dialogStep: 1,
              showInstructions: true
            }));
          }
        } else if (state.currentStage === 'dialog' && state.dialogStep > 0 && state.dialogStep <= 6) {
          handleDialogComplete();
        } else if (state.currentStage === 'complete') {
          handleBeginJourney();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state]);
  
  const dialog = [
    { id: 1, speaker: 'stickman', text: "Where am I? Everything is so... empty." },
    { id: 2, speaker: 'professor', text: "Welcome to the void between blockchains. I am Professor 0x." },
    { id: 3, speaker: 'professor', text: "You're experiencing the fragmentation of the blockchain ecosystem. Each chain exists as its own isolated island." },
    { id: 4, speaker: 'stickman', text: "Blockchains? Islands? I don't understand..." },
    { id: 5, speaker: 'professor', text: "Don't worry. I'll guide you on a journey to understand how traditional bridges work, and then discover a revolutionary technology called LayerZero that's connecting blockchains in a new way." },
    { id: 6, speaker: 'professor', text: "Are you ready to begin your journey as an Omnichain Explorer?" },
  ];
  
  const getCurrentDialog = () => {
    return dialog.find(d => d.id === state.dialogStep);
  };
  
  const handleDialogComplete = () => {
    setState(s => ({...s, dialogStep: s.dialogStep + 1}));
  };
  
  const handleBeginJourney = () => {
    router.push('/traditional-bridge');
  };

  // Loading state
  if (state.currentStage === 'loading') {
    return <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div className="text-white pixel-font text-xl">Loading...</div>
    </div>;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8 grid-pattern">
      {/* Intro title animation - center of screen */}
      {state.currentStage === 'intro' && state.introPhase === 1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 fade-in">
          <h1 className="pixel-font text-4xl text-white text-center">
            Stage 1<br/>
            <span className="text-green-500">The Void</span>
          </h1>
        </div>
      )}
      
      {/* Title at top of screen - separate element with fixed position at top */}
      {state.showTitleAtTop && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: '10px 0',
          backgroundColor: 'black',
          borderBottom: '2px solid #22c55e',
          zIndex: 100,
          textAlign: 'center'
        }}>
          <h2 className="pixel-font text-xl text-green-500">The Void</h2>
        </div>
      )}
      
      {/* Progress indicator - only shown during dialog and complete stages */}
      {(state.currentStage === 'dialog' || state.currentStage === 'complete') && (
        <ProgressIndicator />
      )}
      
      {/* Characters - only shown during dialog and complete stages */}
      {(state.currentStage === 'dialog' || state.currentStage === 'complete') && (
        <div className="relative w-full max-w-4xl h-96 flex items-center justify-center mt-16">
          {/* Stickman */}
          {state.showStickman && (
            <div className="absolute left-1/3 transform -translate-x-1/2">
              <Stickman state={state.stickmanState} />
              
              {/* Stickman dialog */}
              {state.currentStage === 'dialog' && getCurrentDialog()?.speaker === 'stickman' && (
                <div className="absolute left-16 -top-20 z-10">
                  <SpeechBubble 
                    text={getCurrentDialog()?.text || ""} 
                    speaker="stickman"
                    onComplete={handleDialogComplete}
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Professor */}
          {state.showProfessor && (
            <div className="absolute right-1/3 transform translate-x-1/2">
              <Professor0x state={state.professorState} />
              
              {/* Professor dialog */}
              {state.currentStage === 'dialog' && getCurrentDialog()?.speaker === 'professor' && (
                <div className="absolute right-16 -top-20 z-10">
                  <SpeechBubble 
                    text={getCurrentDialog()?.text || ""} 
                    speaker="professor"
                    onComplete={handleDialogComplete}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Begin journey button - only shown in complete stage */}
      {state.currentStage === 'complete' && (
        <div className="mt-8 animate-bounce">
          <button 
            className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-md text-white font-bold pixel-font text-xl"
            onClick={handleBeginJourney}
          >
            BEGIN JOURNEY
          </button>
        </div>
      )}
      
      {/* Instructions box - separate, fixed positioning at bottom right */}
      {state.showInstructions && (
        <div 
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 9999,
            width: '200px',
            backgroundColor: 'black',
            border: '2px solid #22c55e',
            padding: '16px',
            borderRadius: '8px'
          }}
        >
          <button 
            style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none'
            }}
            onClick={() => setState(s => ({...s, showInstructions: false}))}
          >
            X
          </button>
          <div className="text-white pixel-font text-sm">
            Press <span style={{color: '#22c55e'}}>ENTER</span> <br/>
            or <span style={{color: '#22c55e'}}>CLICK</span> dialogue <br/>
            to continue
          </div>
        </div>
      )}
      
      <style jsx global>{`
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
