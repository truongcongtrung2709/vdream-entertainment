import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

import { IIntroduceItem } from 'src/types/introduce';
import { updateIntroduce } from 'src/api/introduce';
import useSWR, { KeyedMutator } from 'swr';
import { fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

type Props = {
  introduceData: IIntroduceItem | null
  refreshIntroduces: KeyedMutator<any>
};

export default function IntroductionEnForm({ introduceData, refreshIntroduces }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');



  const { enqueueSnackbar } = useSnackbar();



  const NewBlogSchema = Yup.object().shape({
    id: Yup.number(),
    title_en: Yup.string().required('Bắt buộc phải có tiêu đề'),
    describe_en: Yup.string().required('Bắt buộc phải có mô tả'),
  });

  const defaultValues = useMemo(
    () => ({
      id: introduceData?.id || 1,
      title_en: introduceData?.title_en || '',
      describe_en: introduceData?.describe_en || '',
    }),
    [introduceData]
  );

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (introduceData) {
      reset(defaultValues);
    }
  }, [introduceData, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append('title_en', data.title_en);
      formData.append('describe_en', data.describe_en);

      await updateIntroduce(1, formData);

      enqueueSnackbar(introduceData ? 'Cập nhật thành công!' : 'Tạo thành công!');
      refreshIntroduces();
      router.push(paths.dashboard.root);
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
            Giới thiệu
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Tiêu đề, mô tả
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="title_en" label="Tiêu đề" />

            <RHFTextField name="describe_en" label="Mô tả" multiline rows={3} />

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
          Cập nhât
        </LoadingButton>
      </Grid>
    </FormProvider>
  );
}
