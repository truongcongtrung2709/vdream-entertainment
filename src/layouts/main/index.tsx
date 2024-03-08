import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';

import Header from './header';
import Footer from './footer';
import { HEADER } from '../config-layout';

// ----------------------------------------------------------------------

const pathsOnDark = ['/career', '/travel'];

const spacingLayout = [...pathsOnDark, '/', '/e-learning', '/marketing'];

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const actionPage = (arr: string[]) =>
    arr.some((path) => pathname === path || pathname === `${path}/`);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header headerOnDark={actionPage(pathsOnDark)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {!actionPage(spacingLayout) && <Spacing />}

        {children}
      </Box>

      <Footer />
    </Box>
  );
}

// ----------------------------------------------------------------------

function Spacing() {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_DESKTOP },
      }}
    />
  );
}
