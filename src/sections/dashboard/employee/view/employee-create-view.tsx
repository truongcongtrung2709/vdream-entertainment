'use client';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

import EmployeeNewEditForm from '../employee-new-edit-form';

// ----------------------------------------------------------------------

export default function EmployeeCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Thêm Nhân viên
      </Typography>

      <EmployeeNewEditForm />
    </Container>
  );
}
