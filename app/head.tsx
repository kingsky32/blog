import React from 'react';

export default function Head(): React.ReactElement {
  return (
    <>
      <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
