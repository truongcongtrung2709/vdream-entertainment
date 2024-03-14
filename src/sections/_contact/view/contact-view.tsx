'use client';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { _office, _socials } from 'src/_mock/_others';
import ContactMap from 'src/components/map';
import { Box } from '@mui/material';
// ----------------------------------------------------------------------

export default function ContactView() {
  const { t } = useTranslate();
  return (
    <Container
      sx={{
        pt: { xs: 5, md: 5 },
        pb: { xs: 10, md: 15 },
      }}
    >
      <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
        <Grid xs={12} md={6} lg={4}>
          <Typography
            variant="h2"
            sx={{
              mb: 5,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            {t("Liên hệ")}
          </Typography>

          <Stack spacing={3} justifyContent='center' alignItems={{ xs: 'flex-start' }}>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                <Iconify icon="carbon:email" width={24} sx={{ mr: 1 }} /> Email
              </Stack>

              <Link color="inherit" variant="body2" href="mailto:hello@example.com">
                contact@vdreamentertainment.com
              </Link>
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                <Iconify icon="carbon:mobile" width={24} sx={{ mr: 1 }} />{t("Số điện thoại")}
              </Stack>

              <Typography variant="body2">(+84) 943210566</Typography>
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                <Iconify icon="carbon:location" width={24} sx={{ mr: 1 }} /> {t("Địa chỉ")}
              </Stack>

              <Typography variant="body2">
                16C/65/32 An Dương, Yên Phụ, Tây Hồ, Hà Nội
              </Typography>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed', width: 1 }} />

            <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Typography variant="overline">{t("Mạng xã hội")}</Typography>
              <Stack direction="row">
                {_socials.map((social) => (
                  <IconButton href={social.path} key={social.value} color="inherit">
                    <Iconify icon={social.icon} />
                  </IconButton>
                ))}
              </Stack>
            </Stack>

          </Stack>
        </Grid>

        <Grid xs={12} md={6} lg={7}>
          <ContactMap office={_office} />
        </Grid>
      </Grid>
    </Container>
  );
}
