import {useEffect, useState} from "react";
import axios from "axios";
import ServiceItem from "./ServiceItem";

const ServiceList = () => {
    const SERVICE_MANAGEMENT_API = "http://localhost:8080/api";
    const [services, setPackages] = useState([]);

    useEffect(() => {
        axios
            .get(`${SERVICE_MANAGEMENT_API}/services`)
            .then(res => {
                console.log(res.data.content)
                setPackages(res.data.content);
            })
            .catch(err => {
                throw err;
            })
    }, []);


    const handleCreate = () => {
        window.location.href = "/service/add"
    }

    return (
        <div className="service-list-container">
            <h1 className="service-list-title">PACKAGE MANAGEMENT</h1>
            <div className="service-list-actions">
                    <button className="service-list-button" type="button" onClick={handleCreate}>Create New Package</button>
            </div>
            <ServiceItem items={services} />
        </div>
    )
}
export default ServiceList;