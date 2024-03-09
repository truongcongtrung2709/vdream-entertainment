'use client';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

import EmployeeNewEditForm from '../employee-new-edit-form';
import { useGetEmployee, useGetEmployees } from 'src/api/employee';
import { useEffect, useState } from 'react';
import { IEmployeeItem } from 'src/types/employee';

// ----------------------------------------------------------------------

type Props = {
  id: number;
};

export default function EmployeeEditView({ id }: Props) {
  const settings = useSettingsContext();


  const { employee: currentEmployee } = useGetEmployee(id)


  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Sửa Nhân viên
      </Typography>

      <EmployeeNewEditForm currentEmployee={currentEmployee} />
    </Container>
  );
}
