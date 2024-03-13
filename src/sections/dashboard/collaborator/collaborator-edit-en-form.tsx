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

export default function CollaboratorEditEnForm({ currentPartner }: Props) {
  const mdUp = useResponsive('up', 'md');

  const router = useRouter();

  const [imageFile, setImageFile] = useState<File>()

  const { enqueueSnackbar } = useSnackbar();

  const NewPartnerSchema = Yup.object().shape({
    name_en: Yup.string().required('Phải có tên'),
    describe_en: Yup.string().required('Phải có mô tả'),
  });

  const defaultValues = useMemo(
    () => ({
      name_en: currentPartner?.name_en || '',
      describe_en: currentPartner?.describe_en || '',
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
    try {
      const formData = new FormData();
      formData.append('name_en', data.name_en);
      formData.append('describe_en', data.describe_en);


      // Determine whether to update or add item
      await updatePartner(currentPartner?.id, formData);


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
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name_en" label="Tên đối tác" />

            <RHFTextField name="describe_en" label="Mô tả" />

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
