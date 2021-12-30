import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

class ShowTransportData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            id: "",
            isLoaded: false,
        };
    }

    fetchData(userId) {
        var url = "/api/search/" + userId;

        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);

                this.setState(
                    {
                        user: result[0],
                        isLoaded: true,
                        id: userId,
                    },
                    function () {
                        console.log(this.state.user);
                    }
                );
            });
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.fetchData(this.props.location.state.id);
        }

        console.log(this.state.id);
    }

    editData(user) {
        this.props.history.push("/dashboard/editTransportData", {
            userData: user,
        });
        this.fetchData(this.state.id);
    }

    render() {
        var user = this.state.user;
        console.log(user);

        var statusClass = {
            "Not Assigned": "notAssigned",
            Assigned: "assigned",
            Pending: "pending",
            Completed: "completed",
        };

        if (!this.state.isLoaded) {
            return (
                <div className="container">
                    <div className="loading-box">
                        <div className="loading-animation"></div>
                    </div>
                </div>
            );
        } else if (this.state.id === "") {
            return (
                <div className="container">
                    <h3>Oops !</h3>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <button
                        className="editBtn"
                        onClick={(pressEdit) => this.editData(user)}
                    >
                        <FontAwesomeIcon
                            icon={faPencilAlt}
                            className="optionIcon"
                        />
						Edit
					</button>

                    <div className="outer-div">
                        <h4>Order Details</h4>

                        <div className="inner-div">
                            <p>
                                {" "}
                                <b>Order Id:</b> {user._id}{" "}
                            </p>
                            <p>
                                <b>Requested Service:</b> {user.service}{" "}
                            </p>
                            <p>
                                <b>Status:</b>{" "}
                                <span className={statusClass[user.status]}>
                                    {user.status}
                                </span>{" "}
                            </p>
                        </div>
                    </div>

                    <div className="outer-div">
                        <h4>Customer Details</h4>

                        <div className="inner-div">
                            <p>
                                <b>Customer's Name:</b> {user.user_name}{" "}
                            </p>
                            <p>
                                <b>Customer's Address:</b> {user.user_address}{" "}
                            </p>
                            <p>
                                <b>Customer's Phone Number:</b> (+
								{user.user_country_code}){" "}
                                {user.user_phone_number}{" "}
                            </p>
                            <p>
                                <b>Customer's Email Address:</b>{" "}
                                {user.user_email_address}{" "}
                            </p>
                        </div>
                    </div>

                    <div className="outer-div">
                        <h4>Shipment Details</h4>

                        <div className="inner-div">
                            <p>
                                <b>Shipment Pickup Address:</b> {user.pickup_address}{" "}
                            </p>
                            <p>
                                <b>Shipment Destination Address:</b> {user.destination_address}{" "}
                            </p>                            
                            <p>
                                <b>Vehicle Type:</b> {user.vehicle_type}
                            </p>
                            <p>
                                <b>Vehicle Size:</b> {user.vehicle_size}
                            </p>
                        </div>
                    </div>

                    <div className="outer-div">
                        <h4>Commodity Details</h4>

                        <div className="inner-div">
                            <p>
                                <b>Unit Packing Type:</b> {user.packing_type}
                            </p>
                            <p>
                                <b>Other Specifications:</b> {user.other_specs}
                            </p>
                            <p>
                                <b>No. of Packages per Unit:</b> {user.package_per_unit}
                            </p>
                            <p>
                                <b>Each Package Weight (in Kg):</b> {user.package_weight}
                            </p>
                            <p>
                                <b>Shipment Weight (in Kg):</b> {user.shipment_weight}
                            </p>
                            {/* <p>
                                <b>File Document:</b>
                            </p> */}
                        </div>
                    </div>

                    <div className="outer-div">
                        <h4>Package Dimensions</h4>
                        <div className="inner-div">
                            <p>
                                <b>Unit of Measurement:</b> {user.measurement_unit}{" "}
                            </p>
                            <p>
                                <b>Length: </b>
                                {user.length}
                            </p>
                            <p>
                                <b>Width: </b>
                                {user.width}
                            </p>
                            <p>
                                <b>Height: </b>
                                {user.height}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ShowTransportData;
