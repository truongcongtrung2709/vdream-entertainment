'use client';

import React from 'react';

import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';

import StoreNewForm from '../store-new-form';


// ----------------------------------------------------------------------

export default function StoreCreateView() {
  const settings = useSettingsContext();



  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Thêm Sản phẩm
      </Typography>

      <StoreNewForm />

    </Container>
  );
}
