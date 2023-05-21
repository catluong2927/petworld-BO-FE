import React, { useState } from 'react';
import axios from "axios";
import { Cloudinary } from 'cloudinary-core';
import { Button } from '@mui/material';
import '../../css/style.css'

const UploadImage = (props) => {
    const presetKey = "UserImage";
    const cloudName = "dr3rwgzpl";
    const apiKey = "552921944827948";
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const cloudinary = new Cloudinary({ cloud_name: cloudName });
    const [fileImage, setFileImage] = useState(null);

    const handleFileInputChange = (event) => {
        setFileImage(event.target.files[0]);
        // handleUploadButtonClick(event);
    };

    const handleUploadButtonClick = (e) => {
        e.preventDefault();
        if (fileImage) {
            const data = new FormData();
            data.append("file", fileImage);
            data.append("upload_preset", presetKey);

            data.append("apiKey", apiKey);
            data.append("timestamp", timestamp);

            axios
                .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data)
                .then(res => {
                    props.setNewAvatar(cloudinary.url(res.data.secure_url));
                })
                .catch(err => console.log(err))
        }
    };

    return (
        <>
            <input type="file" onChange={handleFileInputChange} />
            <Button fullWidth
                variant="contained"
                component="label"
                onClick={handleUploadButtonClick}
            >
                Upload File
            </Button>
        </>
    );
};

export default UploadImage;
