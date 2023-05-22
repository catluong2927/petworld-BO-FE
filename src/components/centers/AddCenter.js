import {Button, TextField} from "@mui/material";
import {useRef} from "react";
import classes from "./AddCenter.module.css"

export const AddCenter = () => {
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();
    function submitHandler(event) {
        event.preventDefault();
        const enteredTitle = titleInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const meetupData = {
            title: enteredTitle,
            image: enteredImage,
            address: enteredAddress,
            description: enteredDescription,
        };
    }
    return (
        <>

        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <h3 >Meetup Title</h3>
                <input type='text' required id="title" ref={titleInputRef}/>
            </div>
            <div className={classes.control}>
                <h3>Meetup Image</h3>
                <input type='url' required id='image' ref={imageInputRef}/>
            </div>
            <div className={classes.control}>
                <h3>Address</h3>
                <input type='text' required id='address' ref={addressInputRef}/>
            </div>
            <div className={classes.control}>
                <h3 >Description</h3>
                <textarea
                    id='description'
                    required
                    rows='5'
                    ref={descriptionInputRef}
                ></textarea>
            </div>
            <div className={classes.actions}>
                <button>Add Meetup</button>
            </div>
        </form>
        </>
    );
}