import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function ServiceDetails() {
    const SERVICE_MANAGEMENT_API = "http://localhost:8080/api";
    const { serviceId } = useParams();
    const [service, setService] = useState([]);

    useEffect(() => {
        if (serviceId) {
            axios
                .get(`${SERVICE_MANAGEMENT_API}/services/${serviceId}`)
                .then(res => {
                    setService(res.data);
                })
                .catch(err => {
                    throw err;
                });
        }
    }, [serviceId]);

    function getServices() {
        window.location.href = "/";
    }

    return (
        <div>
            <h1>Service Details</h1>
            <p><b>Id:</b> {service.id}</p>
            <p><b>Name:</b> {service.name}</p>
            <p><b>Email:</b> {service.email}</p>
            <p><b>Job:</b> {service.job}</p>
            <button type="button" onClick={getServices}>
                Back
            </button>&nbsp;
        </div>
    );
}

export default ServiceDetails;