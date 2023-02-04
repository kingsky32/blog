declare global {
  namespace NodeJS {
    interface Global {}
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      SESSION_TOKEN_NAME: string;
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_APP_DESCRIPTION: string;
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_APP_LANG: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      NEXT_PUBLIC_APOLLO_CLIENT_URI: string;
      DATABASE_URL: string;
      REDIS_URL: string;
      UPSTASH_REDIS_URL: string;
      UPSTASH_REDIS_TOKEN: string;
      JWT_SECRET_KEY: string;
      ACCESS_TOKEN_EXPIRES_IN: string;
      REFRESH_TOKEN_EXPIRES_IN: string;
    }
  }
}

export default global;
