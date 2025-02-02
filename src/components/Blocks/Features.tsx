'use client';

import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Transition from '@/utils/Transition';

interface FeaturesProps {}

const Features: React.FC<FeaturesProps> = () => {
  // Track active tab (1-indexed)
  const [tab, setTab] = useState<number>(1);

  // Ref for the container holding the tab content
  const tabs = useRef<HTMLDivElement | null>(null);

  // Fix container height to match the active tab's content
  const heightFix = () => {
    if (tabs.current && tabs.current.children[tab - 1]) {
      tabs.current.style.height = `${(tabs.current.children[tab - 1] as HTMLElement).offsetHeight}px`;
    }
  };

  useEffect(() => {
    heightFix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <section className="relative">
      {/* Section background */}
      <div
        className="absolute inset-0 bg-base-100 pointer-events-none mb-16"
        aria-hidden="true"
      />
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-base-200 transform -translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4 text-base-content" data-aos="zoom-y-out">
              Discover Your Intelligent Session Management Platform
            </h1>
            <p className="text-xl text-gray-600">
              Our solution empowers hospitals to efficiently manage service
              users, track admission sessions, and analyze activities across
              wards. Streamline care, optimize resource allocation, and gain
              actionable insights with our comprehensive platform.
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Tabs buttons (left column) */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="mb-8">
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 1
                      ? 'bg-white shadow-md border-gray-200 hover:shadow-lg'
                      : 'bg-gray-200 border-transparent'
                  }`}
                  href="#0"
                  onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-base-content">
                      Manage Service Users
                    </div>
                    <div className="text-gray-600">
                      Easily add, update, and track service users and their
                      admission history.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                    </svg>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 2
                      ? 'bg-white shadow-md border-gray-200 hover:shadow-lg'
                      : 'bg-gray-200 border-transparent'
                  }`}
                  href="#0"
                  onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-base-content">
                      Record Admission Sessions
                    </div>
                    <div className="text-gray-600">
                      Accurately log session start and end times for each
                      service activity.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 3
                      ? 'bg-white shadow-md border-gray-200 hover:shadow-lg'
                      : 'bg-gray-200 border-transparent'
                  }`}
                  href="#0"
                  onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1 text-base-content">
                      Analyze Reports & Insights
                    </div>
                    <div className="text-gray-600">
                      Generate comprehensive reports and gain actionable
                      insights to improve care and operational efficiency.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.334 8.06a.5.5 0 00-.421-.237 6.023 6.023 0 01-5.905-6c0-.41.042-.82.125-1.221a.5.5 0 00-.614-.586 6 6 0 106.832 8.529.5.5 0 00-.017-.485z"
                        fill="#191919"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Tabs items (right column) */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
              data-aos="zoom-y-out"
              ref={tabs}
            >
              <div className="relative flex flex-col text-center lg:text-right">
                {/* Item 1 */}
                <Transition
                  show={tab === 1}
                  appear
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <Image
                      className="md:max-w-none mx-auto rounded"
                      src="/images/features-bg.png"
                      width={500}
                      height={462}
                      alt="Manage Service Users"
                    />
                    <Image
                      className="md:max-w-none absolute w-full left-0 transform animate-float"
                      src="/images/features-element.png"
                      width={500}
                      height={44}
                      alt="Decorative Element"
                      style={{ top: '30%' }}
                    />
                  </div>
                </Transition>
                {/* Item 2 */}
                <Transition
                  show={tab === 2}
                  appear
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <Image
                      className="md:max-w-none mx-auto rounded"
                      src="/images/features-bg.png"
                      width={500}
                      height={462}
                      alt="Record Admission Sessions"
                    />
                    <Image
                      className="md:max-w-none absolute w-full left-0 transform animate-float"
                      src="/images/features-element.png"
                      width={500}
                      height={44}
                      alt="Decorative Element"
                      style={{ top: '30%' }}
                    />
                  </div>
                </Transition>
                {/* Item 3 */}
                <Transition
                  show={tab === 3}
                  appear
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <Image
                      className="md:max-w-none mx-auto rounded"
                      src="/images/features-bg.png"
                      width={500}
                      height={462}
                      alt="Analyze Reports & Insights"
                    />
                    <Image
                      className="md:max-w-none absolute w-full left-0 transform animate-float"
                      src="/images/features-element.png"
                      width={500}
                      height={44}
                      alt="Decorative Element"
                      style={{ top: '30%' }}
                    />
                  </div>
                </Transition>
              </div>
            </div>
          </div>
          {/* Additional Navigation for quick access */}
          <div className="text-center pt-8">
            <h3 className="text-2xl font-bold mb-4 text-base-content">
              Discover More
            </h3>
            <div className="flex justify-center space-x-4">
              <Link
                href="/wards"
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                Wards
              </Link>
              <Link
                href="/activities"
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                Activities
              </Link>
              <Link
                href="/sessions"
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                Sessions
              </Link>
              <Link
                href="/serviceUsers"
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                Service Users
              </Link>
              <Link
                href="/reports"
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
// src/components/Blocks/Features.tsx
