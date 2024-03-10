import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Box, CardHeader } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { fData } from 'src/utils/format-number';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFUpload, RHFUploadAvatar } from 'src/components/hook-form';

import { IEmployeeItem } from 'src/types/employee';
import { addEmployee, updateEmployee } from 'src/api/employee';
import { mutate } from 'swr';
import { endpoints } from 'src/utils/axios';
import { width } from '@mui/system';

// ----------------------------------------------------------------------

type Props = {
  currentEmployee?: IEmployeeItem;
};

export default function EmployeeNewEditForm({ currentEmployee }: Props) {
  const mdUp = useResponsive('up', 'md');

  const router = useRouter();

  const [imageFile, setImageFile] = useState<File>()

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required('Hãy điền tên'),
    last_name: Yup.string().required('Hãy điền họ'),
    image: Yup.mixed<any>().nullable().required('Phải có hình'),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: currentEmployee?.first_name || '',
      last_name: currentEmployee?.last_name || '',
      image: `https://vdreamentertainment.com/${currentEmployee?.image}` || null,
    }),
    [currentEmployee]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {

    if (currentEmployee) {
      console.log(currentEmployee);

      reset(defaultValues);
    }
  }, [currentEmployee, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    console.log('Submitted Data:', data);
    try {
      const formData = new FormData();
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);

      // Append image to formData if imageFile exists or if currentEmployee has an image
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (currentEmployee && currentEmployee.image) {
        formData.append('image', currentEmployee.image);
      }

      // Determine whether to update or add employee
      if (currentEmployee) {
        await updateEmployee(currentEmployee.id, formData);
        console.log('Update employee with ID:', currentEmployee.id);
      } else {
        console.log('Creating new user:', data);
        await addEmployee(formData);
      }

      // Reset form, refresh employee list, show success message, and navigate
      reset();
      mutate(endpoints.employee.list);
      enqueueSnackbar(currentEmployee ? 'Cập nhật thành công!' : 'Thêm thành công!');
      router.push(paths.dashboard.employee.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setImageFile(file);

        const fileUrl = URL.createObjectURL(file);
        setValue('image', fileUrl, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Chi tiết
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            họ tên, avatar
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="first_name" label="Tên" />
            <RHFTextField name="last_name" label="Họ" />
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Hình đại diện</Typography>
              <Box sx={{ mb: 5 }}>
                <RHFUploadAvatar
                  name="image"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      Chấp nhận *.jpeg, *.jpg, *.png, *.gif
                      <br /> dung lượng tối đa {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent="flex-end">
        {renderDetails}

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ mr: 2 }}
        >
          {!currentEmployee ? 'Tạo nhân viên' : 'Cập nhật'}
        </LoadingButton>
      </Grid>
    </FormProvider>
  );
}
