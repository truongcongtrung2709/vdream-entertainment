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
import { HEADER } from 'src/layouts/config-layout';
import { Button, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { useRef } from 'react';
import { useBoundingClientRect } from 'src/hooks/use-bounding-client-rect';

// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();

  const { introduces } = useGetIntroduces()

  const langStorage = localStorageGetItem('i18nextLng');

  const mdUp = useResponsive('up', 'md');

  const introduceData = introduces.length > 0 ? introduces[0] : null;

  const containerRef = useRef<HTMLDivElement>(null);

  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container?.left;

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_1.jpg',
        }),
        position: 'relative',
        height: "100vh",
      }}
    >
      <Container sx={{ height: 1 }}>
        <Grid container columnSpacing={3} alignItems="center" sx={{ height: 1 }}>
          <Grid xs={12} md={5}>
            <Stack
              spacing={5}
              justifyContent="center"
              alignItems={{ xs: 'center', md: 'flex-start' }}
              sx={{
                py: 15,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h1">
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




            </Stack>
          </Grid>

          <Grid xs={12} md={7}>
            <Box ref={containerRef} />
          </Grid>
        </Grid>
      </Container>

      {mdUp && (
        <Box
          sx={{
            maxWidth: 1280,
            position: 'absolute',
            bottom: { md: '20%', lg: 40 },
            right: { md: -110 },
            width: { md: `calc(100% - ${offsetLeft}px)`, xl: "50%" },
          }}
        >
          <Image
            visibleByDefault
            disabledEffect
            alt="home hero"
            src={`https://vdreamentertainment.com/${introduceData?.image}`}
          />
        </Box>
      )}
    </Box>
  );
}
