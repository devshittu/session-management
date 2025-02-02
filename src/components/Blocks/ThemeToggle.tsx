// src/app/components/ThemeToggle.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Instead of setting a class, we set a data attribute.
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      className="btn btn-ghost"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? (
        <MdOutlineDarkMode size={24} className="text-base-content" />
      ) : (
        <MdOutlineLightMode size={24} className="text-base-content" />
      )}
    </button>
  );
};

export default ThemeToggle;
