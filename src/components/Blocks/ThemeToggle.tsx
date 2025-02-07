'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

const ThemeToggle: React.FC = () => {
  // State to ensure the component only renders after mounting
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // On mount, mark as mounted and get the saved theme from localStorage
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Memoize the toggle function to prevent unnecessary re-renders
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Whenever theme changes (after mount), update document and localStorage
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  // Until mounted, render nothing to avoid hydration mismatches
  if (!mounted) return null;

  return (
    <button className="btn !p-2 text-base-content" onClick={toggleTheme}>
      {theme === 'light' ? (
        <MdOutlineDarkMode size={24} className="text-current" />
      ) : (
        <MdOutlineLightMode size={24} className="text-current" />
      )}
    </button>
  );
};

export default React.memo(ThemeToggle);
// src/components/Blocks/ThemeToggle.tsx
