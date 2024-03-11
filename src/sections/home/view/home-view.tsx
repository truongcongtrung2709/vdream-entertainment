'use client';


import { useGetEmployees } from 'src/api/employee';

import HomeHero from '../home-hero';
import HomeTeam from '../home-team';
import HomeAbout from '../home-about';
import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { employees } = useGetEmployees();

  return (
    <MainLayout>

      <HomeHero />

      <HomeAbout />

      <HomeTeam members={employees} />

    </MainLayout>

  );
}
