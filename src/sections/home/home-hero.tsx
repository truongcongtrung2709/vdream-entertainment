import { Box, Container, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import { localStorageGetItem } from 'src/utils/storage-available';
import { bgGradient } from 'src/theme/css';
import { useGetIntroduces } from 'src/api/introduce';
import Image from 'src/components/image';
import HomeDetailsDescription from './home-details-description';

export default function HomeHero() {
  const theme = useTheme();
  const { introduces } = useGetIntroduces();
  const langStorage = localStorageGetItem('i18nextLng');
  const mdUp = useResponsive('up', 'md');
  const introduceData = introduces.length > 0 ? introduces[0] : null;

  if (!introduceData) {
    return null;
  }

  const isTitleTooLong = langStorage === 'vi' ? (introduceData.title_vi.length > 50) : (introduceData.title_en.length > 50);
  const isDescriptionTooLong = langStorage === 'vi' ? (introduceData.describe_vi.length > 500) : (introduceData.describe_en.length > 500);

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_1.jpg',
        }),
      }}
    >
      <Container sx={{ py: 15, display: { md: 'flex' }, alignItems: { md: 'center' } }}>
        <Grid container columnSpacing={{ xs: 0, md: 10 }}>
          {(!mdUp || (mdUp && isTitleTooLong && isDescriptionTooLong)) && (
            <Grid item xs={12} lg={7}>
              <Image
                visibleByDefault
                disabledEffect
                alt="marketing market"
                src={`https://vdreamentertainment.com/${introduceData.image}`}
              />
            </Grid>
          )}

          <Grid
            item
            xs={12}
            md={6}
            lg={5}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
            order={!mdUp && (isTitleTooLong || isDescriptionTooLong) ? 2 : 1}
          >
            <Typography variant="h1" sx={{ my: 3 }}>
              {langStorage === 'vi' ? introduceData.title_vi : introduceData.title_en}
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              <HomeDetailsDescription description={langStorage === 'vi' ? introduceData.describe_vi : introduceData.describe_en} />
            </Typography>
          </Grid>

          {mdUp && !isTitleTooLong && !isDescriptionTooLong && (
            <Grid item xs={12} md={6} lg={7}>
              <Image
                visibleByDefault
                disabledEffect
                alt="marketing market"
                src={`https://vdreamentertainment.com/${introduceData.image}`}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
