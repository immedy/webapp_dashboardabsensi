import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Tooltip,
    Stack,
    Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import DataTable from 'components/tablesearch/DataTable';
import TableHead from 'components/tablesearch/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ActionCell from 'components/tablesearch/ActionCell';
import AnimateButton from 'components/@extended/AnimateButton';
import { useDataFetch, useFormSubmit, useDelete } from 'hooks/useBloodBank';
import { masterDataService } from 'services/bloodBank.service';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

const columns = [
    { id: 'no', label: 'No.' },
    { id: 'kode', label: 'Kode' },
    { id: 'nama', label: 'Nama Supplier/PMI' },
    { id: 'alamat', label: 'Alamat' },
    { id: 'telepon', label: 'Telepon' },
    { id: 'email', label: 'Email' },
    { id: 'status', label: 'Status', align: 'center' },
    { id: 'actions', label: 'Aksi', align: 'right' }
];
export default function Supplier() {
    return <Grid container spacing={3}>
        <Grid size={12}>
            <MainCard
                title="Master Supplier / PMI"
                secondary={
                    <Tooltip title="Tambah Suplier">
                        <IconButton
                            size="large"
                            color="primary"
                            sx={{ boxShadow: 3 }}
                        // onClick={() => handleOpenDialog()}
                        >
                            <PlusOutlined />
                        </IconButton>
                    </Tooltip>
                }>
                <DataTable>
                    <TableHead columns={columns}>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <ActionCell>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            size="large"
                                            color="primary"
                                            // onClick={() => handleOpenDialog(row)}
                                        >
                                            <EditOutlined />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Hapus">
                                        <IconButton
                                            size="large"
                                            color="error"
                                            // onClick={() => handleDelete(row.id, row.nama)}
                                            // disabled={deleting}
                                        >
                                            <DeleteOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </ActionCell>
                            </TableRow>
                        </TableBody>
                    </TableHead>
                </DataTable>
            </MainCard>
        </Grid>
        
    </Grid>
}