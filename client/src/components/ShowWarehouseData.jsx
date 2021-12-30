import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

class ShowWarehouseData extends React.Component {
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
        this.props.history.push("/dashboard/editWarehouseData", {
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
                        <h4>Requirement Details</h4>

                        <div className="inner-div">
                            <p>
                                <b>Warehouse City:</b> {user.warehouse_city}{" "}
                            </p>
                            <p>
                                <b>Specific Location:</b> {user.specific_location}{" "}
                            </p>                            
                            <p>
                                <b>Required Covered Area (in SQFT):</b> {user.covered_area}
                            </p>
                            <p>
                                <b>Required Open Area (in SQFT):</b> {user.open_area}
                            </p>
                            <p>
                                <b>Commodity Storage:</b> {user.commodity_storage}
                            </p>
                            <p>
                                <b>Infrastructure Requirement:</b> {user.infrastructure_options}
                            </p>
                            <p>
                                <b>Manpower Requirement:</b> {user.manpower_options}
                            </p>
                            <p>
                                <b>Security Personnel / CCTV Requirement</b> {user.security_options}
                            </p>
                            <p>
                                <b>Other Infrastucture Requirements:</b> {user.other_requirements}
                            </p>
                            <p>
                                <b>Scope of Work:</b> {user.work_scope}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ShowWarehouseData;
