import { useState } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Pagination, paginationClasses } from '@mui/material';

import { IItem } from 'src/types/item';

import StoreItem from './store-item';

// ----------------------------------------------------------------------

type Props = {
  items: IItem[];
};

export default function StoreList({ items }: Props) {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const displayedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <Box
        sx={{
          pt: 5,
          pb: 10,
          gap: 4,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {displayedItems.map((item) => (
          <StoreItem key={item.id} item={item} />
        ))}
      </Box>

      <Pagination
        count={totalPages}
        page={page}
        color="primary"
        onChange={handleChangePage}
        sx={{
          pb: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
          [`& .${paginationClasses.ul} button:hover`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
          },
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------
