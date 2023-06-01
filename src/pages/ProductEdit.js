import axios from "axios";
import { useParams} from "react-router-dom";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState  } from "react";
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


function ProductEdit(){
    const PRODUCT_API = `${process.env.REACT_APP_FETCH_API}`;
    const [product, setProduct] = useState({});
    const toast = useRef();
    const {id} = useParams();



    console.log(product)

    useEffect(() => {
      if(id) {
        axios
            .get(`${PRODUCT_API}/productsBo/${id}`)
            .then(res => {
                setProduct(res.data)
            })
            .catch(err => {
                throw err;
            });
          }
    }, [id])



    function handleChange(e){
        setProduct({
            ...product,
            [e.target.name] : e.target.value
    });
    }

    const getMarkHandler = (e) => {
      const { name, value } = e.target;
      setProduct((prevProduct) => ({
        ...prevProduct,
        markDtoRequest: { id: value },
      }));
    };

    const handleImageChange = (imageUrl) => {
      setProduct((preveProduct)=> ({
        ...preveProduct,
        image : imageUrl,
      }));
    };

    

    // function handleSubmit() {
    //     if(id){
    //     axios
    //         .put(`${PRODUCT_API}/productsBo/${id}`, product)
    //         .then(res => {
                // toast.current.show({ severity: 'success', summary: 'Success', detail: 'Update product successfully', life: 3000 });
                // window.location.href = '/dashboard/products';
            // })
            // .then(() => setTimeout(window.location.reload(), 3000))
            // .catch(err => {
                // toast.current.show({ severity: 'error', summary: 'Error', detail: 'Update product Fail', life: 3000 });
                // window.location.href = '/dashboard/products';
            // })
    // }
// }


    return (
        <>
        <Toast ref={toast}/>
        <form autoComplete="off"
          noValidate
          >
          <Card>
            <CardHeader title="Add Product" />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                <Grid container spacing={3}>
                  
                  <Grid item xs={12} md={4}>
                    <TextField 
                    fullWidth 
                    label="Name"
                    name="name"
                    value={product.name || ''}
                    onChange={(e) => handleChange(e)}
                    required 
                     />
                  </Grid>
    
                  <Grid item xs={12} md={4}>
                    <TextField 
                    fullWidth 
                    label="Description"
                    name="description"
                    value={product.description || ''}
                    onChange={(e) => handleChange(e)}
                    required 
                     />
                  </Grid>
    
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Price"
                      name="price"
                      value={product.price || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Grid>
    
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="ProductCode"
                      name="productCode"
                      value={product.productCode || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Grid>
    
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Protein"
                      name="protein"
                      value={product.protein || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Grid>
    
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Fats"
                      name="fats"
                      value={product.fats || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Grid>
    
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Carbohydrates"
                      name="carbohydrates"
                      value={product.carbohydrates || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Grid>
    
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Minerals"
                      name="minerals"
                      value={product.minerals || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Grid>
    
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Vitamins"
                      name="vitamins"
                      value={product.vitamins || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Grid>
    
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Animal"
                      name="animal"
                      value={product.animal || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Grid>
    
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Sale"
                      name="sale"
                      value={product.sale || 0}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Grid>
    
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Mark"
                      name="product.mark.id"
                      value={id || ''}
                      type="number"
                      onChange={(e) => handleChange(e)}
                      onChange={''}
                      required
                    />
                  </Grid>
    
                  <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Category"
                      name="product.categoryId"
                      type="number"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Grid>
    
                  {/* <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      helperText="Please enter product image"
                      label="Image"
                      name="image" */}
                      {/* // value={image || ''}
                      onChange={(e) => handleChange(e)}
                      required
                    /> */}
                    {/* <UploadImage setNewImage={setImage}/> */}
                  {/* </Grid> */}
    
                  {/* <Grid xs={12} md={4}>
                    <TextField
                      fullWidth
                      helperText="Please enter product image(1)"
                      label='ImageDetail(1)'
                      name='url' */}
                    {/* //   value={image1 || ''}
                      required
                    /> */}
                    {/* <UploadImage setNewImage={setImage1}/> */}
                    {/* </Grid> */}
                    
                </Grid>
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              {/* <Button variant="contained" type="submit" onClick={handleSubmit()}>
                Update Product
              </Button> */}
            </CardActions>
          </Card>
        </form>
        </>
      );
}
export default ProductEdit;