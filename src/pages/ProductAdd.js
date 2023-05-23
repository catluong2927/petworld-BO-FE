import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';

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
} from '@mui/material';
import UploadImage from '../components/upload/UploadImage';


function ProductAdd() {
    const [image, setImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
  const PRODUCT_API = `${process.env.REACT_APP_FETCH_API}/products`;
  const [product, setProduct] = useState({});



  function handleChange(event){
    setProduct({
      ...product,
      [event.target.name]: event.target.value
    });
  }
  console.log(product)

  function handleSubmit(){
    axios
      .post(`${PRODUCT_API}`, product)
      .then(res => {
        alert(`Create product ${JSON.stringify(
          res.data
        )} successfully !!! `
        );
        window.location.href = "/products"
      })
      .catch(err => {
        throw err;
      });
  }



  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit()}
    >
      <Card>
        <CardHeader title="Add Product" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  helperText="Please enter product name"
                  label="Name"
                  name="name"
                  value={product.name}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  helperText="Please enter product description"
                  label="Description"
                  name="description"
                  value={product.description}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  helperText="Please enter product image"
                  label="Image"
                  name="image"
                  value={product.image}
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
                  value={product.price}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  helperText="Please enter product code"
                  label="ProductCode"
                  name="productCode"
                  value={product.productCode}
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
                  value={product.protein}
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
                  value={product.fats}
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
                  value={product.carbohydrates}
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
                  value={product.minerals}
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
                  value={product.vitamins}
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
                  value={product.animal}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  helperText="Please enter product sale"
                  label="Sale"
                  name="sale"
                  value={product.sale}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Grid>

               <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Mark"
                  name="markDtoRequest.id"
                  type = "number"
                  value={product.markDtoRequest.id}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Grid> 

              <Grid xs={12} md={4}> 
                <TextField
                fullWidth
                label="ImageDetai(1)"
                name="imageDetailList.url"
                onChange={(e) => handleChange(e)}
                required
                />
              </Grid>
             
                 
              <Grid xs={12} md={4}> 
                <TextField
                fullWidth
                label="ImageDetai(2)"
                name="imageDetailList.url" 
                onChange={(e) => handleChange(e)}
                required
                />
              </Grid>

              <Grid xs={12} md={4}> 
                <TextField
                fullWidth
                label="ImageDetai(3)"
                name="imageDetailList.url" 
                onChange={(e) => handleChange(e)}
                required
                />
              </Grid>

              <Grid xs={12} md={4}> 
                <TextField
                fullWidth
                label="ImageDetai(4)"
                name="imageDetailList.url" 
                onChange={(e) => handleChange(e)}
                required
                />
              </Grid>

              <Grid xs={12} md={4}> 
                <TextField
                fullWidth
                label="ImageDetai(5)"
                name="imageDetailList.url" 
                onChange={(e) => handleChange(e)}
                required
                />
              </Grid>
               
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit" >
            Add Product
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default ProductAdd;
