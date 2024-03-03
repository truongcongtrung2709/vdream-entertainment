'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import EmployeeNewEditForm from '../store-new-edit-vi-form';
import { Tab, Tabs, Typography } from '@mui/material';
import StoreNewEditForm from '../store-new-edit-vi-form';
import { useCallback, useState } from 'react';
import Iconify from 'src/components/iconify';
import StoreNewEditViForm from '../store-new-edit-vi-form';
import StoreNewEditEnForm from '../store-new-edit-en-form';
import { useGetProduct } from 'src/api/product';

type Props = {
  id: string;
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

export default function StoreEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { product: currentProduct } = useGetProduct(id);

  const [currentTab, setCurrentTab] = useState('vietnamese');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
       <Typography variant='h4' sx={{mb:3}}>
          Sửa Sản phẩm
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

          {currentTab === "vietnamese" && <StoreNewEditViForm currentProduct={currentProduct} />}

          {currentTab === "english" && <StoreNewEditEnForm currentProduct={currentProduct}/>}
      
    </Container>
  );
}
