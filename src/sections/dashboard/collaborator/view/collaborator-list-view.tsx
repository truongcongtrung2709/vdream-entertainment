'use client';

import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';
import { IPartnerItem, IPartnerTableFilters } from 'src/types/partner';
import { useDeletePartner, useGetPartners } from 'src/api/partner';
import CollaboratorTableRow from '../collaborator-table-row';



// --------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name_vi', label: 'Sản phẩm', width: 300 },
  { id: 'created_at', label: 'Ngày tạo', width: 180 },
  { id: 'describe_vi', label: 'Mô tả', width: 180 },
  { id: '', width: 88 },
];


// ----------------------------------------------------------------------

export default function StoreListView() {
  const table = useTable();


  const settings = useSettingsContext();

  const router = useRouter();

  const [tableData, setTableData] = useState<IPartnerItem[]>([]);


  const { partners, partnersLoading, partnersEmpty } = useGetPartners();


  useEffect(() => {
    setTableData(partners);
  }, [partners]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const notFound = !dataFiltered.length || partnersEmpty;


  const deletePartner = useDeletePartner();

  const handleDeleteRow = useCallback(
    async (id: number) => {
      try {
        deletePartner(id)
        const updatedTableData = tableData.filter((row) => row.id !== id);
        setTableData(updatedTableData);

        table.onUpdatePageDeleteRow(dataInPage.length);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    [dataInPage.length, table, tableData, deletePartner]
  );



  const handleEditRow = useCallback(
    (id: number) => {
      router.push(paths.dashboard.collaborator.edit(id));
    },
    [router]
  );


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <Typography variant="h4">Danh sách đối tác</Typography>
          <Button
            component={RouterLink}
            href={paths.dashboard.collaborator.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Đối tác mới
          </Button>
        </Stack>
        <Card>



          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>


            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}


                />

                <TableBody>

                  {partnersLoading ? (
                    [...Array(table.rowsPerPage)].map((i, index) => (
                      <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    ))
                  ) : (
                    <>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <CollaboratorTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id as unknown as string)}
                            onSelectRow={() => table.onSelectRow(row.id as unknown as string)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onEditRow={() => handleEditRow(row.id)}
                          />
                        ))}
                    </>
                  )}
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: IPartnerItem[];
  comparator: (a: any, b: any) => number;
}) {


  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
