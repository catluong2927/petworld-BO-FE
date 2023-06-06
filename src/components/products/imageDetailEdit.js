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
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Chip,
  Unstable_Grid2 as Grid,
  Avatar,
} from '@mui/material';
import UploadImage from '../upload/UploadImage';

function ImageDetailEdit() {
  const IMAGE_DETAIL_API = `${process.env.REACT_APP_FETCH_API}/image-detail`;
  const [images, setImages] = useState([]);
  const toast = useRef();
  const { id } = useParams();
  const [token, setToken] = useState('');

  const isLogin = useSelector((state) => state.auth.login?.currentUser);

  const codeStyle = {
    fontSize: '18px',
    fontStyle: 'italic',
    fontWeight: 'bold',
  };

  useEffect(() => {
    setToken(isLogin.token);
  }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get(`${IMAGE_DETAIL_API}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setImages(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [token]);

  const handleImageUpload = (imageUrl, imageId, index) => {
    const updatedAvatarUrls = [...images];
    const newAvatar = { id: imageId, url: imageUrl };
    updatedAvatarUrls[index] = newAvatar;
    setImages(updatedAvatarUrls);
  };

  const handleSubmit = () => {
    if (token) {
      axios
        .put(`${IMAGE_DETAIL_API}/${id}`, images, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: `Update successfully`,
            life: 10000,
          });
          window.location.reload();
        })
        .catch((err) => {
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Update Failed', life: 3000 });
          // window.location.href = '/dashboard/admin/products';
        });
    }
  };
  console.log('images: ',images);

  return (
    <>
      <Toast ref={toast} />
      <form autoComplete="off" noValidate>
        <Card>
          <CardHeader title="Edit Image Detail" sx={{marginBottom: '20px'}}/>
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={2}>
                <Grid container spacing={2} justifyContent="center">
                  {images &&
                    images.map((image, index) => (
                      <Grid
                        key={index}
                        xs={12}
                        md={6}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                      >
                        <Avatar
                          src={image.url}
                          sx={{
                            height: 200,
                            mb: 2,
                            width: 200,
                            ml: 'auto',
                            mr: 'auto',
                          }}
                        />
                        <span style={codeStyle}>{`Hình ${index + 1}`}</span>
                        <UploadImage setNewAvatar={(imageUrl) => handleImageUpload(imageUrl, image.id, index)} />
                      </Grid>
                    ))}
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
              Update Image
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
}
export default ImageDetailEdit;
