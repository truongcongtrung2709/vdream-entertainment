import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { localStorageGetItem } from 'src/utils/storage-available';

import { bgGradient } from 'src/theme/css';
import { useGetIntroduces } from 'src/api/introduce';

import Image from 'src/components/image';
import { Stack } from '@mui/material';
import { useRef } from 'react';
import { useBoundingClientRect } from 'src/hooks/use-bounding-client-rect';
import HomeDetailsDescription from './home-details-description';
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();

  const { introduces } = useGetIntroduces()

  const langStorage = localStorageGetItem('i18nextLng');

  const mdUp = useResponsive('up', 'md');


  const introduceData = introduces.length > 0 ? introduces[0] : null;

  if (!introduceData) {
    return null;
  }
  const isTitleTooLong = langStorage === 'vi' ? (introduceData?.title_vi.length > 50) : (introduceData?.title_en.length > 50);
  const isDescriptionTooLong = langStorage === 'vi' ? (introduceData?.describe_vi.length > 500) : (introduceData?.describe_en.length > 500);
  const displayImage = isTitleTooLong || isDescriptionTooLong;

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_1.jpg',
        }),
      }}
    >
      <Container
        sx={{
          py: 15,
          display: { md: 'flex' },
          alignItems: { md: 'center' },
        }}
      >
        <Grid container columnSpacing={{ xs: 0, md: 10 }}>
          {displayImage && (
            <Grid xs={12}>
              <Image
                width="100%"
                visibleByDefault
                disabledEffect
                alt="marketing market"
                src={`${HOST_API}/${introduceData?.image}`}
              />
            </Grid>
          )}
          <Grid
            xs={12}
            md={displayImage ? 12 : 6}
            lg={displayImage ? 12 : 5}

          >
            <Typography variant="h1" sx={{ my: 3, textAlign: displayImage ? "center" : "left" }}>
              {langStorage === 'vi' ? introduceData?.title_vi : introduceData?.title_en}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {langStorage === 'vi' ? (
                <HomeDetailsDescription description={introduceData?.describe_vi} />
              ) : (
                <HomeDetailsDescription description={introduceData?.describe_en} />
              )}
            </Typography>
          </Grid>
          {mdUp && !displayImage && (
            <Grid xs={12} md={6} lg={7}>
              <Image
                visibleByDefault
                disabledEffect
                alt="marketing market"
                src={`${HOST_API}/${introduceData?.image}`}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
