import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import classes from "./AddCenter.module.css"
import {sentRequest} from "../../pages/FetchApi";

export const AddCenter = () => {
    const nameInputRef = useRef();
    const phoneInputRef = useRef();
    const emailInputRef = useRef();
    const addressInputRef = useRef();
    const navigation = useNavigate();
    const URL_CENTERS = "centers";
    function submitHandler(event) {
        event.preventDefault();
        const enteredTitle = nameInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredEmail = phoneInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;

        const centerData = {
            name: enteredTitle,
            phone: enteredPhone,
            email: enteredEmail,
            address: enteredAddress,
            isActive: true,
        };
        const res = sentRequest(URL_CENTERS, "POST",centerData);
        res.then((data) => {
            alert("Create center successfully")
        }).catch((data) => {
            alert("Failed creation!")
        });
        navigation("/dashboard/centers")
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <h3 >Name</h3>
                <input type='text' required id="title" ref={nameInputRef}/>
            </div>
            <div className={classes.control}>
                <h3>Phone</h3>
                <input type='number' required id='image' ref={phoneInputRef}/>
            </div>
            <div className={classes.control}>
                <h3>Email</h3>
                <input type='email' required id='image' ref={emailInputRef}/>
            </div>
            <div className={classes.control}>
                <h3>Address</h3>
                <input type='text' required id='address' ref={addressInputRef}/>
            </div>
            <div className={classes.actions}>
                <button>Add Center</button>
            </div>
        </form>
    );
}