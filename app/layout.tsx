import '#styles/reset.scss';
import '#styles/global.scss';

import React from 'react';
import { Providers } from '#app/providers';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang={process.env.NEXT_PUBLIC_APP_LANG}>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
