'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _userList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserNewEditForm from '../employee-new-edit-form';
import EmployeeNewEditForm from '../employee-new-edit-form';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function EmployeeEditView({ id }: Props) {
  const settings = useSettingsContext();

  const currentUser = _userList.find((user) => user.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}> 
          <Typography variant='h4' sx={{mb:3}}>
          Sửa Nhân viên
          </Typography>
          

      <EmployeeNewEditForm currentUser={currentUser} />
    </Container>
  );
}
