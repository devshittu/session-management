// 'use client';

// import React, { FC, useState, useRef, useEffect, ReactNode } from 'react';
// import Link from 'next/link';
// import ViewToggle from './ViewToggle';

// // Define a generic Item type. Adjust this union as needed.
// export type Item = any;

// export interface ItemsSectionProps {
//   items: Item[];
//   viewMode: 'grid' | 'list';
//   setViewMode: (mode: 'grid' | 'list') => void;
//   children?: ReactNode;
//   title?: string;
//   date?: string;
// }

// const ItemsSection: FC<ItemsSectionProps> = ({
//   title = 'Projects',
//   date = 'Dec 12',
//   items,
//   viewMode,
//   setViewMode,
//   children,
// }) => {
//   // Calculate project counts (adjust this logic based on your actual data structure)
//   const inProgress = items.filter(
//     (project) => project.progress.percentage < 100,
//   ).length;
//   const upcoming = items.length - inProgress;
//   const totalProjects = items.length;

//   // Get current date for header
//   const currentDate = new Date().toLocaleDateString('en-US', {
//     month: 'long',
//     day: 'numeric',
//   });

//   // Ref for the container that holds the tab content
//   const tabs = useRef<HTMLDivElement | null>(null);

//   // Adjust the container height to match the height of the active tab content
//   const heightFix = () => {
//     if (tabs.current && tabs.current.children[0]) {
//       // For simplicity, set the container height to the first child's height
//       tabs.current.style.height = `${(tabs.current.children[0] as HTMLElement).offsetHeight}px`;
//     }
//   };

//   useEffect(() => {
//     heightFix();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="projects-section bg-base-50 dark:bg-base-950 rounded-[32px] p-8 md:p-8 sm:p-6 flex flex-col h-full">
//       {/* Projects Header */}
//       <div className="projects-section-header bg-base-50 dark:bg-base-950 sticky top-0 z-10 py-4x">
//         <div className="projects-section-header flex justify-between items-center mb-6 sm:mb-4">
//           <h1 className="h1 text-base-content">{title}</h1>
//           <h4 className="h1 text-base-content">{currentDate}</h4>
//         </div>
//       </div>

//       {/* Projects Status and View Toggle */}
//       <div className="projects-section-line flex flex-col md:flex-row justify-between items-center mb-8">
//         {/* Status Bar */}
//         <div className="projects-status flex space-x-4 mb-4 md:mb-0">
//           <div className="item-status relative flex flex-col items-start">
//             <span className="status-number text-2xl md:text-2xl sm:text-xl font-bold text-base-content">
//               {inProgress}
//             </span>
//             <span className="status-type text-lg md:text-lg sm:text-base text-base-content">
//               In Progress
//             </span>
//           </div>
//           <div className="item-status relative flex flex-col items-start">
//             <span className="status-number text-2xl md:text-2xl sm:text-xl font-bold text-base-content">
//               {upcoming}
//             </span>
//             <span className="status-type text-lg md:text-lg sm:text-base text-base-content">
//               Upcoming
//             </span>
//           </div>
//           <div className="item-status relative flex flex-col items-start">
//             <span className="status-number text-2xl md:text-2xl sm:text-xl font-bold text-base-content">
//               {totalProjects}
//             </span>
//             <span className="status-type text-lg md:text-lg sm:text-base text-base-content">
//               Total Projects
//             </span>
//           </div>
//         </div>

//         {/* View Toggle */}
//         <div className="view-actions">
//           <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
//         </div>
//       </div>

//       {/* Project Boxes */}
//       <div className="flex-1 overflow-y-auto" ref={tabs}>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default ItemsSection;

// src/app/components/Blocks/ItemsSection.tsx
'use client';

import React, { FC, useRef, useEffect, ReactNode } from 'react';
import ViewToggle from '@/components/Blocks/ViewToggle';

export type Item = any; // Adjust as needed

export interface ItemsSectionProps {
  items: Item[];
  viewMode: 'grid' | 'list';
  setViewMode?: (mode: 'grid' | 'list') => void; // Now optional
  children?: ReactNode;
  title?: string;
  date?: string;
}

const ItemsSection: FC<ItemsSectionProps> = ({
  title = 'Projects',
  date = 'Dec 12',
  items,
  viewMode,
  setViewMode,
  children,
}) => {
  // Calculate project counts
  const inProgress = items.filter(
    (project) => project.progress?.percentage < 100,
  ).length;
  const upcoming = items.length - inProgress;
  const totalProjects = items.length;

  // Get current date for header
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  // Ref for container height adjustment if needed.
  const tabs = useRef<HTMLDivElement | null>(null);
  const heightFix = () => {
    if (tabs.current && tabs.current.children[0]) {
      tabs.current.style.height = `${
        (tabs.current.children[0] as HTMLElement).offsetHeight
      }px`;
    }
  };

  useEffect(() => {
    heightFix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="projects-section bg-base-50 dark:bg-base-950 rounded-[32px] p-2 md:p-2 sm:p-1 flex flex-col h-full">
      {/* Projects Header */}
      <div className="projects-section-header bg-base-50 dark:bg-base-950 sticky top-0 z-10 py-4x">
        <div className="projects-section-header flex justify-between items-center mb-6 sm:mb-4">
          <h1 className="h1 text-base-content">{title}</h1>
          <h4 className="h1 text-base-content">{currentDate}</h4>
        </div>
      </div>

      {/* Projects Status and View Toggle */}
      <div className="projects-section-line flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="projects-status flex space-x-4 mb-4 md:mb-0">
          <div className="item-status relative flex flex-col items-start">
            <span className="status-number text-2xl font-bold text-base-content">
              {inProgress}
            </span>
            <span className="status-type text-lg text-base-content">
              In Progress
            </span>
          </div>
          <div className="item-status relative flex flex-col items-start">
            <span className="status-number text-2xl font-bold text-base-content">
              {upcoming}
            </span>
            <span className="status-type text-lg text-base-content">
              Upcoming
            </span>
          </div>
          <div className="item-status relative flex flex-col items-start">
            <span className="status-number text-2xl font-bold text-base-content">
              {totalProjects}
            </span>
            <span className="status-type text-lg text-base-content">
              Total Projects
            </span>
          </div>
        </div>
        <div className="view-actions">
          {/* Only render ViewToggle if setViewMode exists */}
          {setViewMode && (
            <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
          )}
        </div>
      </div>

      {/* Project Boxes */}
      <div className="flex-1 overflow-y-auto" ref={tabs}>
        {children}
      </div>
    </div>
  );
};

export default ItemsSection;
