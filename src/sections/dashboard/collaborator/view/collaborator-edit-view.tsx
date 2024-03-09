'use client';

import React, { useState, useCallback } from 'react';

import Container from '@mui/material/Container';
import { Tab, Tabs, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import { useGetPartner } from 'src/api/partner';
import CollaboratorEditViForm from '../collaborator-edit-vi-form';
import CollaboratorEditEnForm from '../collaborator-edit-en-form';

type Props = {
  id: number;
};

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

export default function CollaboratorEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { partner: currentPartner } = useGetPartner(id);


  const [currentTab, setCurrentTab] = useState('vietnamese');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Sửa Đối Tác
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

      {currentTab === 'vietnamese' && <CollaboratorEditViForm currentPartner={currentPartner} />}

      {currentTab === 'english' && <CollaboratorEditEnForm currentPartner={currentPartner} />}
    </Container>
  );
}
