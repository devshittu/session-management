'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-none lg:hidden">
        <label htmlFor="nav-drawer" className="btn btn-ghost">
          <FiMenu size={24} />
        </label>
      </div>
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold text-primary">
          ActMan
        </Link>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
