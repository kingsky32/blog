import React from 'react';
import { signIn as authSignIn } from 'next-auth/react';
import {
  BuiltInProviderType,
  RedirectableProviderType,
} from 'next-auth/providers';
import {
  LiteralUnion,
  SignInAuthorizationParams,
  SignInOptions,
} from 'next-auth/react/types';

function useSignIn() {
  const [loading, setLoading] = React.useState(false);
  async function signIn<
    P extends RedirectableProviderType | undefined = undefined,
  >(
    provider?: LiteralUnion<
      P extends RedirectableProviderType
        ? P | BuiltInProviderType
        : BuiltInProviderType
    >,
    options?: SignInOptions,
    authorizationParams?: SignInAuthorizationParams,
  ) {
    setLoading(true);
    return authSignIn(provider, options, authorizationParams).finally(() => {
      setLoading(false);
    });
  }
  return { loading, signIn };
}

export default useSignIn;
