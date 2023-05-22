import axios from "axios";

const ServiceDelete = (props) => {
    const SERVICE_MANAGEMENT_API = "http://localhost:8080/api";

    function removeService() {
    console.log(props.id)
        if (props.id) {
            axios
                .delete(`${SERVICE_MANAGEMENT_API}/services/${props.id}`)
                .then(res => {
                    alert(
                        `Remove service ${JSON.stringify(
                            res.data
                        )} successfully!!!`
                    );
                })
                .catch(err => {
                    throw err;
                });
        }
    }

    return(
        <div>
            <button className={"button-delete"} type="button" onClick={removeService}>
                Remove
            </button>
        </div>
    )
}
export default ServiceDelete;