import { createBrowserHistory } from 'history';
import axios from 'axios';
import {
    searchProduct,
    searchError,
    searchSuccess
} from './productSlice'
import { Navigate } from 'react-router-dom';


export const browserHistory = createBrowserHistory();
export const searchByName = async(product, dispatch, Navigate, toast) => {
    const PRODUCT_API = process.env.REACT_APP_FETCH_API;
    dispatch(searchProduct());
    try{
        const res = await axios.get(`${PRODUCT_API}/productBo/search`)
    } catch{
        console.log('hello')
    }
}