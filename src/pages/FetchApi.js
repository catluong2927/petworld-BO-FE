import {redirect} from "react-router-dom";

export const sentRequest = async (url, method = 'GET', data = null) =>{
    const API = "http://localhost:8080/api";
    console.log("running")
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (data) {
            options.body = JSON.stringify(data);
            const responsePost = await fetch(`${API}/${url}`, options);
            return redirect("/cart")
        }
        const response = await fetch(`${API}/${url}`, options);
        if (!response.ok) {
            throw new Error('Request failed');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        // Handle error here
        console.error('Error:', error.message);
        // You can choose to throw an error or return a default value
        throw error;
    }
}