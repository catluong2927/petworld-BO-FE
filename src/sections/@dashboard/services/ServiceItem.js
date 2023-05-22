import {Link} from "react-router-dom";
import ServiceDelete from "./ServiceDelete";
// import './ServiceItem.css'

const ServiceItem = (props) =>{
    return (
        <div className="service-table-container">
            <table className="service-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Active</th>
                    <th>Description</th>
                    <th colSpan={3}>Action</th>
                </tr>
                </thead>
                <tbody>
                {props.items.map(service => (
                    <tr key={service.id}>
                        <td>{service.id} </td>
                        <td>{service.name} </td>
                        <td>{service.price}$ </td>
                        <td>{service.active} </td>
                        <td>{service.description} </td>
                        <td>
                            <Link className="service-table-button" to={`/service/${service.id}`}>Detail</Link>
                        </td>
                        <td>
                            <Link className="service-table-button" to={`/service/edit/${service.id}`}>Edit</Link>
                        </td>
                        <td>
                            <ServiceDelete id={service.id} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ServiceItem;