import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { IItem } from 'src/types/item';
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IItem;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function StoreTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { name_vi, created_at, image } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>


        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={name_vi} src={`${HOST_API}/${image}`} sx={{ mr: 2 }} />

          <Typography variant="subtitle2">{name_vi}</Typography>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(created_at)}</TableCell>


        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
