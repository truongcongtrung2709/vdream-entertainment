'use client';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { useGetItems } from 'src/api/item';

import StoreList from '../store-list';

// ----------------------------------------------------------------------

export default function StoreView() {
  const { t } = useTranslate();
  const { items } = useGetItems(); 

  return (
    <Container>
      <Stack
        spacing={3}
        sx={{
          py: 5,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h2">{t("Sản phẩm")}</Typography>
      </Stack>

      <StoreList items={items} />
    </Container>
  );
}
