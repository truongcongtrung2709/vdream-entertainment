import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales'

import { IEmployeeItem } from 'src/types/employee';

import HomeTeamItem from './home-team-item';

// ----------------------------------------------------------------------

type Props = {
  members: IEmployeeItem[];
};

export default function HomeTeam({ members }: Props) {
  const { t } = useTranslate()

  return (
    <Container
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          mb: '40px',
          scrollSnapAlign: 'center',
        }}
      >
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          {t("Đội ngũ")}
        </Typography>

        <Typography variant="h2" sx={{ my: 3, width: { md: 500 } }}>
          {t("Đội ngủ trẻ trung, tài năng và nhiệt quyết")}
        </Typography>
      </Grid>

      <Box
        sx={{
          columnGap: 3,
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {members.map((member, index) => (
          <HomeTeamItem key={index} member={member} />
        ))}
      </Box>
    </Container>
  );
}
