'use client';

import React from 'react';
import { useApollo } from '#graphql/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ToastContainer } from 'react-toastify';

export interface ProvidersProps {
  children: React.ReactNode;
  initialApolloState?: any;
  session?: Session | null;
}

export function Providers({
  children,
  initialApolloState,
  session,
}: ProvidersProps): React.ReactElement {
  const apolloClient = useApollo(initialApolloState);
  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus
    >
      <ApolloProvider client={apolloClient}>
        {children}
        <ToastContainer position="bottom-left" />
      </ApolloProvider>
    </SessionProvider>
  );
}
