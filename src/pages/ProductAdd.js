import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import { Toast } from 'primereact/toast';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import UploadImage from '../components/upload/UploadImage';

function ProductAdd() {
  const toast = useRef();

  const PRODUCT_API = `${process.env.REACT_APP_FETCH_API}/productsBo`;

  const isLogin = useSelector((state) => state.auth.login?.currentUser);

  const [token, setToken] = useState('');

  const [image, setImage] = useState('');

  const [image1, setImage1] = useState('');

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    productCode: '',
    protein: '',
    fats: '',
    carbohydrates: '',
    minerals: '',
    vitamins: '',
    animal: '',
    sale: '',
    markDtoRequest: { id: '' },
    image: '',
    imageDetail: [],
  });

  useEffect(() => {
    setToken(isLogin.token);
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (imageUrl) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: imageUrl,
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
  }, [image1]);

  const getMarkHandler = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      markDtoRequest: { id: value },
    }));
  };
  console.log(product);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${PRODUCT_API}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: `Create ${product.name} successfully`,
          life: 3000,
        });
        window.location.href = '/dashboard/admin/products';
      })
      .catch((err) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Create product Fail', life: 10000 });
        window.location.href = '/dashboard/admin/products/add';
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <form autoComplete="off" noValidate>
        <Card>
          <CardHeader title="Add Product" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Name"
                    helperText="Please enter product name"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Description"
                    helperText="Please enter product description"
                    name="description"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    helperText="Please enter product price"
                    label="Price"
                    name="price"
                    onChange={(e) => handleChange(e)}
                    type="number"
                    inputProps={{ pattern: '[0-9]*' }}
                    required
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    helperText="Please enter product code"
                    label="ProductCode"
                    name="productCode"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    helperText="Please enter product protein"
                    label="Protein"
                    name="protein"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    helperText="Please enter product fats"
                    label="Fats"
                    name="fats"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    helperText="Please enter product carbohydrates"
                    label="Carbohydrates"
                    name="carbohydrates"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    helperText="Please enter product minerals"
                    label="Minerals"
                    name="minerals"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    helperText="Please enter product vitamins"
                    label="Vitamins"
                    name="vitamins"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    helperText="Please enter product animal"
                    label="Animal"
                    name="animal"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    helperText="Please enter the discount % of the product"
                    label="Sale"
                    name="sale"
                    type="number"
                    inputProps={{ pattern: '[0-9]*' }}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Mark</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Mark"
                      value={product.markDtoRequest.id || ''}
                      onChange={(e) => getMarkHandler(e)}
                    >
                      <MenuItem value={1}>None</MenuItem>
                      <MenuItem value={2}>Offer</MenuItem>
                      <MenuItem value={3}>Hot</MenuItem>
                      <MenuItem value={4}>Hot Sale</MenuItem>
                      <MenuItem value={5}>Sold Out</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={12} md={4}>
                  <FormControl fullWidth required>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      name="categoryId"
                      value={product.categoryId || ''}
                      onChange={(e) => handleChange(e)}
                    >
                      <MenuItem value={1}>Milk</MenuItem>
                      <MenuItem value={2}>Pate</MenuItem>
                      <MenuItem value={3}>Seed</MenuItem>
                      <MenuItem value={4}>Vegetable</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={12} md={4}>

                  <TextField
                    fullWidth
                    helperText="Please choose the product's profile picture"
                    label="Image"
                    name="image"
                    value={product.image || ''}
                    disabled={Boolean(image)}
                    required
                  />
                  <UploadImage setNewAvatar={handleImageChange} />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    helperText="Please choose the detailed photos of the product"
                    label="ImageDetail"
                    name="url"
                    value={image1 || ''}
                    onChange={(e) => handleChange(e)}
                    required
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <UploadImage setNewAvatar={setImage1} />
                </Grid>

                <div className="image-grid-container">
                  <div className="image-grid">
                    {product.imageDetail &&
                      product.imageDetail.map((image, index) => (
                        <div className="image-container" key={`image${index}`}>
                          <img src={image.url} alt={index} />
                        </div>
                      ))}
                  </div>
                </div>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Add Product
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
}

export default ProductAdd;
