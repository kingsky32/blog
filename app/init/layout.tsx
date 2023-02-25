import React from 'react';
import InitLayout from '#app/init/InitLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <InitLayout>{children}</InitLayout>;
}
