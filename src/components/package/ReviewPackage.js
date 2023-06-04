import axios from 'axios';

// @mui
import {
    Card,
    Avatar,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Container,
    CardContent,
    Box,
    CardHeader,
    Rating,
    TableContainer,
} from '@mui/material';

// components
import Scrollbar from '../scrollbar';

// sections
import { UserListHead } from '../../sections/@dashboard/user';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: 'number', label: '#', alignRight: false },
    { id: 'avatar', label: "Avatar", alignRight: false },
    { id: 'fullName', label: "Customer's name", alignRight: false },
    { id: 'comment', label: 'Comment', alignRight: false },
    { id: 'start', label: 'Start', alignRight: false },
    {},
];
// ----------------------------------------------------------------------
export default function ReviewPackage(props) {

    const { reviewPackages } = props

    console.log(reviewPackages);

    return (
        <>
            <Container>
                <Card>
                    <CardHeader title="Review" style={{ paddingBottom: '20px', fontSize: '100px' }} />
                    <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                            <Scrollbar>
                                <TableContainer sx={{ minWidth: '800' }}>
                                    <Table>
                                        <UserListHead key="user-list-head" headLabel={TABLE_HEAD} rowCount={reviewPackages.totalElements} />
                                        <TableBody>
                                            {reviewPackages.content.map((ServicePackage, index) => {
                                                const { id, userDtoResponse, review, star } = ServicePackage;
                                                return (
                                                    <TableRow hover key={index} tabIndex={-1}>
                                                        <TableCell align="left">{index + 1}</TableCell>
                                                        <TableCell align="left">
                                                            <Avatar alt={userDtoResponse.fullName} src={userDtoResponse.avatar} />
                                                        </TableCell>
                                                        <TableCell align="left">{userDtoResponse.fullName}</TableCell>
                                                        <TableCell align="left">{review}</TableCell>
                                                        <TableCell align="left">
                                                            <Rating name="read-only" value={star} readOnly />
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