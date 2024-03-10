import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardHeader } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

import { IItem } from 'src/types/item';
import { addItem, updateItem } from 'src/api/item';
import { mutate } from 'swr';
import { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

type Props = {
  currentItem?: IItem;
};

export default function StoreEditEnForm({ currentItem }: Props) {
  const mdUp = useResponsive('up', 'md');

  const router = useRouter();


  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name_en: Yup.string().required('Bắt buộc phải có tên'),
    price_en: Yup.number().required('Bắt buộc phải có giá'),
    link_youtube: Yup.string().required('Bắt buộc phải có link youtube'),
  });

  const defaultValues = useMemo(
    () => ({
      name_en: currentItem?.name_en || '',
      link_youtube: currentItem?.link_youtube || '',
      price_en: currentItem?.price_en || 0,
    }),
    [currentItem]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentItem) {
      reset(defaultValues);
    }
  }, [currentItem, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    console.log('Submitted Data:', data);
    try {
      const formData = new FormData();
      formData.append('name_en', data.name_en);
      formData.append('price_en', data.price_en as unknown as string);
      formData.append('link_youtube', data.link_youtube);


      // Determine whether to update or add item
      await updateItem(currentItem?.id, formData);
      console.log('Update item with ID:', currentItem?.id);


      // Reset form, refresh item list, show success message, and navigate
      reset();
      mutate(endpoints.item.list);
      enqueueSnackbar('Cập nhật thành công!');
      router.push(paths.dashboard.store.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });





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
            <RHFTextField name="name_en" label="Tên sản phẩm" />

            <RHFTextField name="price_en" label="Giá bán" />



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
          {!currentItem ? 'Tạo nhân viên' : 'Cập nhật'}
        </LoadingButton>
      </Grid>
    </FormProvider>
  );
}
