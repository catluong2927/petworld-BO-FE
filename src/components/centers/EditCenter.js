import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import classes from "./AddCenter.module.css"
import {sentRequest} from "../../pages/FetchApi";

export const EditCenter = () => {
    const nameInputRef = useRef();
    const phoneInputRef = useRef();
    const emailInputRef = useRef();
    const addressInputRef = useRef();
    const id = useParams();
    const navigation = useNavigate();
    const [center , setCenter]= useState({});
    const URL_CENTER_EDIT = `centers/${id.id}`;

    useEffect(() => {
        const res = sentRequest(URL_CENTER_EDIT);
        res.then(data => {
            setCenter(data);
            console.log(center)
        })
    }, [])

    function submitHandler(event) {
        event.preventDefault();
        const enteredTitle = nameInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredEmail = phoneInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const centerData = {
            id: id.id,
            name: enteredTitle,
            phone: enteredPhone,
            email: enteredEmail,
            address: enteredAddress,
            isActive: true,
        };
        const res = sentRequest(URL_CENTER_EDIT, "PUT",centerData);
        res.then((data) => {
            alert("Edit center successfully")
        }).catch((data) => {
            alert("Failed editing!")
        });
        navigation("/dashboard/centers")
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <h3 >Name</h3>
                <input type='text' required id="title" ref={nameInputRef} defaultValue={center.name}/>
            </div>
            <div className={classes.control}>
                <h3>Phone</h3>
                <input type='number' required id='image' ref={phoneInputRef} defaultValue={center.phone}/>
            </div>
            <div className={classes.control}>
                <h3>Email</h3>
                <input type='email' required id='image' ref={emailInputRef} defaultValue={center.email}/>
            </div>
            <div className={classes.control}>
                <h3>Address</h3>
                <input type='text' required id='address' ref={addressInputRef} defaultValue={center.address}/>
            </div>
            <div className={classes.actions}>
                <button>Edit Center</button>
            </div>
        </form>
    );
}