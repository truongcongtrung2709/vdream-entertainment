'use client';

import React, { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import IntroductionViForm from '../introduction-vi-form';
import IntroductionEnForm from '../introduction-en-form';
import { useGetIntroduces } from 'src/api/introduce';

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

export default function IntroductionView() {
  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('vietnamese');

  const { introduces } = useGetIntroduces()
  const introduceData = introduces.length > 0 ? introduces[0] : null;

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Talents_Giới Thiệu
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

      {currentTab === 'vietnamese' && <IntroductionViForm introduceData={introduceData} />}

      {currentTab === 'english' && <IntroductionEnForm introduceData={introduceData} />}
    </Container>
  );
}
