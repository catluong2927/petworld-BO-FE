import { TextField, Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import '../css/ProductAdd.css'

export default function ProductAdd() {
    const toast = useRef(null);
  const PRODUCT_API = `${process.env.REACT_APP_FETCH_API}/products`;

  const [products, setProducts] = useState({});

  function handleChange(event) {
    setProducts({
      ...products,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit() {
    axios
      .post(`${PRODUCT_API}`, products)
      .then((res) => {
        window.location.href = '/products';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
    <h1 className="form-title">Add a new product!</h1>
    <div className="form-group">
        <TextField label="Name" required className="input-field" />
        <TextField label="Description" required className="input-field" />
    </div>
    <br />
    <div className="form-group">
        <TextField label="Image" required className="input-field" />
        <TextField label="Price" required className="input-field" />
    </div>
    <br />
    <div className="form-group">
        <TextField label="Product Code" required className="input-field" />
        <TextField label="Protein" className="input-field" />
    </div>
    <br />
    <div className="form-group">
        <TextField label="Fats" className="input-field" />
        <TextField label="Carbohydrates" className="input-field" />
    </div>
    <br />
    <div className="form-group">
        <TextField label="Minerals" className="input-field" />
        <TextField label="Vitamins" className="input-field" />
    </div>
    <br />
    <div className="form-group">
        <TextField label="Animal" className="input-field" />
        <TextField label="Sale" defaultValue={0} className="input-field" />
    </div>
    <br />
    <div className="form-group">
        <TextField label="Tag" className="input-field" />
        <TextField label="URL" className="input-field" />
    </div>
    <br />
    <Button type="submit" variant="contained" color="primary" className="submit-button">
        Add Product
    </Button>
</form>

  );
}
