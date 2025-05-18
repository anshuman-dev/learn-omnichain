import React from 'react';

interface Professor0xProps {
  state?: 'idle' | 'talking' | 'explaining' | 'thinking';
  className?: string;
  color?: string;
  onAnimationComplete?: () => void;
}

const Professor0x: React.FC<Professor0xProps> = ({ 
  state = 'idle', 
  className = '',
  color = 'white',
  onAnimationComplete
}) => {
  // Simple CSS-based animations
  const stateClasses = {
    idle: "",
    talking: "animate-[talk_0.5s_ease-in-out_infinite]",
    explaining: "animate-[explain_0.4s_ease-in-out_infinite]",
    thinking: "animate-[think_2s_ease-in-out]"
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`w-20 h-44 relative flex flex-col items-center justify-center ${stateClasses[state]}`}>
        {/* Hat */}
        <div 
          className={`w-12 h-2 absolute -top-1`} 
          style={{ backgroundColor: color }}
        ></div>
        <div 
          className={`w-8 h-4 absolute -top-5`} 
          style={{ backgroundColor: color }}
        ></div>
        
        {/* Head with glasses */}
        <div 
          className={`w-10 h-10 rounded-full border-2 relative ${state === 'thinking' ? 'animate-[head-tilt_2s_ease-in-out]' : ''}`}
          style={{ borderColor: color }}
        >
          <div 
            className={`absolute top-3 w-10 h-2 border ${state === 'explaining' ? 'animate-[glasses-glint_1s_ease-in-out_infinite]' : ''}`}
            style={{ borderColor: color }}
          ></div>
        </div>
        
        {/* Body */}
        <div 
          className={`w-0.5 h-16 ${state === 'idle' ? 'animate-[breathe_1.5s_ease-in-out_infinite]' : ''}`}
          style={{ backgroundColor: color }}
        ></div>
        
        {/* Arms */}
        <div 
          className={`absolute top-12 w-16 h-0.5 ${
            state === 'talking' ? 'animate-[arm-wave_0.5s_ease-in-out_infinite]' : 
            state === 'explaining' ? 'animate-[explain-arms_0.4s_ease-in-out_infinite]' : ''
          }`}
          style={{ backgroundColor: color }}
        ></div>
        
        {/* Legs */}
        <div className="absolute bottom-0 w-12 flex justify-between">
          <div 
            className={`w-0.5 h-12 transform rotate-12`}
            style={{ backgroundColor: color }}
          ></div>
          <div 
            className={`w-0.5 h-12 transform -rotate-12`}
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.03); }
        }
        @keyframes arm-wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes explain-arms {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes head-tilt {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes glasses-glint {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes think {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(8deg); }
        }
      `}</style>
    </div>
  );
};

export default Professor0x;
