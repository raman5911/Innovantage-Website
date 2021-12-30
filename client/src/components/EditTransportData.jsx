import React from "react";
import { withRouter } from "react-router-dom";

import Toast from "react-bootstrap/Toast";

import axios from "axios";

class EditTransportData extends React.Component {
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
            pickupAddress: "",
            destAddress: "",
            vehicleType: "",
            vehicleSize: "",
            packingType: "",
            otherSpecs: "",
            packagePerUnit: "",
            packageWt: "",
            shipmentWt: "",
            fileUpload: "",
            measurementUnit: "",
            length: "",
            width: "",
            height: "",
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
                pickupAddress: userData.pickup_address,
                destAddress: userData.destination_address,
                vehicleType: userData.vehicle_type,
                vehicleSize: userData.vehicle_size,
                packingType: userData.packing_type,
                otherSpecs: userData.other_specs,
                packagePerUnit: userData.package_per_unit,
                packageWt: userData.package_weight,
                shipmentWt: userData.shipment_weight,
                measurementUnit: userData.measurement_unit,
                length: userData.length,
                width: userData.width,
                height: userData.height,

                isLoaded: true,
        });
        }
    }


    goingBack(action) {
        if (action === "save") {
            var url = "/api/transportation_management/editData";

            console.log(this.state);
            
            axios
                .post(url, {
                    id: this.state.id,
                    userName: this.state.userName,
                    userAddress: this.state.userAddress,
                    userPhoneCode: this.state.userPhoneCode,
                    userPhone: this.state.userPhone,
                    userEmail: this.state.userEmail,
                    pickupAddress: this.state.pickupAddress,
                    destAddress: this.state.destAddress,
                    vehicleType: this.state.vehicleType,
                    vehicleSize: this.state.vehicleSize,
                    packingType: this.state.packingType,
                    otherSpecs: this.state.otherSpecs,
                    packagePerUnit: this.state.packagePerUnit,
                    packageWt: this.state.packageWt,
                    shipmentWt: this.state.shipmentWt,
                    measurementUnit: this.state.measurementUnit,
                    length: this.state.length,
                    width: this.state.width,
                    height: this.state.height
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
                    <h4>Shipment Details</h4>

                    <div className="inner-div">
                        <div className="form-group">
                            <label>
                                <b>Shipment Pickup Address :</b>
                            </label>
                            <input
                                type="text"
                                name="pickupAddress"
                                id="pickupAddress"
                                value={this.state.pickupAddress}
                                onChange={(e) => this.handleInput(e)}
                                placeholder="Enter Shipment Pickup Address"
                            />
                        </div>

                        <div class="form-group">
                            <label><b>Shipment Destination Address :</b></label>
                            <input type="text" name="destAddress" id="dest-address"
                                value={this.state.destAddress}
                                onChange={(e) => this.handleInput(e)} placeholder="Enter Shipment Destination Address" />
                        </div>

                        <div class="form-group">
                            <label><b>Vehicle Type :</b></label>
                            <select name="vehicleType" id="vehicle-type" value={this.state.vehicleType}
                                onChange={(e) => this.handleInput(e)}>
                                <option value="" selected disabled hidden>Select Vehicle Type</option>
                                <option value="open">Open</option>
                                <option value="container-type">Container Type</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label><b>Vehicle Size :</b></label>
                            <select name="vehicleSize" id="vehicle-size" value={this.state.vehicleSize}
                                onChange={(e) => this.handleInput(e)}>
                                <option value="" selected disabled hidden>Select Vehicle Size</option>
                                <option value="14">14'</option>
                                <option value="14">17'</option>
                                <option value="14">19'</option>
                                <option value="14">20'</option>
                                <option value="pick up tempo">Pick Up Tempo</option>
                                <option value="32 feet (SXL)">32 Feet (SXL)</option>
                                <option value="32 feet (SXL)">32 Feet (MXL)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="outer-div">
                    <h4>Commodity Details</h4>

                    <div className="inner-div">
                        <div class="form-group">
                            <label><b>Unit Packing Type :</b></label>
                            <select name="packingType" id="packing-type" value={this.state.packingType}
                                onChange={(e) => this.handleInput(e)}>
                                <option value="" selected disabled hidden>Select Unit Packing Type</option>
                                <option value="Cartons">Cartons</option>
                                <option value="Bags">Bags</option>
                                <option value="Wooden Boxes">Wooden Boxes</option>
                                <option value="Bundles">Bundles</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Drums">Drums</option>
                                <option value="Cylinders">Cylinders</option>
                                <option value="Nos">Nos</option>
                                <option value="other specification">Any other specification</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label><b>Other specifications :</b></label>
                            <input type="text" name="otherSpecs" id="other-specs" value={this.state.otherSpecs}
                                onChange={(e) => this.handleInput(e)} />
                        </div>

                        <div class="form-group">
                            <label><b>No. of Packages per Unit :</b></label>
                            <input type="text" name="packagePerUnit" id="package-per-unit" value={this.state.packagePerUnit}
                                onChange={(e) => this.handleInput(e)}
                                placeholder="Enter No. of Packages" />
                        </div>

                        <div class="form-group">
                            <label><b>Each Package Weight (in Kg) :</b></label>
                            <input type="text" name="packageWt" id="package-wt" placeholder="Enter Package Weight" value={this.state.packageWt}
                                onChange={(e) => this.handleInput(e)} />
                        </div>

                        <div class="form-group">
                            <label><b>Shipment Weight (in Kg) :</b></label>
                            <input type="text" name="shipmentWt" id="shipment-wt" placeholder="Enter Shipment Weight" value={this.state.shipmentWt}
                                onChange={(e) => this.handleInput(e)} />
                        </div>
                    </div>
                </div>

                <div className="outer-div">
                    <h4>Package Dimensions</h4>
                    <div className="inner-div">
                        <div class="form-group">
                            <label><b>Unit of Measurement :</b></label>
                            <select name="measurementUnit" id="measurement-unit" value={this.state.measurementUnit}
                                onChange={(e) => this.handleInput(e)}>
                                <option value="" selected disabled hidden>Select Unit of Measurement</option>
                                <option value="mm">mm</option>
                                <option value="cms">cms</option>
                                <option value="Inches">Inches</option>
                                <option value="Feet">Feet</option>
                                <option value="Metre">Metre</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label><b>Length :</b></label>
                            <input type="text" name="length" id="length" value={this.state.length}
                                onChange={(e) => this.handleInput(e)} placeholder="Enter Length in selected unit" />
                        </div>
                        <div class="form-group">
                            <label><b>Width :</b></label>
                            <input type="text" name="width" id="width" value={this.state.width}
                                onChange={(e) => this.handleInput(e)} placeholder="Enter Width in selected unit" />
                        </div>
                        <div class="form-group">
                            <label><b>Height :</b></label>
                            <input type="text" name="height" id="height" value={this.state.height}
                                onChange={(e) => this.handleInput(e)} placeholder="Enter Height in selected unit" />
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

export default withRouter(EditTransportData);
