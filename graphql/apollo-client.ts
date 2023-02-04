import React from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient<NormalizedCacheObject>({
    uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI,
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI}/api/graphql`,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
}

export function initApolloClient(
  initialState: NormalizedCacheObject | null = null,
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient: ApolloClient<NormalizedCacheObject> =
    apolloClient ?? createApolloClient();

  if (initialState) {
    const extract: NormalizedCacheObject = _apolloClient.extract();
    _apolloClient.cache.restore({ ...initialState, ...extract });
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(
  initialState: NormalizedCacheObject | null = null,
): ApolloClient<NormalizedCacheObject> {
  return React.useMemo(() => initApolloClient(initialState), [initialState]);
}

export default apolloClient;
