'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import EmployeeNewEditForm from '../employee-new-edit-form';
import { Typography } from '@mui/material';


// ----------------------------------------------------------------------

export default function EmployeeCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
       <Typography variant='h4' sx={{mb:3}}>
          Thêm Nhân viên
        </Typography>

      <EmployeeNewEditForm />
    </Container>
  );
}
