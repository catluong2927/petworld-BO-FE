import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
// @mui
import {
  formControlClasses,
  lable,
  Card,
  Table,
  Stack,
  Paper,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'number', label: '#', alignRight: false },
  { id: 'image', label: 'Image', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'sale', label: 'Sale', alignRight: false },
  { id: 'markDtoResponse', label: 'Mark', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  {},
];

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [size, setSize] = useState(10);

  const [totalElements, setTotalElements] = useState(0);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [status, setStatus] = useState(true);

  const toast = useRef(null);

  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const PRODUCT_API = `${process.env.REACT_APP_FETCH_API}/productsBo`;

  useEffect(() => {
    axios
      .get(`${PRODUCT_API}?size=${size}&page=${page}&categoryIds=${categories}`)
      .then((res) => {
        setProducts(res.data.content);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [size, page]);

  const handleOpenMenu = (event, productId, status) => {
    setOpen(event.currentTarget);
    setSelectedProductId(productId);
    setStatus(status);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeSize = (event) => {
    setPage(0);
    setSize(parseInt(event.target.value, 10));
  };

  const handleOpenDelete = () => {
    setConfirmDelete(true);
  };

  const handleCloseDelete = () => {
    setConfirmDelete(false);
  };

  function handleDelete(productId) {
    console.log(productId);
    if (productId) {
      axios
        .delete(`${PRODUCT_API}/${productId}`)
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

  return (
    <>
      <Toast ref={toast} />
      <Helmet>
        <title> Product | Product Management </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Product Management
          </Typography>
          {/* <Link to={`add`}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Product
            </Button>
          </Link> */}
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead key="user-list-head" headLabel={TABLE_HEAD} rowCount={products.length} />

                <TableBody>
                  {products.map((product, index) => {
                    const { id, name, price, sale, image, markDtoResponse, status } = product;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{index + 1}</TableCell>

                        <TableCell align="left">
                          <Avatar src={image} />
                        </TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{price}</TableCell>
                        <TableCell align="left">{sale}</TableCell>
                        <TableCell align="left">{markDtoResponse.tag}</TableCell>
                        <TableCell align="left">
                          <Label color={(status) ? 'success' : 'error'}> {(status) ? 'Active' : 'InActive'} </Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(event) => handleOpenMenu(event, id, status)}
                          >
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
            rowsPerPageOptions={[10, 20, 30, 40, 50]}
            component="div"
            count={totalElements}
            rowsPerPage={size}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeSize}
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
        <Link to={`#`} style={{ textDecoration: 'none', color: '#2CD3E1' }}>
          <MenuItem>
            <Iconify icon={'eva:info-fill'} sx={{ mr: 2 }} />
            Detail
          </MenuItem>
        </Link>

        <Link to={`edit/${selectedProductId}`} style={{ textDecoration: 'none', color: 'blue' }}>
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
          <DialogTitle>Delete Product</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete product?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleCloseDelete}>Cancel</button>
            <button onClick={() => handleDelete(selectedProductId)}>Delete</button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
