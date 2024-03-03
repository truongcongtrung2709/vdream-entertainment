import * as Yup from 'yup';
import { useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';


import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
} from 'src/components/hook-form';

import { useResponsive } from 'src/hooks/use-responsive';
import { CardHeader } from '@mui/material';
import { IProductItem } from 'src/types/product';

// ----------------------------------------------------------------------

type Props = {
  currentProduct?: IProductItem;
};

export default function StoreNewEditEnForm({ currentProduct }: Props) {
  const mdUp = useResponsive('up', 'md');

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    coverUrl: Yup.mixed<any>().nullable().required('Cover Url is required'),
    price: Yup.number().required('Price is required'),
    youtubeLink: Yup.string().required('Youtube Link is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      coverUrl: currentProduct?.coverUrl || null,
      youtubeLink: currentProduct?.youtubeLink || '',
      price: currentProduct?.price || 0,
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentProduct ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.store.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('coverUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Chi tiết
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            tên sản phẩm, giá bán
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
        {!mdUp && <CardHeader title="Details" />}

<Stack spacing={3} sx={{ p: 3 }}>
  <RHFTextField name="name" label="Tên sản phẩm" />

  <RHFTextField name="price" label="Giá bán" />

  <RHFTextField name="youtubeLink" label="Link youtube" />

  <Stack spacing={1.5}>
    <Typography variant="subtitle2">Hình ảnh</Typography>
    <RHFUpload
      name="coverUrl"
      maxSize={3145728}
      onDrop={handleDrop}
      onDelete={handleRemoveFile}
    />
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
          {!currentProduct ? 'Tạo nhân viên' : 'Cập nhật'}
        </LoadingButton>
      </Grid>

      
    </FormProvider>
  );
}
