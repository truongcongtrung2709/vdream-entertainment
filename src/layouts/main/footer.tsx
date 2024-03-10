import Link from '@mui/material/Link';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useTranslate } from 'src/locales';

import Logo from 'src/components/logo-main';
import Iconify from 'src/components/iconify';

import { NavSubListProps } from './nav/types';
import { pageLinks } from './config-navigation';
import { _socials } from 'src/_mock/_others';

// ----------------------------------------------------------------------

export default function Footer() {
  const mdUp = useResponsive('up', 'md');

  const { t } = useTranslate();

  const desktopList = pageLinks.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  const mainFooter = (
    <>
      <Divider />

      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={5}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Logo />

              <Stack spacing={1} alignItems="flex-start">
                <Typography variant="h6">V-Dream Entertainment Company Limited</Typography>
                <Link href='tel:+84943210566' variant="body2" sx={{ color: 'text.primary' }}>
                  {`${t("Điện thoại")}: (+84) 943210566`}
                </Link>
                <Link variant="body2" href='mailto:contact@vdreamentertainment.com?subject=Subject%20Here&body=Body%20Text%20Here' sx={{ color: 'text.primary' }}>
                  Email: contact@vdreamentertainment.com
                </Link>

                <Link variant="body2" sx={{ color: 'text.primary' }}>
                  {`${t("Địa chỉ")}: 16C/65/32 An Duong, Yen Phu, Tay Ho, Hanoi`}
                </Link>
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            {mdUp ? (
              <Masonry columns={4} spacing={2} defaultColumns={4} defaultSpacing={2}>
                {desktopList.map((list: any) => (
                  <ListDesktop key={list.subheader} list={list} />
                ))}
              </Masonry>
            ) : (
              <Stack spacing={1.5}>
                {desktopList.map((list: any) => (
                  <ListMobile key={list.subheader} list={list} />
                ))}
              </Stack>
            )}
          </Grid>
          <Grid xs={12} md={2}>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Typography variant="h6">{t("Mạng xã hội")}</Typography>
              <Stack direction="row" alignItems="center">
                {_socials.map((social) => (
                  <IconButton href={social.path} key={social.value} color="primary">
                    <Iconify icon={social.icon} />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © 2024. All rights reserved
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Help Center
            </Typography>

            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Terms of Service
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return <footer>{mainFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }: { list: NavSubListProps }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle2">{list.subheader}</Typography>

      {list.items?.map((link) => {
        const active = pathname === link.path || pathname === `${link.path}/`;

        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="caption"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
              ...(active && {
                color: 'text.primary',
                fontWeight: 'fontWeightSemiBold',
              }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function ListMobile({ list }: { list: NavSubListProps }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={listExpand.value ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

// ----------------------------------------------------------------------
