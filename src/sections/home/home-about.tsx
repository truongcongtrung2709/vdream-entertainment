import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { localStorageGetItem } from 'src/utils/storage-available';

import { useTranslate } from 'src/locales';

import Image from 'src/components/image';
import { useGetAbouts } from 'src/api/about';
import HomeDetailsDescription from './home-details-description';
import { HOST_API } from 'src/config-global';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function HomeAbout() {
  const { t } = useTranslate()

  const langStorage = localStorageGetItem('i18nextLng');

  const { abouts } = useGetAbouts();
  const aboutsData = abouts.length > 0 ? abouts[0] : null;

  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Grid
        xs={12}
        md={5}
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          mb: '40px',
        }}
      >
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          {t("Về chúng tôi")}
        </Typography>

        <Typography variant="h2" sx={{ my: 3 }}>
          {langStorage === "vi" ?
            aboutsData?.title_vi
            :
            aboutsData?.title_en
          }
        </Typography>

        <Box sx={{ color: 'text.secondary' }}>
          {langStorage === "vi" ?
            <HomeDetailsDescription description={aboutsData?.describe_vi} />
            :
            <HomeDetailsDescription description={aboutsData?.describe_en} />
          }
        </Box>
      </Grid>
      {!aboutsData?.image ?
        <></> :
        (
          <Image
            alt="landing about"
            src={`${HOST_API}/${aboutsData?.image}`}
            ratio="16/9"
            sx={{
              borderRadius: 1.5,
            }}
          />
        )}

    </Container>
  );
}
