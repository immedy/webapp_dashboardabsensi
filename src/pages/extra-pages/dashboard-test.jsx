import { useState } from 'react';
import MainCard from 'components/MainCard';
import OrderTable from '../../sections/dashboard/default/OrdersTable';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import AnimateButton from 'components/@extended/AnimateButton';
import Search from '../../components/tablesearch/TableSearch';

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
                            <Button
                                size="small"
                                variant="contained"
                                sx={{ borderRadius: 2 }}
                            >
                                Button
                            </Button>
                        </AnimateButton>

                        <AnimateButton>
                            <Button
                                size="small"
                                variant="outlined"
                                sx={{ borderRadius: 2 }}
                            >
                                Modal
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </Grid>

            {/* TABLE */}
            <MainCard sx={{ mt: 2 }} content={false}>
                <OrderTable />
            </MainCard>
        </Grid>
    );
}
