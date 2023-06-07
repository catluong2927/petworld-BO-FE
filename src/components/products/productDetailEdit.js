import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Card,
  Switch,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  Avatar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import UploadImage from '../upload/UploadImage';

function ProductDetailEdit() {
  const PRODUCT_API = `${process.env.REACT_APP_FETCH_API}/productsBo`;
  const [product, setProduct] = useState({});
  const toast = useRef();
  const { id } = useParams();
  const [token, setToken] = useState('');
  const [image1, setImage1] = useState('');

  const isLogin = useSelector((state) => state.auth.login?.currentUser);

  useEffect(() => {
    setToken(isLogin.token);
  }, [token]);

  console.log(product);

  useEffect(() => {
    if (token) {
      axios
        .get(`${PRODUCT_API}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [token]);

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  const handleStatusChange = (event) => {
    const newStatus = event.target.checked;
    setProduct((prevProduct) => ({
      ...prevProduct,
      status: newStatus,
    }));
  };

  const getMarkHandler = (e) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      mark: { id: value },
    }));
  };

  useEffect(() => {
    if (image1) {
      const newImageDetail = [...product.imageDetail, { url: image1 }];
      setProduct((prevProduct) => ({
        ...prevProduct,
        imageDetail: newImageDetail,
      }));
    }
  }, [image1, image1.length]);

  const handleImageChange = (imageUrl) => {
    setProduct((preveProduct) => ({
      ...preveProduct,
      image: imageUrl,
    }));
  };

  const handleImageUpload = (imageUrl, index) => {
    const updatedAvatarUrls = [...product.imageDetailList];
    const newAvatar = { url: imageUrl };
    updatedAvatarUrls[index] = newAvatar;
    setProduct((prevProduct) => ({
      ...prevProduct,
      imageDetailList: updatedAvatarUrls,
    }));
  };

  const handleSubmit = () => {
    console.log('submit: ', product);
    if (token) {
      axios
        .put(`${PRODUCT_API}/${id}`, product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: `Update ${product.name} successfully`,
            life: 10000,
          });
          window.location.href = '/dashboard/admin/products';
        })
        .catch((err) => {
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Update product Fail', life: 3000 });
          window.location.href = '/dashboard/admin/products';
        });
    }
  };
  console.log(product);

  return (
    <>
      <Toast ref={toast} />
      <form autoComplete="off" noValidate>
        <Card>
          <Grid container spacing={3}>
            <Grid xs={6} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CardHeader title="Edit Product" />
            </Grid>
            <Grid xs={6} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={product.status || ''}
                    onChange={handleStatusChange}
                    style={product.status ? { color: '#0079FF' } : { color: '#FF0060' }}
                  />
                }
                label={product.status ? 'Active' : 'InActive'}
                style={
                  product.status
                    ? { color: '#0079FF', fontSize: '15px', fontWeight: 'bold' }
                    : { color: '#FF0060', fontSize: '15px', fontWeight: 'bold' }
                }
              />
            </Grid>
          </Grid>

          <CardContent sx={{ pt: 0 }}>

            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3} justifyContent="center">
                <Grid
                  xs={12}
                  md={12}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}
                >
                  <Avatar
                    src={product.image}
                    sx={{
                      height: 200,
                      mb: 2,
                      width: 200,
                      ml: 'auto',
                      mr: 'auto',
                    }}
                  />
                  <UploadImage setNewAvatar={handleImageChange} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={product.name || ''}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={product.price || ''}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="ProductCode"
                    name="productCode"
                    value={product.productCode || ''}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Protein"
                    name="protein"
                    value={product.protein || ''}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Fats"
                    name="fats"
                    value={product.fats || ''}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Carbohydrates"
                    name="carbohydrates"
                    value={product.carbohydrates || ''}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Minerals"
                    name="minerals"
                    value={product.minerals || ''}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Vitamins"
                    name="vitamins"
                    value={product.vitamins || ''}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Animal"
                    name="animal"
                    value={product.animal || ''}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Sale"
                    name="sale"
                    value={product.sale || ''}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  {product.categoryDtoResponse && (
                    <TextField
                      fullWidth
                      label="Category"
                      name="categoryDtoResponse.name"
                      value={product.categoryDtoResponse.name || ''}
                      onChange={(e) => handleChange(e)}
                    />
                  )}
                </Grid>

                <Grid xs={12} md={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Description"
                    name="description"
                    value={product.description || ''}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => handleSubmit()}
              style={{ backgroundColor: '#03C988', color: '#fff' }}
            >
              Update Product
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
}
export default ProductDetailEdit;
