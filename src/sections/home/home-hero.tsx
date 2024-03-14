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

// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();

  const { introduces } = useGetIntroduces()

  const langStorage = localStorageGetItem('i18nextLng');

  const mdUp = useResponsive('up', 'md');


  const introduceData = introduces.length > 0 ? introduces[0] : null;

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
          height: { md: `100vh` },
        }}
      >
        <Grid container columnSpacing={{ xs: 0, md: 10 }}>
          <Grid
            xs={12}
            md={6}
            lg={5}
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >

            <Typography variant="h1" sx={{ my: 3 }}>
              {langStorage === "vi" ?
                introduceData?.title_vi
                :
                introduceData?.title_en
              }
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              {langStorage === "vi" ?
                introduceData?.describe_vi
                :
                introduceData?.describe_en
              }
            </Typography>
          </Grid>

          {mdUp && (
            <Grid xs={12} md={6} lg={7}>
              <Image
                visibleByDefault
                disabledEffect
                alt="marketing market"
                src={`https://vdreamentertainment.com/${introduceData?.image}`}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
