// @mui
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Container,
    CardContent,
    Box,
    CardHeader,
    TableContainer,
} from '@mui/material';

// components
import Label from '../label';
import Scrollbar from '../scrollbar';

// sections
import { UserListHead } from '../../sections/@dashboard/user';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: 'number', label: '#', alignRight: false },
    { id: 'name', label: 'Service name', alignRight: false },
    { id: 'price', label: 'Price', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    { id: 'isActive', label: 'isActive', alignRight: false },
    {},
];
// ----------------------------------------------------------------------
export default function ServicePackage(props) {

    const { servicePackages } = props

    return (
        <>
            <Container>
                <Card>
                    <CardHeader title="Service" style={{ paddingBottom: '20px', fontSize: '100px' }} />
                    <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                            <Scrollbar>
                                <TableContainer sx={{ minWidth: '800' }}>
                                    <Table>
                                        <UserListHead key="user-list-head" headLabel={TABLE_HEAD} rowCount={servicePackages.totalElements} />
                                        <TableBody>
                                            {servicePackages.content.map((servicePackage, index) => {
                                                const { id, name, price, description, active } = servicePackage;
                                                return (
                                                    <TableRow hover key={index} tabIndex={-1}>
                                                        <TableCell align="left">{index + 1}</TableCell>
                                                        <TableCell align="left">{name}</TableCell>
                                                        <TableCell align="left">{price}</TableCell>
                                                        <TableCell align="left">{description}</TableCell>
                                                        <TableCell align="left">
                                                            <Label color={active ? 'success' : 'error'}> {active ? 'Active' : 'InActive'} </Label>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Scrollbar>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}