'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { QueryClientProvider, QueryClient } from 'react-query';

export interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

const queryClient = new QueryClient();

export function Providers({
  children,
  session,
}: ProvidersProps): React.ReactElement {
  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
