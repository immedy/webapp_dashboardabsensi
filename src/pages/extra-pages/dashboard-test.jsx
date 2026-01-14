import { useState } from 'react';
import MainCard from 'components/MainCard';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import AnimateButton from 'components/@extended/AnimateButton';
import Search from '../../components/tablesearch/TableSearch';

import DataTable from '../../components/tablesearch/DataTable';
import ActionCell from '../../components/tablesearch/ActionCell';
import TableHead from '../../components/tablesearch/TableHead';


// ==============================|| TABLE CONFIG ||============================== //

const columns = [
    { id: 'tracking_no', label: 'Tracking No.' },
    { id: 'name', label: 'Product Name' },
    { id: 'qty', label: 'Qty', align: 'right' },
    { id: 'price', label: 'Price', align: 'right' },
    { id: 'actions', label: 'Action', align: 'right' }
];

const rows = [
    { id: 1, tracking_no: '84564564', name: 'Camera', qty: 2, price: 40570 },
    { id: 2, tracking_no: '98764564', name: 'Laptop', qty: 1, price: 180139 }
];

// ==============================|| DASHBOARD ||============================== //

export default function DasboardTest() {
    return (
        <Grid item xs={12}>
            {/* HEADER */}
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
            >
                {/* Search */}
                <Grid item xs={12} md={4}>
                    <Search />
                </Grid>

                {/* Actions */}
                <Grid item>
                    <Stack direction="row" spacing={1}>
                        <AnimateButton>
                            <Button size="small" variant="contained" sx={{ borderRadius: 2 }}>
                                Button
                            </Button>
                        </AnimateButton>

                        <AnimateButton>
                            <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>
                                Modal
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </Grid>

            {/* TABLE */}
            <MainCard sx={{ mt: 2 }} content={false}>
                <DataTable>
                    <TableHead columns={columns} />

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover key={row.id}>
                                <TableCell>
                                    <Link color="secondary" underline="hover">
                                        {row.tracking_no}
                                    </Link>
                                </TableCell>

                                <TableCell>{row.name}</TableCell>

                                <TableCell align="right">{row.qty}</TableCell>

                                <TableCell align="right">
                                    {row.price.toLocaleString()}
                                </TableCell>

                                {/* ACTION BEBAS */}
                                <ActionCell>
                                    <Tooltip title="Edit">
                                        <IconButton size="large" color="primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                            </svg>
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Hapus">
                                        <IconButton size="Large" color="error">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                            </svg>
                                        </IconButton>
                                    </Tooltip>
                                </ActionCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </DataTable>
            </MainCard>
        </Grid>
    );
}
