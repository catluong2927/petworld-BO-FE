import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Divider, TextField, Unstable_Grid2 as Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";


 function ProductDetail () {

  const PRODUCT_API = `${process.env.REACT_APP_FETCH_API}/productsBo`;

  const {id} = useParams();

  const [product, setProduct] = useState({});

   const isLogin = useSelector((state) => state.auth.login?.currentUser);

   const [token, setToken] = useState('');


  useEffect(() => {
    setToken(isLogin.token)
  }, [isLogin])


  // useEffect(() => {
  //   axios
  //     .get(`${PRODUCT_API}`, {
  //       headers: {
  //         Authorization:`Bearer ${token}`
  //       }
  //     })
  //     .then(res => {
  //       setProduct(res.data)
  //     })
  //     .catch(err => {
  //       throw err
  //     })
  // }, [])
  

  useEffect(() => {
    if(id){
        axios
        .get(`${PRODUCT_API}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
            setProduct(res.data)
        })
        .catch(err => {
            throw err
        })
      }
}, [id, token]);

return (
  <form>
    <cart>
      <CardHeader title="ProductDetail" />
      <CardContent sx={{ pt: 0 }}>
        <Box xs={{ m: -1.5 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                required
                value={product.name || ''}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={product.price || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                required
                value={product.description || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

              <TextField
                fullWidth
                label="ProductCode"
                required
                name="productCode"
                value={product.productCode}
                InputProps={{
                  readOnly: true,
                }}
              />
  



          </Grid>
        </Box>
      </CardContent>
      <Divider />
    </cart>
  </form>
)
}

export default ProductDetail;