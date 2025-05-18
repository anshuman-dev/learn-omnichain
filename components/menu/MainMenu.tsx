"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMenuStore } from '../../lib/store/useMenuStore';

interface MainMenuProps {
  isPauseMenu?: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({ isPauseMenu = false }) => {
  const router = useRouter();
  const { activeOption, setActiveOption, togglePause } = useMenuStore();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          navigateMenu('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          navigateMenu('down');
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleOptionClick(activeOption);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeOption]);

  const menuOptions = isPauseMenu 
    ? ['resume', 'settings', 'about', 'exit'] as const
    : ['begin', 'settings', 'about', 'exit'] as const;

  const navigateMenu = (direction: 'up' | 'down') => {
    const currentIndex = menuOptions.indexOf(activeOption as any);
    let newIndex;
    
    if (direction === 'up') {
      newIndex = currentIndex <= 0 ? menuOptions.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex >= menuOptions.length - 1 ? 0 : currentIndex + 1;
    }
    
    setActiveOption(menuOptions[newIndex]);
  };

  const handleOptionClick = (option: 'begin' | 'settings' | 'about' | 'resume' | 'exit') => {
    setActiveOption(option);
    
    if (option === 'begin') {
      router.push('/void');
    } else if (option === 'resume') {
      togglePause();
    } else if (option === 'settings') {
      router.push('/settings');
    } else if (option === 'about') {
      router.push('/about');
    } else if (option === 'exit') {
      window.location.href = 'https://layerzero.network/';
    }
  };

  const MenuOption = ({ option, label }: { option: 'begin' | 'settings' | 'about' | 'resume' | 'exit', label: string }) => (
    <div 
      className={`menu-option ${activeOption === option ? 'active' : ''} mb-6 cursor-pointer`}
      onClick={() => handleOptionClick(option)}
      onMouseEnter={() => setActiveOption(option)}
      role="button"
      tabIndex={0}
    >
      <span className="menu-arrow-left">→</span>
      <span className="pixel-font text-xl">{label}</span>
      <span className="menu-arrow-right">←</span>
    </div>
  );
  
  return (
    <div className="flex flex-col items-center justify-center">
      {isPauseMenu ? (
        <MenuOption option="resume" label="RESUME LEARNING" />
      ) : (
        <MenuOption option="begin" label="BEGIN" />
      )}
      <MenuOption option="settings" label="SETTINGS" />
      <MenuOption option="about" label="ABOUT" />
      <MenuOption option="exit" label="EXIT GAME" />
    </div>
  );
};

export default MainMenu;
