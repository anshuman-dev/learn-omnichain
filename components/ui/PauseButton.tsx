import React from 'react';
import { useMenuStore } from '../../lib/store/useMenuStore';

const PauseButton: React.FC = () => {
  const { togglePause } = useMenuStore();
  
  return (
    <button
      className="pause-button"
      onClick={togglePause}
      aria-label="Pause"
    >
      ⏸️
    </button>
  );
};

export default PauseButton;
