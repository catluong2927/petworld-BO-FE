import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function ProductAdd(){
    // const PRODUCT_API = `${process.env.REACT_APP_FETCH_API}/products`;

    // const [products, setProducts] = useState({});


    // function handleChange(event){
    //     setProducts({
    //         ...products,
    //         [event.target.name]: event.target.value
    //     });
    // }

    // function handleSubmit(){
    //     axios
    //     .post(`${PRODUCT_API}`, products)
    //     .then(res => {
    //         window.location.href = "/products"
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     });
    // }
    


    return (
            <div>
                <h1>Add new product !</h1>
                {/* <form>
                    <div>
                        <label>Name</label>
                        <input name="name" value={products.name || ""} 
                        onChange={handleChange} 
                        placeholder="Enter product name"/>
                    </div>
                </form> */}
            </div>
      );
}