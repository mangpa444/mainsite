// DarkModeToggle.js
import React from 'react';
import { useDarkMode } from '../DarkModeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`dark-mode-toggle ${darkMode ? 'dark' : 'light'}`}>
      <button onClick={toggleDarkMode} aria-label={darkMode ? "Activate light mode" : "Activate dark mode"}>
        {darkMode ? '🌞' : '🌙'}
      </button>
    </div>
  );
};

export default DarkModeToggle;