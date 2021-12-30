import React from "react";
import { withRouter } from "react-router-dom";

import Toast from "react-bootstrap/Toast";

import axios from "axios";

class EditValueAddedData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            id: "",
            userName: "",
            userAddress: "",
            userPhoneCode: "",
            userPhone: "",
            userEmail: "",
            serviceType: "",

            fileUpload: "",
            showSuccessMessage: false,
            showErrorMessage: false,
            isLoaded: false,
        };
    }

    componentDidMount() {
        if (this.props.location.state) {
            console.log(this.props.location);

            var userData = this.props.location.state.userData;
            this.setState({
                user: userData,
                id: userData._id,
                userName: userData.user_name,
                userAddress: userData.user_address,
                userPhoneCode: userData.user_country_code,
                userPhone: userData.user_phone_number,
                userEmail: userData.user_email_address,
                serviceType: userData.service_type,

                isLoaded: true,
        });
        }
    }


    goingBack(action) {
        if (action === "save") {
            var url = "/api/value_added_services/editData";

            console.log(this.state);
            
            axios
                .post(url, {
                    id: this.state.id,
                    userName: this.state.userName,
                    userAddress: this.state.userAddress,
                    userPhoneCode: this.state.userPhoneCode,
                    userPhone: this.state.userPhone,
                    userEmail: this.state.userEmail,
                    serviceType: this.state.serviceType
                })
                .then((response) => {
                    console.log(response.status);

                    this.setState({
                        showSuccessMessage: true,
                        isLoaded: false,
                    });

                    setTimeout(() => this.props.history.goBack(), 1000);
                })
                .catch((err) => {
                    console.log(err);

                    this.setState({
                        showErrorMessage: true,
                    });
                });
        } else this.props.history.goBack();
    }

    handleInput(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState(
            {
                [name]: value,
            },
            () => {
                console.log(value);
            }
        );
    }
    handleSubmit(event) {
        event.preventDefault();
    }

    renderForm() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <h2>Edit Details</h2>

                <div className="outer-div">
                    <h4>Customer Details</h4>

                    <div className="inner-div">
                        <div className="form-group long">
                            <label>
                                <b>Name :</b>
                            </label>
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                value={this.state.userName}
                                onChange={(e) => this.handleInput(e)}
                                placeholder="Enter your Full Name"
                                required
                            />
                        </div>

                        <div className="form-group long">
                            <label>
                                <b>Address :</b>
                            </label>
                            <input
                                type="text"
                                name="userAddress"
                                id="userAddress"
                                value={this.state.userAddress}
                                onChange={(e) => this.handleInput(e)}
                                placeholder="Enter your address"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <b>Country Code :</b>
                            </label>
                            <input
                                type="text"
                                name="userPhoneCode"
                                id="userPhoneCode"
                                value={this.state.userPhoneCode}
                                onChange={(e) => this.handleInput(e)}
                                placeholder="+ (Country Code)"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <b>Contact Number :</b>
                            </label>
                            <input
                                type="tel"
                                name="userPhone"
                                id="userPhone"
                                value={this.state.userPhone}
                                onChange={(e) => this.handleInput(e)}
                                placeholder="Contact Number"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <b>Email Address :</b>
                            </label>
                            <input
                                type="email"
                                name="userEmail"
                                id="userEmail"
                                value={this.state.userEmail}
                                onChange={(e) => this.handleInput(e)}
                                placeholder="Enter your Email Address"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="outer-div">
                    <h4>Service Specification</h4>

                    <div className="inner-div">
                    <div class="form-group">
                            <label><b>Type of Value Addded Services :</b></label>
                            <select name="serviceType" id="service-type" value={this.state.serviceType}
                                onChange={(e) => this.handleInput(e)}>
                                <option value="" selected disabled hidden>Select Type of Service</option>
                                <option value="BIS">BIS</option>
                                <option value="DGFT">DGFT</option>
                                <option value="E-Waste">E-Waste</option>
                                <option value="Customs">Customs</option>
                                <option value="MOEFCC">MOEFCC</option>
                                <option value="FSSAI">FSSAI</option>
                                <option value="Other Regulatory / Licensing Approvals">Other Regulatory / Licensing
                                    Approvals
                                </option>
                                <option value="Logistics">Logistics</option>
                                <option value="Charted Engineer Certificate">Charted Engineer Certificate</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    className="cancel"
                    onClick={(goBack) => this.goingBack("cancel")}
                >
                    Cancel
				</button>
                <button
                    className="save"
                    onClick={(goBack) => this.goingBack("save")}
                >
                    Save
				</button>
            </form>
        );
    }

    setShow(name, value) {
        this.setState({
            [name]: value,
        });
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

        if (user.length < 1) {
            return (
                <div className="container">
                    <h3>Oops !</h3>
                </div>
            );
        } else if (!this.state.isLoaded) {
            return (
                <div className="container">
                    <Toast
                        onClose={() =>
                            this.setShow("showSuccessMessage", false)
                        }
                        show={this.state.showSuccessMessage}
                        delay={2000}
                        autohide
                        className="success-toast"
                    >
                        <Toast.Header>
                            <strong className="me-auto">Success !</strong>
                            <small className="time">Few Seconds ago</small>
                        </Toast.Header>
                        <Toast.Body>Changes Saved Successfully.</Toast.Body>
                    </Toast>

                    <div className="loading-box">
                        <div className="loading-animation"></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="outer-div">
                        <Toast
                            onClose={() =>
                                this.setShow("showErrorMessage", false)
                            }
                            show={this.state.showErrorMessage}
                            delay={5000}
                            autohide
                            className="error-toast"
                        >
                            <Toast.Header>
                                <strong className="me-auto">Error !</strong>
                                <small className="time">Few Seconds ago</small>
                            </Toast.Header>
                            <Toast.Body>
                                An Error Occured while saving the changes.
                                Please go back/refresh and try again.
							</Toast.Body>
                        </Toast>

                        <p>
                            <b>Order Id :</b> {user._id}
                        </p>
                        <p>
                            <b>Requested Service :</b> {user.service}
                        </p>
                        <p>
                            <b>Status :</b> <span className={statusClass[user.status]}> {user.status}</span>
                        </p>
                    </div>

                    <div className="outer-div">{this.renderForm()}</div>
                </div >
            );
        }
    }
}

export default withRouter(EditValueAddedData);
