import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Toast } from 'primereact/toast';


import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead } from '../sections/@dashboard/user';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";




const TABLE_HEAD = [
  { id: 'id', label: '#', alignRight: false },
  { id: 'avatar', label: 'Avatar', alignRight: false },
  { id: 'fullName', label: 'FullName', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'userName', label: 'UserName', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  {},
];


export default function UserPage() {
  const isLogin = useSelector((state) => state.auth.login?.currentUser);

  const [token, setToken] = useState('');

  const [open, setOpen] = useState(null);

  const [selected, setSelected] = useState([]);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [totalElements, setTotalElements] = useState(0);

  const [userList, setUserList] = useState([]);

  const USER_API = `${process.env.REACT_APP_FETCH_API}/users`;

  // Confirm delete
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [status, setStatus] = useState(true);

  const toast = useRef(null);

  useEffect(() => {
    setToken(isLogin.token)
  }, [isLogin])

  useEffect(() => {
    if (token) {
      axios
        .get(`${USER_API}?size=${rowsPerPage}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          setUserList(res.data.content);
          setTotalElements(res.data.totalElements)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [rowsPerPage, page, token])

  const handleOpenMenu = (event, userId, isStatus) => {
    console.log(userId);
    setOpen(event.currentTarget);
    setSelectedUserId(userId);
    setStatus(isStatus);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Delete product in cart
  const handleOpenDelete = () => {
    setConfirmDelete(true);
  }

  const handleCloseDelete = () => {
    setConfirmDelete(false);
  }

  function handleDelete(userId) {
    if (userId) {
      axios
        .delete(`${USER_API}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'Delete successfully', life: 3000 });
          setConfirmDelete(false);
        })
        .then(() => setTimeout(window.location.reload(), 5000))
        .catch((err) => {
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Delete Fail', life: 3000 });
        });
    }
  }
  
  console.log(userList)

  return (
    <>
      <Toast ref={toast} />
      <Helmet>
        <title> User | User Management </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User Management
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  key="user-list-head"
                  headLabel={TABLE_HEAD}
                  rowCount={totalElements}
                  numSelected={selected.length}
                />

                <TableBody>
                  {userList.map((row) => {
                    const { id, fullName, userRoleDtos, isStatus, email, avatar, userName } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{id}</TableCell>

                        <TableCell align="left">
                          <Avatar alt={fullName} src={avatar} />
                        </TableCell>

                        <TableCell align="left">{fullName}</TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{userName}</TableCell>

                        <TableCell align="left">
                          {
                            userRoleDtos.map((userRole) => (
                              <div key={userRole.roleDtoResponse.id}>
                                -&ensp;{userRole.roleDtoResponse.desc}
                              </div>
                            ))
                          }
                        </TableCell>

                        <TableCell align="left">
                          <Label color={(isStatus) ? 'success' : 'error'}>{(isStatus) ? 'Active' : 'InActive'}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id, isStatus)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >


        <Link to={`info/${selectedUserId}`} style={{ textDecoration: 'none', color: '#2CD3E1' }}>
          <MenuItem>
            <Iconify icon={'eva:info-fill'} sx={{ mr: 2 }} />
            Info
          </MenuItem>
        </Link>

        <Link to={`edit/${selectedUserId}`} style={{ textDecoration: 'none', color: 'blue' }}>
          <MenuItem>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        </Link>

        <MenuItem disabled={!status} sx={{ color: 'error.main' }} onClick={handleOpenDelete}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {confirmDelete && (
        <Dialog open={confirmDelete} onClose={handleCloseDelete}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button
              onClick={() => handleDelete(selectedUserId)}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}

    </>
  );
}
