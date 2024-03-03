'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function HomeView() {
  const router = useRouter();
  useEffect(()=>{
    router.push(paths.dashboard.root)

  })
  return (
    <>
    </>
  );
}
