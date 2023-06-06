import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  CardActions,
  Chip,
  Avatar,
  TextField,
  FormControl,
  FormControlLabel,
  Switch,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ProductDetail() {
  const PRODUCT_API = `${process.env.REACT_APP_FETCH_API}/productsBo`;

  const { id } = useParams();

  const [product, setProduct] = useState({});

  const isLogin = useSelector((state) => state.auth.login?.currentUser);

  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(isLogin.token);
  }, [isLogin]);
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

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader title="Product's Detail" style={{ paddingBottom: '20px', fontSize: '100px' }} />
        <CardContent sx={{ pt: 0 }}>

          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={12}>
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
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product's name"
                  name="name"
                  value={product.name || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={product.price || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={product.description || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ProductCode"
                  name="productCode"
                  value={product.productCode || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Protein"
                  name="protein"
                  value={product.protein || 0}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Fats"
                  name="fats"
                  value={product.fats || 0}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Carbohydrates"
                  name="carbohydrates"
                  value={product.carbohydrates || 0}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minerals"
                  name="minerals"
                  value={product.minerals || 0}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Vitamins"
                  name="vitamins"
                  value={product.vitamins || 0}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Animal"
                  name="animal"
                  value={product.animal || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Sale"
                  name="sale"
                  value={product.sale || 0}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
                {product.mark && (
                  <TextField
                    fullWidth
                    label="Mark"
                    name="mark"
                    value={product.mark.tag || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              </Grid>

              <Grid xs={12} md={6}>
                {product.categoryDtoResponse && (
                  <TextField
                    fullWidth
                    label="Category"
                    name="categoryDtoResponse.name"
                    value={product.categoryDtoResponse.name || ''}
                  />
                )}
              </Grid>

              <Grid xs={12} md={12}>
                <div className="image-grid-container">
                  <div className="image-grid">
                    {product.imageDetailList &&
                      product.imageDetailList.map((image, index) => (
                        <div className="image-container" key={`image${index}`}>
                          <img src={image.url} alt={index} />
                        </div>
                      ))}
                  </div>
                </div>
              </Grid>

              <Grid xs={12} md={12}>
                <CardActions sx={{ justifyContent: 'flex-start' }}>
                  <Chip
                    label={product.status ? 'Active' : 'InActive'}
                    style={
                      product.status
                        ? { backgroundColor: '#C7F2A4', color: '#5F8D4E', fontSize: '15px', fontWeight: 'bold' }
                        : { backgroundColor: '#FFA8A8', color: '#DF2E38', fontSize: '15px', fontWeight: 'bold' }
                    }
                    variant="outlined"
                  />
                </CardActions>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
}

export default ProductDetail;
