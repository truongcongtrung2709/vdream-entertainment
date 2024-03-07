import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { useAuthContext } from 'src/auth/hooks';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  const { user } = useMockedUser();

  const router = useRouter();

  const { logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar src={user?.photoURL} alt={user?.displayName} sx={{ width: 48, height: 48 }} />

        </Box>

        <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {user?.email}
          </Typography>
        </Stack>

        <Button variant="contained" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Stack>
    </Stack>
  );
}
