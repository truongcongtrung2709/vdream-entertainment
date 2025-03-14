"use client"

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { localStorageGetItem } from 'src/utils/storage-available';

import { useTranslate } from 'src/locales';
import { useGetPartners } from 'src/api/partner';

import Image from 'src/components/image';
import NoDataView from 'src/components/no-data-list/no-data-view';
import { HOST_API } from 'src/config-global';


// ----------------------------------------------------------------------

export default function CollaborationView() {
  const { t } = useTranslate();
  const { partners } = useGetPartners();
  const langStorage = localStorageGetItem('i18nextLng');
  return (
    <Container
      sx={{
        textAlign: 'center',
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
    >
      <Typography variant="h2">{t("Đối tác của chúng tôi")}</Typography>
      {
        !partners.length ?
          (
            <NoDataView />
          ) :
          (
            <Box
              sx={{
                mt: 10,
                rowGap: 8,
                columnGap: 10,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
              }}
            >
              {partners.map((item) => (
                <div key={item.id}>
                  <Image
                    width={64}
                    height={64}
                    visibleByDefault
                    disabledEffect
                    borderRadius={10}
                    alt={item.name_en}
                    src={`${HOST_API}/${item.image}`}
                  />

                  <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                    {langStorage === "vi" ?
                      item.name_vi
                      :
                      item.name_en
                    }
                  </Typography>

                  <Typography sx={{ color: 'text.secondary' }}> {langStorage === "vi" ?
                    item.describe_vi
                    :
                    item.describe_en
                  } </Typography>
                </div>
              ))}
            </Box>
          )
      }

    </Container>
  );
}
