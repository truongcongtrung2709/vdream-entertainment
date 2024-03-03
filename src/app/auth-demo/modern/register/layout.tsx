'use client';

import React from 'react';

import AuthModernLayout from 'src/layouts/auth/modern';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AuthModernLayout>{children}</AuthModernLayout>;
}
