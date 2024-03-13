import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';

import { HOST_API } from 'src/config-global';

import Image from 'src/components/image';
import { varHover, varTranHover } from 'src/components/animate';

import { IEmployeeItem } from 'src/types/employee';
import Link from 'next/link';


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

interface TeamMarketingMemberProps extends StackProps {
  member: IEmployeeItem;
}

export default function HomeTeamItem({ member, ...other }: TeamMarketingMemberProps) {
  const { first_name, last_name, image, link_youtube } = member;


  return (
    <Stack {...other}>
      <Box
        component={m.div}
        whileHover="hover"
        variants={varHover(0.95)}
        transition={varTranHover()}
        sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}
      >
        <Link href={link_youtube} passHref target='_blank'>
          <m.div style={{ cursor: "pointer" }} variants={varHover(1.15)} transition={varTranHover()}>
            <Image src={`${HOST_API}/${image}`} alt={first_name} ratio="3/4" />
          </m.div>
        </Link>
      </Box>

      <Typography variant="h6" textAlign='center' sx={{ my: 2 }}>{`${last_name} ${first_name} `}</Typography>

    </Stack>
  );
}
