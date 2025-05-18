import React, { useEffect, useState } from 'react';

interface SpeechBubbleProps {
  text: string;
  speaker?: 'stickman' | 'professor';
  className?: string;
  onComplete?: () => void;
  autoType?: boolean;
  typeDelay?: number;
  autoClose?: boolean;
  closeDelay?: number;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ 
  text, 
  speaker = 'stickman',
  className = '',
  onComplete,
  autoType = true,
  typeDelay = 30,
  autoClose = false,
  closeDelay = 3000
}) => {
  const [displayedText, setDisplayedText] = useState(autoType ? '' : text);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(autoType);
  const [isClosing, setIsClosing] = useState(false);

  // Handle typing effect
  useEffect(() => {
    if (!autoType || !isTyping) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typeDelay);
      
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      
      if (autoClose) {
        const closeTimeout = setTimeout(() => {
          handleClose();
        }, closeDelay);
        
        return () => clearTimeout(closeTimeout);
      }
    }
  }, [currentIndex, autoType, isTyping, text, typeDelay, autoClose, closeDelay]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300); // Match this with CSS animation duration
  };

  const skipTyping = () => {
    if (isTyping) {
      // Skip to the end of the text
      setDisplayedText(text);
      setCurrentIndex(text.length);
      setIsTyping(false);
    } else {
      // If already done typing, close the bubble
      handleClose();
    }
  };

  return (
    <div 
      className={`
        relative p-4 bg-black border-2 border-green-500 rounded-lg max-w-md min-w-[300px] min-h-[100px]
        ${className} 
        ${isClosing ? 'scale-out' : 'scale-in'} 
        transform-origin-${speaker === 'stickman' ? 'bottom-left' : 'bottom-right'}
        cursor-pointer
      `}
      onClick={skipTyping}
    >
      <div className="text-white pixel-font text-sm leading-relaxed mb-6">{displayedText}</div>
      
      {/* Continue indicator that shows when typing is complete */}
      {!isTyping && !autoClose && (
        <div className="absolute bottom-3 right-3 animate-pulse">
          <div className="flex items-center space-x-1">
            <span className="text-green-400 text-xs pixel-font">continue</span>
            <span className="text-green-400 text-xs">▼</span>
          </div>
        </div>
      )}
      
      {/* Bubble tail pointing to the speaker */}
      <div 
        className={`absolute w-4 h-4 bg-black border-2 border-green-500 transform rotate-45 
          ${speaker === 'stickman' 
            ? 'top-full -translate-y-2 left-6 -z-10' 
            : 'top-full -translate-y-2 right-6 -z-10'
          }`}
        style={{
          borderTop: 'none',
          borderLeft: speaker === 'stickman' ? 'none' : '2px solid #22c55e',
          borderRight: speaker === 'stickman' ? '2px solid #22c55e' : 'none',
          backgroundColor: 'black'
        }}
      ></div>

      <style jsx>{`
        .scale-in {
          animation: scaleIn 0.4s forwards;
        }
        .scale-out {
          animation: scaleOut 0.3s forwards;
        }
        .transform-origin-bottom-left {
          transform-origin: bottom left;
        }
        .transform-origin-bottom-right {
          transform-origin: bottom right;
        }
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SpeechBubble;
