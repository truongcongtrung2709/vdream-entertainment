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
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

type Props = {
  currentItem?: IItem;
};

export default function StoreEditViForm({ currentItem }: Props) {
  const mdUp = useResponsive('up', 'md');

  const router = useRouter();

  const [imageFile, setImageFile] = useState<File>()

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name_vi: Yup.string().required('Bắt buộc phải có tên'),
    image: Yup.mixed<any>().nullable().required('Bắt buộc phải có hình'),
    price_vi: Yup.number().required('Bắt buộc phải có giá'),
    link_youtube: Yup.string()
      .matches(
        /^https:\/\/www\.youtube\.com\//,
        'Link youtube phải bắt đầu bằng https://www.youtube.com/'
      )
      .required('Bắt buộc phải có link youtube'),
  });

  const defaultValues = useMemo(
    () => ({
      name_vi: currentItem?.name_vi || '',
      image: currentItem?.image ? `${HOST_API}/${currentItem?.image}` : null || null,
      link_youtube: currentItem?.link_youtube || 'https://www.youtube.com/',
      price_vi: currentItem?.price_vi || 0,
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
    try {
      const formData = new FormData();
      formData.append('name_vi', data.name_vi);
      formData.append('price_vi', data.price_vi as unknown as string);
      formData.append('link_youtube', data.link_youtube);

      // Append image to formData if imageFile exists or if currentItem has an image
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (currentItem && currentItem.image) {
        formData.append('image', currentItem.image);
      }

      // Determine whether to update or add item
      await updateItem(currentItem?.id, formData);


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

  const handleRemoveFile = useCallback(() => {
    setValue('image', null);
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
            <RHFTextField name="name_vi" label="Tên sản phẩm" />

            <RHFTextField name="price_vi" label="Giá bán" />

            <RHFTextField helperText="Link youtube phải bao gồm https://www.youtube.com/" name="link_youtube" label="Link youtube" />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Hình ảnh</Typography>
              <RHFUpload
                name="image"
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
          {!currentItem ? 'Tạo nhân viên' : 'Cập nhật'}
        </LoadingButton>
      </Grid>
    </FormProvider>
  );
}
