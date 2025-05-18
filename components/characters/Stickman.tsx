import React from 'react';

interface StickmanProps {
  state?: 'idle' | 'confused' | 'walking' | 'talking' | 'jumping';
  className?: string;
  color?: string;
  onAnimationComplete?: () => void;
}

const Stickman: React.FC<StickmanProps> = ({ 
  state = 'idle', 
  className = '',
  color = 'white',
  onAnimationComplete
}) => {
  // Simple CSS-based animations
  const stateClasses = {
    idle: "",
    confused: "animate-[head-tilt_2s_ease-in-out_infinite]",
    walking: "animate-[walk_1s_ease-in-out_infinite]",
    talking: "animate-[talk_0.5s_ease-in-out_infinite]",
    jumping: "animate-[jump_1s_ease-in-out]"
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`w-20 h-40 relative flex flex-col items-center justify-center ${stateClasses[state]}`}>
        {/* Head */}
        <div 
          className={`w-10 h-10 rounded-full border-2 ${state === 'confused' ? 'animate-[head-tilt_2s_ease-in-out]' : ''}`} 
          style={{ borderColor: color }}
        ></div>
        
        {/* Question mark for confused state */}
        {state === 'confused' && (
          <div 
            className="absolute -top-8 -right-4 text-xl text-yellow-300 pixel-font animate-pulse"
          >
            ?
          </div>
        )}
        
        {/* Body */}
        <div 
          className={`w-0.5 h-16 ${state === 'idle' ? 'animate-[breathe_1.5s_ease-in-out_infinite]' : ''}`}
          style={{ backgroundColor: color }}
        ></div>
        
        {/* Arms */}
        <div 
          className={`absolute top-12 w-16 h-0.5 ${state === 'talking' ? 'animate-[arm-wave_0.5s_ease-in-out_infinite]' : ''}`}
          style={{ backgroundColor: color }}
        ></div>
        
        {/* Legs */}
        <div className="absolute bottom-0 w-12 flex justify-between">
          <div 
            className={`w-0.5 h-12 transform rotate-12 ${state === 'walking' ? 'animate-[leg-walk_0.5s_ease-in-out_infinite]' : ''}`}
            style={{ backgroundColor: color }}
          ></div>
          <div 
            className={`w-0.5 h-12 transform -rotate-12 ${state === 'walking' ? 'animate-[leg-walk_0.5s_ease-in-out_infinite_reverse]' : ''}`}
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.03); }
        }
        @keyframes head-tilt {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes arm-wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes leg-walk {
          0%, 100% { transform: rotate(12deg); }
          50% { transform: rotate(25deg); }
        }
        @keyframes jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Stickman;
