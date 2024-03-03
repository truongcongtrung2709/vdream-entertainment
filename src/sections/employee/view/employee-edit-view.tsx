'use client';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { _userList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import EmployeeNewEditForm from '../employee-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function EmployeeEditView({ id }: Props) {
  const settings = useSettingsContext();

  const currentUser = _userList.find((user) => user.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Sửa Nhân viên
      </Typography>

      <EmployeeNewEditForm currentUser={currentUser} />
    </Container>
  );
}
