'use client';
import React, { ReactNode, useEffect, Suspense } from 'react';
import { ThemeProvider } from 'next-themes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { IS_DEVELOPMENT } from '@/config/constants';
import { Loading } from '@/components/loading';
import ToastProvider from '@/providers/ToastProvider';

type AppProviderProps = {
  children: ReactNode;
  theme?: string;
};

export const AppProvider = ({ children, theme }: AppProviderProps) => {
  // Initialize the Zustand store with default settings when the App component mounts
  // useInitializeStore();

  return (
    <>
    {/* <ThemeProvider attribute="class" forcedTheme={theme || undefined}> */}
      
        {/* <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light"> */}
        <QueryClientProvider client={queryClient}>
          {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
            <Suspense fallback={<Loading />}>{children}</Suspense>

        {/* <Overlay /> */}
        {/* <PageMode />
        <PromptDialog />
        <Dialog />
        <DrawerMenu /> */}

        <ToastProvider />
        </QueryClientProvider>
        {/* <ConfettiEffect /> */}
    {/* </ThemeProvider> */}
    </>
  );
};
// Path: src/providers/app.tsx
