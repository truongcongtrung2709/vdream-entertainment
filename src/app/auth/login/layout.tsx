'use client';

import React from 'react';

import { GuestGuard } from 'src/auth/guard';
import AuthBackgroundLayout from 'src/layouts/auth/background';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthBackgroundLayout>{children}</AuthBackgroundLayout>
    </GuestGuard>
  );
}
