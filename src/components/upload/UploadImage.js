import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cloudinary } from 'cloudinary-core';
import '../../css/style.css';

const UploadImage = (props) => {
  const presetKey = 'vomas9sd';
  const cloudName = 'dhnom0aq3';
  const apiKey = '765763525994293';
  const timestamp = Math.round(new Date().getTime() / 1000);
  const cloudinary = new Cloudinary({ cloud_name: cloudName });
  const [fileImage, setFileImage] = useState(null);

  const handleFileInputChange = (e) => {
    setFileImage(e.target.files[0]);
  };

  const handleUploadButtonClick = (e) => {
    console.log('2');
    e.preventDefault();
    if (fileImage) {
      const data = new FormData();
      data.append('file', fileImage);
      data.append('upload_preset', presetKey);

      data.append('apiKey', apiKey);
      data.append('timestamp', timestamp);

      axios
        .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data)
        .then((res) => {
          props.setNewAvatar(cloudinary.url(res.data.secure_url));
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (fileImage) {
      const data = new FormData();
      data.append('file', fileImage);
      data.append('upload_preset', presetKey);

      data.append('apiKey', apiKey);
      data.append('timestamp', timestamp);

      console.log(data);

      axios
        .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data)
        .then((res) => {
          props.setNewAvatar(cloudinary.url(res.data.secure_url));
        })
        .catch((err) => console.log(err));
    }
  }, [fileImage]);

  return (
    <>
      <input type="file" className="custom-file-input" onChange={handleFileInputChange} />
    </>
  );
};

export default UploadImage;
