import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../lib/store/useAppStore';

interface ProgressIndicatorProps {
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  className = '' 
}) => {
  const { currentPage, completedPages } = useAppStore();
  const [progressWidth, setProgressWidth] = useState("0%");
  
  const pages = [
    { id: 'void', name: 'The Void', number: 1 },
    { id: 'traditional-bridge', name: 'Traditional Bridges', number: 2 },
    { id: 'layerzero-discovery', name: 'LayerZero', number: 3 },
    { id: 'omnichain-messaging', name: 'Messaging', number: 4 },
    { id: 'onft-experience', name: 'ONFTs', number: 5 },
    { id: 'omnichain-builder', name: 'Applications', number: 6 },
    { id: 'certification', name: 'Completion', number: 7 }
  ];
  
  const currentIndex = pages.findIndex(page => page.id === currentPage);
  const currentStage = currentIndex >= 0 ? pages[currentIndex] : null;
  
  useEffect(() => {
    setProgressWidth(`${((currentIndex + 1) / pages.length) * 100}%`);
  }, [currentIndex, pages.length]);

  if (!currentStage) return null;

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-72 z-30 ${className}`}>
      <div className="bg-black bg-opacity-70 p-3 rounded-lg border border-gray-800">
        {/* Only show stage number and progress bar - no text that would stay visible */}
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: progressWidth }}
          ></div>
        </div>
        
        {/* Stage dots instead of START/COMPLETE text */}
        <div className="flex justify-between mt-2 px-1">
          {pages.map((page, index) => (
            <div 
              key={page.id}
              className={`w-2 h-2 rounded-full ${
                index <= currentIndex ? 'bg-green-500' : 'bg-gray-600'
              }`}
              title={`Stage ${page.number}: ${page.name}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgressIndicator;
