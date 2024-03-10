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

import { mutate } from 'swr';
import { endpoints } from 'src/utils/axios';
import { IPartnerItem } from 'src/types/partner';
import { updatePartner } from 'src/api/partner';

// ----------------------------------------------------------------------

type Props = {
  currentPartner?: IPartnerItem;
};

export default function CollaboratorEditViForm({ currentPartner }: Props) {
  const mdUp = useResponsive('up', 'md');

  const router = useRouter();

  const [imageFile, setImageFile] = useState<File>()

  const { enqueueSnackbar } = useSnackbar();

  const NewPartnerSchema = Yup.object().shape({
    name_vi: Yup.string().required('Phải có tên'),
    image: Yup.mixed<any>().nullable().required('Phải có hình'),
    describe_vi: Yup.string().required('Phải có mô tả'),
  });

  const defaultValues = useMemo(
    () => ({
      name_vi: currentPartner?.name_vi || '',
      image: `https://vdreamentertainment.com/${currentPartner?.image}` || '',
      describe_vi: currentPartner?.describe_vi || '',
    }),
    [currentPartner]
  );

  const methods = useForm({
    resolver: yupResolver(NewPartnerSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentPartner) {
      reset(defaultValues);
    }
  }, [currentPartner, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    console.log('Submitted Data:', data);
    try {
      const formData = new FormData();
      formData.append('name_vi', data.name_vi);
      formData.append('describe_vi', data.describe_vi);

      // Append image to formData if imageFile exists or if currentPartner has an image
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (currentPartner && currentPartner.image) {
        formData.append('image', currentPartner.image);
      }

      // Determine whether to update or add item
      await updatePartner(currentPartner?.id, formData);
      console.log('Update item with ID:', currentPartner?.id);


      // Reset form, refresh item list, show success message, and navigate
      reset();
      mutate(endpoints.item.list);
      enqueueSnackbar('Cập nhật thành công!');
      router.push(paths.dashboard.collaborator.root);
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
            tên Đối tác, mô tả,...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Chi tiết" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name_vi" label="Tên đối tác" />

            <RHFTextField name="describe_vi" label="Mô tả" />

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
          {!currentPartner ? 'Tạo nhân viên' : 'Cập nhật'}
        </LoadingButton>
      </Grid>
    </FormProvider>
  );
}
