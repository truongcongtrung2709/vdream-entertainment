import { forwardRef } from 'react';

import { Box } from '@mui/material';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { RouterLink } from 'src/routes/components';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

import { NavItemProps, NavItemStateProps } from '../types';

// ----------------------------------------------------------------------

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ title, path, open, active, subItem, hasChild, externalLink, ...other }, ref) => {
    const renderContent = (
      <Box sx={{ mt: 2 }}>
        <StyledNavItem
          disableRipple
          disableTouchRipple
          ref={ref}
          open={open}
          active={active}
          subItem={subItem}
          {...other}
        >
          {title}

          {hasChild && <Iconify width={16} icon="carbon:chevron-down" sx={{ ml: 0.75 }} />}
        </StyledNavItem>
      </Box>
    );

    if (hasChild) {
      return renderContent;
    }

    if (externalLink) {
      return (
        <Link href={path} target="_blank" rel="noopener" color="inherit" underline="none">
          {renderContent}
        </Link>
      );
    }

    return (
      <Link component={RouterLink} href={path} color="inherit" underline="none">
        {renderContent}
      </Link>
    );
  }
);

export default NavItem;

// ----------------------------------------------------------------------

const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'subItem',
})<NavItemStateProps>(({ active, open, subItem, theme }) => {
  const opened = open && !active;

  return {
    // Root item
    ...(!subItem && {
      ...theme.typography.body1,
      fontSize: 15,
      padding: 3,
      fontWeight: theme.typography.fontWeightSemiBold,
      fontFamily: theme.typography.fontSecondaryFamily,
      transition: theme.transitions.create(['all']),
      '&:hover': {
        color: theme.palette.common.white,
        ...bgGradient({
          startColor: `${theme.palette.primary.main}`,
          endColor: `${theme.palette.secondary.main}`,
        }),
        borderRadius: '16px',
        paddingRight: '12px',
        paddingLeft: '12px',
      },
      ...(active && {
        color: theme.palette.common.white,
        ...bgGradient({
          startColor: `${theme.palette.primary.main}`,
          endColor: `${theme.palette.secondary.main}`,
        }),
        borderRadius: '16px',
        paddingRight: '12px',
        paddingLeft: '12px',
      }),
    }),

    // Sub item
    ...(subItem && {
      ...theme.typography.body2,
      padding: 0,
      fontSize: 13,
      color: theme.palette.text.secondary,
      '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
        borderRadius: '16px',
      },
      ...(active && {
        color: theme.palette.common.white,
        ...bgGradient({
          startColor: `${theme.palette.primary.main}`,
          endColor: `${theme.palette.secondary.main}`,
        }),
        borderRadius: '16px',
      }),
    }),

    // Open
    ...(opened && {
      color: theme.palette.common.white,
      ...bgGradient({
        startColor: `${theme.palette.primary.main}`,
        endColor: `${theme.palette.secondary.main}`,
      }),
    }),
  };
});
