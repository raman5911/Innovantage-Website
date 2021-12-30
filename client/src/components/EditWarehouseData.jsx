import React from "react";
import { withRouter } from "react-router-dom";

import Toast from "react-bootstrap/Toast";

import axios from "axios";

class EditWarehouseData extends React.Component {
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
            warehouseCity: "",
            specificLocation: "",
            coveredArea: "",
            openArea: "",
            commodityStorage: "",
            infraOptions: "",
            manpowOptions: "",
            securityOptions: "",
            otherReq: "",
            workScope: "",
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
                warehouseCity: userData.warehouse_city,
                specificLocation: userData.specific_location,
                coveredArea: userData.covered_area,
                openArea: userData.open_area,
                commodityStorage: userData.commodity_storage,
                infraOptions: userData.infrastructure_options,
                manpowOptions: userData.manpower_options,
                securityOptions: userData.security_options,
                otherReq: userData.other_requirements,
                workScope: userData.work_scope,

                isLoaded: true,
        });
        }
    }


    goingBack(action) {
        if (action === "save") {
            var url = "/api/warehouse_management/editData";

            console.log(this.state);
            
            axios
                .post(url, {
                    id: this.state.id,
                    userName: this.state.userName,
                    userAddress: this.state.userAddress,
                    userPhoneCode: this.state.userPhoneCode,
                    userPhone: this.state.userPhone,
                    userEmail: this.state.userEmail,
                    warehouseCity: this.state.warehouseCity,
                    specificLocation: this.state.specificLocation,
                    coveredArea: this.state.coveredArea,
                    openArea: this.state.openArea,
                    commodityStorage: this.state.commodityStorage,
                    infraOptions: this.state.infraOptions,
                    manpowOptions: this.state.manpowOptions,
                    securityOptions: this.state.securityOptions,
                    otherReq: this.state.otherReq,
                    workScope: this.state.workScope
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
                    <h4>Requirement Details</h4>

                    <div className="inner-div">
                        <div class="form-group">
                            <label><b>Warehouse City :</b></label>
                            <input type="text" name="warehouseCity" id="warehouse-city" value={this.state.warehouseCity}
                                onChange={(e) => this.handleInput(e)} placeholder="Enter City" />
                        </div>

                        <div class="form-group">
                            <label><b>Specific Location :</b></label>
                            <input type="text" name="specificLocation" id="specific-location"
                                value={this.state.specificLocation}
                                onChange={(e) => this.handleInput(e)} placeholder="Enter Location Address" />
                        </div>

                        <div class="form-group">
                            <label><b>Required Covered Area (in SQFT) :</b></label>
                            <input type="text"
                            name="coveredArea" id="covered-area" value={this.state.coveredArea}
                            onChange={(e) => this.handleInput(e)} placeholder="Enter Required Covered Area" />
                        </div>

                        <div class="form-group">
                            <label><b>Required Open Area (in SQFT) :</b></label>
                            <input type="text"
                            name="openArea" id="open-area" value={this.state.openArea}
                            onChange={(e) => this.handleInput(e)} placeholder="Enter Required Open Area" />
                        </div>                        

                        <div class="form-group">
                            <label><b>Commodity Storage :</b></label>
                            <input type="text" name="commodityStorage" id="commodity-storage" value={this.state.commodityStorage}
                            onChange={(e) => this.handleInput(e)}
                                placeholder="Enter Commodity Storage" />
                        </div>

                        <div class="form-group">
                            <label><b>Infrastructure Requirement :</b></label>
                            <select name="infraOptions" id="infra-options" value={this.state.infraOptions}
                            onChange={(e) => this.handleInput(e)}>
                                <option value="" selected disabled hidden>Select Yes/No</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label><b>Manpower Requirement :</b></label>
                            <select name="manpowOptions" id="manpow-options" value={this.state.manpowOptions}
                            onChange={(e) => this.handleInput(e)}>
                                <option value="" selected disabled hidden>Select Yes/No</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label><b>Security Personnel / CCTV Requirement :</b></label>
                            <select name="securityOptions" id="security-options" value={this.state.securityOptions}
                            onChange={(e) => this.handleInput(e)}>
                                <option value="" selected disabled hidden>Select Yes/No</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <div>
                                <label><b>Other Infrastucture Requirements :</b></label>
                            </div>

                            <textarea name="otherReq" id="other-req" value={this.state.otherReq}
                            onChange={(e) => this.handleInput(e)} cols="40" rows="7"
                                placeholder="Enter other requirements (if any)"></textarea>
                        </div>

                        <div class="form-group">
                            <div>
                                <label><b>Scope of Work :</b></label>
                            </div>

                            <textarea name="workScope" id="work-scope" value={this.state.workScope}
                            onChange={(e) => this.handleInput(e)} cols="40" rows="7"></textarea>
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

export default withRouter(EditWarehouseData);
