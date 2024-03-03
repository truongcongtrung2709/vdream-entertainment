'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _userList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { Tab, Tabs, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useCallback, useState } from 'react';
import CollaboratorNewEditViForm from '../collaborator-new-edit-vi-form';
import CollaboratorNewEditEnForm from '../collaborator-new-edit-en-form';

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

type Props = {
  id: string;
};

export default function CollaboratorEditView({ id }: Props) {
  const settings = useSettingsContext();

  const currentUser = _userList.find((user) => user.id === id);

  const [currentTab, setCurrentTab] = useState('vietnamese');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}> 
          <Typography variant='h4' sx={{mb:3}}>
          Sửa Đối tác
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


      {currentTab === 'vietnamese' && <CollaboratorNewEditViForm currentUser={currentUser} />}
      {currentTab === 'english' && <CollaboratorNewEditEnForm  currentUser={currentUser} />}
    </Container>
  );
}
