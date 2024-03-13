/* eslint-disable react/display-name */
import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Box
        component="img"
        src="/logo/logo_full.png"
        sx={{ width: 133, cursor: 'pointer', ml: 3, my: 3 }}
      />
    );


    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href={paths.dashboard.root} sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
