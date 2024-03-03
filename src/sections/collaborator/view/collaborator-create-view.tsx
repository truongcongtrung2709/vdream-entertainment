'use client';

import Container from '@mui/material/Container';


import { useSettingsContext } from 'src/components/settings';
import { Tab, Tabs, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useCallback, useState } from 'react';
import CollaboratorNewEditViForm from '../collaborator-new-edit-vi-form';
import CollaboratorNewEditEnForm from '../collaborator-new-edit-en-form';



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

export default function CollaboratorCreateView() {
  const settings = useSettingsContext();


  const [currentTab, setCurrentTab] = useState('vietnamese');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
       <Typography variant='h4' sx={{mb:3}}>
          Thêm Đối tác
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


      {currentTab === "vietnamese" && <CollaboratorNewEditViForm />}

      {currentTab === "english" && <CollaboratorNewEditEnForm/>}

      
    </Container>
  );
}
