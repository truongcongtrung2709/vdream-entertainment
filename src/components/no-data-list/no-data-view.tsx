'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import CompactLayout from 'src/layouts/compact';
import { SeverErrorIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
import Image from '../image';
import { Box } from '@mui/system';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function NoDataView() {
  const { t } = useTranslate()
  return (
    <Box sx={{ textAlign: 'center' }}>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          {t("Đang được cập nhật...")}
        </Typography>
      </m.div>



      <m.div variants={varBounce().in} >
        <Image src='/assets/characters/character_7.png' />
      </m.div >


    </Box>
  );
}
