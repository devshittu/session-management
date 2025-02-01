/* eslint-disable jsx-a11y/label-has-associated-control */
'use client';

import Link from 'next/link';
const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="nav-drawer"
        className="drawer-overlay"
        aria-label="Close sidebar"
      >
        Close
      </label>
      <ul className="menu p-4 w-64 bg-base-100 text-base-content min-h-screen">
        <li>
          <Link href="/">🏠 Home</Link>
        </li>
        <li>
          <Link href="/sessions">📅 Sessions</Link>
        </li>
        <li>
          <Link href="/serviceUsers">👥 Service Users</Link>
        </li>
        <li>
          <Link href="/activities">🎭 Activities</Link>
        </li>
        <li>
          <Link href="/reports">📊 Reports</Link>
        </li>
        <li>
          <Link href="/feel">🎨 Look & Feel</Link>
        </li>
        <li>
          <Link href="/playground/box">🛠 Playground Box</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

// src/components/Blocks/Sidebar.tsx
