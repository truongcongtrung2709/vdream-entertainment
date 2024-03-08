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
import { HOST_API } from 'src/config-global';
import { updateIntroduce } from 'src/api/introduce';
import { fetcher } from 'src/utils/axios';
import useSWR, { KeyedMutator } from 'swr';

// ----------------------------------------------------------------------

type Props = {
  introduceData: IIntroduceItem | null
};

export default function IntroductionViForm({ introduceData }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');



  const { enqueueSnackbar } = useSnackbar();

  const preview = useBoolean();


  const NewBlogSchema = Yup.object().shape({
    id: Yup.number().required('Number is required'),
    title_vi: Yup.string().required('Title is required'),
    describe_vi: Yup.string().required('Description is required'),
    image: Yup.mixed<any>().nullable().required('Image is required'),
    title_en: Yup.string().required('Title is required'),
    describe_en: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: introduceData?.id || 1,
      title_vi: introduceData?.title_vi || '',
      describe_vi: introduceData?.describe_vi || '',
      image: introduceData?.image || null,
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
    console.log(introduceData);

    if (introduceData) {
      reset(defaultValues);
    }
  }, [introduceData, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      updateIntroduce(1, data);

      reset();
      preview.onFalse();
      enqueueSnackbar(introduceData ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: `https://vdreamentertainment.com/assets/uploads/images/introduce/${file.name}`,
      });

      if (file) {
        setValue('image', newFile.preview, { shouldValidate: true });
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
            <RHFTextField name="title_vi" label="Tiêu đề" />

            <RHFTextField name="describe_vi" label="Mô tả" multiline rows={3} />

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
          Cập nhât
        </LoadingButton>
      </Grid>
    </FormProvider>
  );
}
