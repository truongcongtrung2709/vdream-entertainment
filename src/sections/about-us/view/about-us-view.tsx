'use client';

import React, { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import About from '../about-us-vi-form';
import IntroductionEnForm from '../about-us-en-form';
import { useGetAbouts } from 'src/api/about';
import AboutViForm from '../about-us-vi-form';
import AboutEnForm from '../about-us-en-form';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'vietnamese',
    label: 'Tiếng Việt',
    icon: <Iconify icon="openmoji:flag-vietnam" width={24} />,
  },
  {
    value: 'english',
    label: 'Tiếng Anh',
    icon: <Iconify icon="emojione-v1:flag-for-united-kingdom" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function AboutUsView() {
  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('vietnamese');

  const { abouts, refreshAbouts } = useGetAbouts()

  const aboutData = abouts.length > 0 ? abouts[0] : null;

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Talents_Về chúng tôi
      </Typography>

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {currentTab === 'vietnamese' && <AboutViForm aboutData={aboutData} refreshAbouts={refreshAbouts} />}

      {currentTab === 'english' && <AboutEnForm aboutData={aboutData} refreshAbouts={refreshAbouts} />}
    </Container>
  );
}
