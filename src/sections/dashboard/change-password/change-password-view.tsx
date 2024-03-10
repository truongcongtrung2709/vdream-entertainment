'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Container, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { useState } from 'react';





// ----------------------------------------------------------------------


export default function ChangePasswordView() {
  const settings = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const ChangePassWordSchema = Yup.object().shape({
    password: Yup.string().required('Bắt buộc phải có mật khẩu cũ'),
    password_new: Yup.string()
      .required('Bắt buộc phải có mật khẩu mới')
      .test(
        'Không khớp',
        'Mật khẩu mới phải khác mật khẩu cũ',
        (value, { parent }) => value !== parent.oldPassword
      ),
    password_confirmation: Yup.string().oneOf([Yup.ref('password_new')], 'Mật khẩu phải khớp'),
  });

  const defaultValues = {
    password: '',
    password_new: '',
    password_confirmation: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axiosInstance.post(endpoints.auth.changePassword, data);
      reset();
      enqueueSnackbar('Cập nhật thành công');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrorMsg(typeof error.response.data === 'string' ? error.response.data : "Mật khẩu không đúng");
      } else {
        setErrorMsg("An error occurred while updating the password.");
      }
    }
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Đổi mật khẩu
      </Typography>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack component={Card} spacing={3} sx={{ p: 3 }}>
          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          <RHFTextField
            name="password"
            type={password.value ? 'text' : 'password'}
            label="Mật khẩu cũ"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="password_new"
            label="Mật khẩu mới"
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="password_confirmation"
            type={password.value ? 'text' : 'password'}
            label="Xác nhận lại"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ ml: 'auto' }}
          >
            Cập nhật
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}
