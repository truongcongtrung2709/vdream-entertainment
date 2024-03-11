import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { localStorageGetItem } from 'src/utils/storage-available';
import { fUSCurrency, fVNCurrency } from 'src/utils/format-number';

import { HOST_API } from 'src/config-global';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

import { IItem } from 'src/types/item';
import Link from 'next/link';


// ----------------------------------------------------------------------

type Props = {
  item: IItem;
};

export default function StoreItem({ item }: Props) {
  const langStorage = localStorageGetItem('i18nextLng');
  const { name_en, name_vi, image, price_vi, price_en, link_youtube } = item;

  return (
    <div>
      <Link href={link_youtube} passHref target='_blank'>
        <Image src={`https://vdreamentertainment.com/${image}`} alt={name_en} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Link>
      <Stack spacing={1} sx={{ pt: 2.5, px: 2.5 }}>
        <Typography variant="overline" sx={{ color: 'text.disabled' }}>
          {langStorage === "vi" ?
            fVNCurrency(price_vi)
            :
            fUSCurrency(price_en)
          }
        </Typography>

        <Typography color="inherit">
          <TextMaxLine variant="h5" line={1}>
            {name_vi}
          </TextMaxLine>
        </Typography>
      </Stack>
    </div>
  );
}
