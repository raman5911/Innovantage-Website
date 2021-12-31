import React from "react";
import { withRouter } from "react-router-dom";

import Toast from "react-bootstrap/Toast";

import axios from "axios";

import "./style.css";

class EditFreightData extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: [],
            id: "",
			shipmentType: "",
			deliveryIncoterms: "",
			userName: "",
			userAddress: "",
			userPhoneCode: "",
			userPhone: "",
			userEmail: "",
			pickupAddress: "",
			pickupCode: "",
			pickupPhoneCode: "",
			pickupPhone: "",
			pickupFrom: "",
			originPort: "",
			dropTo: "",
			destinationPort: "",
			shipmentMode: "",
			commodityName: "",
			commodityType: "",
			fileUpload: "",
			containerType: "",
			grossWeight: "",
			numOfPkg: "",
			totalVolume: "",

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
				shipmentType: userData.shipment_type,
				deliveryIncoterms: userData.delivery_incoterms,
				userName: userData.user_name,
				userAddress: userData.user_address,
				userPhoneCode: userData.user_country_code,
				userPhone: userData.user_phone_number,
				userEmail: userData.user_email_address,
				pickupAddress: userData.shipment_address,
				pickupCode: userData.code,
				pickupPhoneCode: userData.shipment_country_code,
				pickupPhone: userData.shipment_phone_number,
				pickupFrom: userData.shipment_from,
				originPort: userData.origin_port,
				dropTo: userData.shipment_to,
				destinationPort: userData.destination_port,
				shipmentMode: userData.shipment_mode,
				commodityName: userData.commodity_name,
				commodityType: userData.commodity_type,
				containerType: userData.container_type,
				grossWeight: userData.gross_weight,
				numOfPkg: userData.number_of_packages,
				totalVolume: userData.total_volume,

				isLoaded: true,
			});
		}
	}

	goingBack(action) {
		if (action === "save") {
			var url = "/api/freight/editData";

			axios
				.post(url, {
                    id: this.state.id,
					shipmentType: this.state.shipmentType,
					deliveryIncoterms: this.state.deliveryIncoterms,
					userName: this.state.userName,
					userAddress: this.state.userAddress,
					userPhoneCode: this.state.userPhoneCode,
					userPhone: this.state.userPhone,
					userEmail: this.state.userEmail,
					pickupAddress: this.state.pickupAddress,
					pickupCode: this.state.pickupCode,
					pickupPhoneCode: this.state.pickupPhoneCode,
					pickupPhone: this.state.pickupPhone,
					pickupFrom: this.state.pickupFrom,
					originPort: this.state.originPort,
					dropTo: this.state.dropTo,
					destinationPort: this.state.destinationPort,
					shipmentMode: this.state.shipmentMode,
					commodityName: this.state.commodityName,
					commodityType: this.state.commodityType,
					containerType: this.state.containerType,
					grossWeight: this.state.grossWeight,
					numOfPkg: this.state.numOfPkg,
					totalVolume: this.state.totalVolume
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
								<b> Shipment Type : </b>
							</label>
							<select
								name="shipmentType"
								id="shipmentType"
								value={this.state.shipmentType}
								onChange={(e) => this.handleInput(e)}
							>
								<option value="Import">Import</option>
								<option value="Export">Export</option>
							</select>
						</div>

						<div className="form-group">
							<label>
								<b>Delivery Incoterms :</b>
							</label>
							<select
								name="deliveryIncoterms"
								id="deliveryIncoterms"
								value={this.state.deliveryIncoterms}
								onChange={(e) => this.handleInput(e)}
							>
								<option value="FOB">FOB</option>
								<option value="EX-WORKS">EX-WORKS</option>
								<option value="CIF/CIP">CIF/CIP</option>
								<option value="DDU">DDU</option>
							</select>
						</div>

						<div className="form-group long">
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

						<div className="form-group">
							<label>
								<b>ZIP/PIN Code :</b>
							</label>
							<input
								type="number"
								name="pickupCode"
								id="pickupCode"
								value={this.state.pickupCode}
								onChange={(e) => this.handleInput(e)}
								placeholder="Enter ZIP or PIN Code"
							/>
						</div>

						<div className="form-group">
							<label>
								<b>Country Code :</b>
							</label>
							<input
								type="text"
								name="pickupPhoneCode"
								id="pickupPhoneCode"
								value={this.state.pickupPhoneCode}
								onChange={(e) => this.handleInput(e)}
								placeholder="+ (Country Code)"
							/>
						</div>

						<div className="form-group">
							<label>
								<b>Contact Number :</b>
							</label>
							<input
								type="tel"
								name="pickupPhone"
								id="pickupPhone"
								value={this.state.pickupPhone}
								onChange={(e) => this.handleInput(e)}
								placeholder="Contact Number"
							/>
						</div>

						<div className="form-group">
							<label>
								<b>Shipment From (Select Country) :</b>
							</label>
							<select
								name="pickupFrom"
								id="pickupFrom"
								value={this.state.pickupFrom}
								onChange={(e) => this.handleInput(e)}
							>
								<option value="Afganistan">Afghanistan</option>
								<option value="Albania">Albania</option>
								<option value="Algeria">Algeria</option>
								<option value="American Samoa">
									American Samoa
							</option>
								<option value="Andorra">Andorra</option>
								<option value="Angola">Angola</option>
								<option value="Anguilla">Anguilla</option>
								<option value="Antigua & Barbuda">
									Antigua & Barbuda
							</option>
								<option value="Argentina">Argentina</option>
								<option value="Armenia">Armenia</option>
								<option value="Aruba">Aruba</option>
								<option value="Australia">Australia</option>
								<option value="Austria">Austria</option>
								<option value="Azerbaijan">Azerbaijan</option>
								<option value="Bahamas">Bahamas</option>
								<option value="Bahrain">Bahrain</option>
								<option value="Bangladesh">Bangladesh</option>
								<option value="Barbados">Barbados</option>
								<option value="Belarus">Belarus</option>
								<option value="Belgium">Belgium</option>
								<option value="Belize">Belize</option>
								<option value="Benin">Benin</option>
								<option value="Bermuda">Bermuda</option>
								<option value="Bhutan">Bhutan</option>
								<option value="Bolivia">Bolivia</option>
								<option value="Bonaire">Bonaire</option>
								<option value="Bosnia & Herzegovina">
									Bosnia & Herzegovina
							</option>
								<option value="Botswana">Botswana</option>
								<option value="Brazil">Brazil</option>
								<option value="British Indian Ocean Ter">
									British Indian Ocean Ter
							</option>
								<option value="Brunei">Brunei</option>
								<option value="Bulgaria">Bulgaria</option>
								<option value="Burkina Faso">Burkina Faso</option>
								<option value="Burundi">Burundi</option>
								<option value="Cambodia">Cambodia</option>
								<option value="Cameroon">Cameroon</option>
								<option value="Canada">Canada</option>
								<option value="Canary Islands">
									Canary Islands
							</option>
								<option value="Cape Verde">Cape Verde</option>
								<option value="Cayman Islands">
									Cayman Islands
							</option>
								<option value="Central African Republic">
									Central African Republic
							</option>
								<option value="Chad">Chad</option>
								<option value="Channel Islands">
									Channel Islands
							</option>
								<option value="Chile">Chile</option>
								<option value="China">China</option>
								<option value="Christmas Island">
									Christmas Island
							</option>
								<option value="Cocos Island">Cocos Island</option>
								<option value="Colombia">Colombia</option>
								<option value="Comoros">Comoros</option>
								<option value="Congo">Congo</option>
								<option value="Cook Islands">Cook Islands</option>
								<option value="Costa Rica">Costa Rica</option>
								<option value="Cote DIvoire">Cote DIvoire</option>
								<option value="Croatia">Croatia</option>
								<option value="Cuba">Cuba</option>
								<option value="Curaco">Curacao</option>
								<option value="Cyprus">Cyprus</option>
								<option value="Czech Republic">
									Czech Republic
							</option>
								<option value="Denmark">Denmark</option>
								<option value="Djibouti">Djibouti</option>
								<option value="Dominica">Dominica</option>
								<option value="Dominican Republic">
									Dominican Republic
							</option>
								<option value="East Timor">East Timor</option>
								<option value="Ecuador">Ecuador</option>
								<option value="Egypt">Egypt</option>
								<option value="El Salvador">El Salvador</option>
								<option value="Equatorial Guinea">
									Equatorial Guinea
							</option>
								<option value="Eritrea">Eritrea</option>
								<option value="Estonia">Estonia</option>
								<option value="Ethiopia">Ethiopia</option>
								<option value="Falkland Islands">
									Falkland Islands
							</option>
								<option value="Faroe Islands">Faroe Islands</option>
								<option value="Fiji">Fiji</option>
								<option value="Finland">Finland</option>
								<option value="France">France</option>
								<option value="French Guiana">French Guiana</option>
								<option value="French Polynesia">
									French Polynesia
							</option>
								<option value="French Southern Ter">
									French Southern Ter
							</option>
								<option value="Gabon">Gabon</option>
								<option value="Gambia">Gambia</option>
								<option value="Georgia">Georgia</option>
								<option value="Germany">Germany</option>
								<option value="Ghana">Ghana</option>
								<option value="Gibraltar">Gibraltar</option>
								<option value="Great Britain">Great Britain</option>
								<option value="Greece">Greece</option>
								<option value="Greenland">Greenland</option>
								<option value="Grenada">Grenada</option>
								<option value="Guadeloupe">Guadeloupe</option>
								<option value="Guam">Guam</option>
								<option value="Guatemala">Guatemala</option>
								<option value="Guinea">Guinea</option>
								<option value="Guyana">Guyana</option>
								<option value="Haiti">Haiti</option>
								<option value="Hawaii">Hawaii</option>
								<option value="Honduras">Honduras</option>
								<option value="Hong Kong">Hong Kong</option>
								<option value="Hungary">Hungary</option>
								<option value="Iceland">Iceland</option>
								<option value="Indonesia">Indonesia</option>
								<option value="India">India</option>
								<option value="Iran">Iran</option>
								<option value="Iraq">Iraq</option>
								<option value="Ireland">Ireland</option>
								<option value="Isle of Man">Isle of Man</option>
								<option value="Israel">Israel</option>
								<option value="Italy">Italy</option>
								<option value="Jamaica">Jamaica</option>
								<option value="Japan">Japan</option>
								<option value="Jordan">Jordan</option>
								<option value="Kazakhstan">Kazakhstan</option>
								<option value="Kenya">Kenya</option>
								<option value="Kiribati">Kiribati</option>
								<option value="Korea North">Korea North</option>
								<option value="Korea Sout">Korea South</option>
								<option value="Kuwait">Kuwait</option>
								<option value="Kyrgyzstan">Kyrgyzstan</option>
								<option value="Laos">Laos</option>
								<option value="Latvia">Latvia</option>
								<option value="Lebanon">Lebanon</option>
								<option value="Lesotho">Lesotho</option>
								<option value="Liberia">Liberia</option>
								<option value="Libya">Libya</option>
								<option value="Liechtenstein">Liechtenstein</option>
								<option value="Lithuania">Lithuania</option>
								<option value="Luxembourg">Luxembourg</option>
								<option value="Macau">Macau</option>
								<option value="Macedonia">Macedonia</option>
								<option value="Madagascar">Madagascar</option>
								<option value="Malaysia">Malaysia</option>
								<option value="Malawi">Malawi</option>
								<option value="Maldives">Maldives</option>
								<option value="Mali">Mali</option>
								<option value="Malta">Malta</option>
								<option value="Marshall Islands">
									Marshall Islands
							</option>
								<option value="Martinique">Martinique</option>
								<option value="Mauritania">Mauritania</option>
								<option value="Mauritius">Mauritius</option>
								<option value="Mayotte">Mayotte</option>
								<option value="Mexico">Mexico</option>
								<option value="Midway Islands">
									Midway Islands
							</option>
								<option value="Moldova">Moldova</option>
								<option value="Monaco">Monaco</option>
								<option value="Mongolia">Mongolia</option>
								<option value="Montserrat">Montserrat</option>
								<option value="Morocco">Morocco</option>
								<option value="Mozambique">Mozambique</option>
								<option value="Myanmar">Myanmar</option>
								<option value="Nambia">Nambia</option>
								<option value="Nauru">Nauru</option>
								<option value="Nepal">Nepal</option>
								<option value="Netherland Antilles">
									Netherland Antilles
							</option>
								<option value="Netherlands">
									Netherlands (Holland, Europe)
							</option>
								<option value="Nevis">Nevis</option>
								<option value="New Caledonia">New Caledonia</option>
								<option value="New Zealand">New Zealand</option>
								<option value="Nicaragua">Nicaragua</option>
								<option value="Niger">Niger</option>
								<option value="Nigeria">Nigeria</option>
								<option value="Niue">Niue</option>
								<option value="Norfolk Island">
									Norfolk Island
							</option>
								<option value="Norway">Norway</option>
								<option value="Oman">Oman</option>
								<option value="Pakistan">Pakistan</option>
								<option value="Palau Island">Palau Island</option>
								<option value="Palestine">Palestine</option>
								<option value="Panama">Panama</option>
								<option value="Papua New Guinea">
									Papua New Guinea
							</option>
								<option value="Paraguay">Paraguay</option>
								<option value="Peru">Peru</option>
								<option value="Phillipines">Philippines</option>
								<option value="Pitcairn Island">
									Pitcairn Island
							</option>
								<option value="Poland">Poland</option>
								<option value="Portugal">Portugal</option>
								<option value="Puerto Rico">Puerto Rico</option>
								<option value="Qatar">Qatar</option>
								<option value="Republic of Montenegro">
									Republic of Montenegro
							</option>
								<option value="Republic of Serbia">
									Republic of Serbia
							</option>
								<option value="Reunion">Reunion</option>
								<option value="Romania">Romania</option>
								<option value="Russia">Russia</option>
								<option value="Rwanda">Rwanda</option>
								<option value="St Barthelemy">St Barthelemy</option>
								<option value="St Eustatius">St Eustatius</option>
								<option value="St Helena">St Helena</option>
								<option value="St Kitts-Nevis">
									St Kitts-Nevis
							</option>
								<option value="St Lucia">St Lucia</option>
								<option value="St Maarten">St Maarten</option>
								<option value="St Pierre & Miquelon">
									St Pierre & Miquelon
							</option>
								<option value="St Vincent & Grenadines">
									St Vincent & Grenadines
							</option>
								<option value="Saipan">Saipan</option>
								<option value="Samoa">Samoa</option>
								<option value="Samoa American">
									Samoa American
							</option>
								<option value="San Marino">San Marino</option>
								<option value="Sao Tome & Principe">
									Sao Tome & Principe
							</option>
								<option value="Saudi Arabia">Saudi Arabia</option>
								<option value="Senegal">Senegal</option>
								<option value="Seychelles">Seychelles</option>
								<option value="Sierra Leone">Sierra Leone</option>
								<option value="Singapore">Singapore</option>
								<option value="Slovakia">Slovakia</option>
								<option value="Slovenia">Slovenia</option>
								<option value="Solomon Islands">
									Solomon Islands
							</option>
								<option value="Somalia">Somalia</option>
								<option value="South Africa">South Africa</option>
								<option value="Spain">Spain</option>
								<option value="Sri Lanka">Sri Lanka</option>
								<option value="Sudan">Sudan</option>
								<option value="Suriname">Suriname</option>
								<option value="Swaziland">Swaziland</option>
								<option value="Sweden">Sweden</option>
								<option value="Switzerland">Switzerland</option>
								<option value="Syria">Syria</option>
								<option value="Tahiti">Tahiti</option>
								<option value="Taiwan">Taiwan</option>
								<option value="Tajikistan">Tajikistan</option>
								<option value="Tanzania">Tanzania</option>
								<option value="Thailand">Thailand</option>
								<option value="Togo">Togo</option>
								<option value="Tokelau">Tokelau</option>
								<option value="Tonga">Tonga</option>
								<option value="Trinidad & Tobago">
									Trinidad & Tobago
							</option>
								<option value="Tunisia">Tunisia</option>
								<option value="Turkey">Turkey</option>
								<option value="Turkmenistan">Turkmenistan</option>
								<option value="Turks & Caicos Is">
									Turks & Caicos Is
							</option>
								<option value="Tuvalu">Tuvalu</option>
								<option value="Uganda">Uganda</option>
								<option value="United Kingdom">
									United Kingdom
							</option>
								<option value="Ukraine">Ukraine</option>
								<option value="United Arab Erimates">
									United Arab Emirates
							</option>
								<option value="United States of America">
									United States of America
							</option>
								<option value="Uraguay">Uruguay</option>
								<option value="Uzbekistan">Uzbekistan</option>
								<option value="Vanuatu">Vanuatu</option>
								<option value="Vatican City State">
									Vatican City State
							</option>
								<option value="Venezuela">Venezuela</option>
								<option value="Vietnam">Vietnam</option>
								<option value="Virgin Islands (Brit)">
									Virgin Islands (Brit)
							</option>
								<option value="Virgin Islands (USA)">
									Virgin Islands (USA)
							</option>
								<option value="Wake Island">Wake Island</option>
								<option value="Wallis & Futana Is">
									Wallis & Futana Is
							</option>
								<option value="Yemen">Yemen</option>
								<option value="Zaire">Zaire</option>
								<option value="Zambia">Zambia</option>
								<option value="Zimbabwe">Zimbabwe</option>
							</select>
						</div>

						<div className="form-group">
							<label>
								<b>Port of Origin (Nearest Port) :</b>
							</label>
							<input
								type="text"
								name="originPort"
								id="originPort"
								value={this.state.originPort}
								onChange={(e) => this.handleInput(e)}
								placeholder="Enter Nearest Port of Origin"
							/>
						</div>

						<div className="form-group">
							<label>
								<b>Shipment To (Select Country) :</b>
							</label>
							<select
								name="dropTo"
								id="dropTo"
								value={this.state.dropTo}
								onChange={(e) => this.handleInput(e)}
							>
								<option value="Afganistan">Afghanistan</option>
								<option value="Albania">Albania</option>
								<option value="Algeria">Algeria</option>
								<option value="American Samoa">
									American Samoa
							</option>
								<option value="Andorra">Andorra</option>
								<option value="Angola">Angola</option>
								<option value="Anguilla">Anguilla</option>
								<option value="Antigua & Barbuda">
									Antigua & Barbuda
							</option>
								<option value="Argentina">Argentina</option>
								<option value="Armenia">Armenia</option>
								<option value="Aruba">Aruba</option>
								<option value="Australia">Australia</option>
								<option value="Austria">Austria</option>
								<option value="Azerbaijan">Azerbaijan</option>
								<option value="Bahamas">Bahamas</option>
								<option value="Bahrain">Bahrain</option>
								<option value="Bangladesh">Bangladesh</option>
								<option value="Barbados">Barbados</option>
								<option value="Belarus">Belarus</option>
								<option value="Belgium">Belgium</option>
								<option value="Belize">Belize</option>
								<option value="Benin">Benin</option>
								<option value="Bermuda">Bermuda</option>
								<option value="Bhutan">Bhutan</option>
								<option value="Bolivia">Bolivia</option>
								<option value="Bonaire">Bonaire</option>
								<option value="Bosnia & Herzegovina">
									Bosnia & Herzegovina
							</option>
								<option value="Botswana">Botswana</option>
								<option value="Brazil">Brazil</option>
								<option value="British Indian Ocean Ter">
									British Indian Ocean Ter
							</option>
								<option value="Brunei">Brunei</option>
								<option value="Bulgaria">Bulgaria</option>
								<option value="Burkina Faso">Burkina Faso</option>
								<option value="Burundi">Burundi</option>
								<option value="Cambodia">Cambodia</option>
								<option value="Cameroon">Cameroon</option>
								<option value="Canada">Canada</option>
								<option value="Canary Islands">
									Canary Islands
							</option>
								<option value="Cape Verde">Cape Verde</option>
								<option value="Cayman Islands">
									Cayman Islands
							</option>
								<option value="Central African Republic">
									Central African Republic
							</option>
								<option value="Chad">Chad</option>
								<option value="Channel Islands">
									Channel Islands
							</option>
								<option value="Chile">Chile</option>
								<option value="China">China</option>
								<option value="Christmas Island">
									Christmas Island
							</option>
								<option value="Cocos Island">Cocos Island</option>
								<option value="Colombia">Colombia</option>
								<option value="Comoros">Comoros</option>
								<option value="Congo">Congo</option>
								<option value="Cook Islands">Cook Islands</option>
								<option value="Costa Rica">Costa Rica</option>
								<option value="Cote DIvoire">Cote DIvoire</option>
								<option value="Croatia">Croatia</option>
								<option value="Cuba">Cuba</option>
								<option value="Curaco">Curacao</option>
								<option value="Cyprus">Cyprus</option>
								<option value="Czech Republic">
									Czech Republic
							</option>
								<option value="Denmark">Denmark</option>
								<option value="Djibouti">Djibouti</option>
								<option value="Dominica">Dominica</option>
								<option value="Dominican Republic">
									Dominican Republic
							</option>
								<option value="East Timor">East Timor</option>
								<option value="Ecuador">Ecuador</option>
								<option value="Egypt">Egypt</option>
								<option value="El Salvador">El Salvador</option>
								<option value="Equatorial Guinea">
									Equatorial Guinea
							</option>
								<option value="Eritrea">Eritrea</option>
								<option value="Estonia">Estonia</option>
								<option value="Ethiopia">Ethiopia</option>
								<option value="Falkland Islands">
									Falkland Islands
							</option>
								<option value="Faroe Islands">Faroe Islands</option>
								<option value="Fiji">Fiji</option>
								<option value="Finland">Finland</option>
								<option value="France">France</option>
								<option value="French Guiana">French Guiana</option>
								<option value="French Polynesia">
									French Polynesia
							</option>
								<option value="French Southern Ter">
									French Southern Ter
							</option>
								<option value="Gabon">Gabon</option>
								<option value="Gambia">Gambia</option>
								<option value="Georgia">Georgia</option>
								<option value="Germany">Germany</option>
								<option value="Ghana">Ghana</option>
								<option value="Gibraltar">Gibraltar</option>
								<option value="Great Britain">Great Britain</option>
								<option value="Greece">Greece</option>
								<option value="Greenland">Greenland</option>
								<option value="Grenada">Grenada</option>
								<option value="Guadeloupe">Guadeloupe</option>
								<option value="Guam">Guam</option>
								<option value="Guatemala">Guatemala</option>
								<option value="Guinea">Guinea</option>
								<option value="Guyana">Guyana</option>
								<option value="Haiti">Haiti</option>
								<option value="Hawaii">Hawaii</option>
								<option value="Honduras">Honduras</option>
								<option value="Hong Kong">Hong Kong</option>
								<option value="Hungary">Hungary</option>
								<option value="Iceland">Iceland</option>
								<option value="Indonesia">Indonesia</option>
								<option value="India">India</option>
								<option value="Iran">Iran</option>
								<option value="Iraq">Iraq</option>
								<option value="Ireland">Ireland</option>
								<option value="Isle of Man">Isle of Man</option>
								<option value="Israel">Israel</option>
								<option value="Italy">Italy</option>
								<option value="Jamaica">Jamaica</option>
								<option value="Japan">Japan</option>
								<option value="Jordan">Jordan</option>
								<option value="Kazakhstan">Kazakhstan</option>
								<option value="Kenya">Kenya</option>
								<option value="Kiribati">Kiribati</option>
								<option value="Korea North">Korea North</option>
								<option value="Korea Sout">Korea South</option>
								<option value="Kuwait">Kuwait</option>
								<option value="Kyrgyzstan">Kyrgyzstan</option>
								<option value="Laos">Laos</option>
								<option value="Latvia">Latvia</option>
								<option value="Lebanon">Lebanon</option>
								<option value="Lesotho">Lesotho</option>
								<option value="Liberia">Liberia</option>
								<option value="Libya">Libya</option>
								<option value="Liechtenstein">Liechtenstein</option>
								<option value="Lithuania">Lithuania</option>
								<option value="Luxembourg">Luxembourg</option>
								<option value="Macau">Macau</option>
								<option value="Macedonia">Macedonia</option>
								<option value="Madagascar">Madagascar</option>
								<option value="Malaysia">Malaysia</option>
								<option value="Malawi">Malawi</option>
								<option value="Maldives">Maldives</option>
								<option value="Mali">Mali</option>
								<option value="Malta">Malta</option>
								<option value="Marshall Islands">
									Marshall Islands
							</option>
								<option value="Martinique">Martinique</option>
								<option value="Mauritania">Mauritania</option>
								<option value="Mauritius">Mauritius</option>
								<option value="Mayotte">Mayotte</option>
								<option value="Mexico">Mexico</option>
								<option value="Midway Islands">
									Midway Islands
							</option>
								<option value="Moldova">Moldova</option>
								<option value="Monaco">Monaco</option>
								<option value="Mongolia">Mongolia</option>
								<option value="Montserrat">Montserrat</option>
								<option value="Morocco">Morocco</option>
								<option value="Mozambique">Mozambique</option>
								<option value="Myanmar">Myanmar</option>
								<option value="Nambia">Nambia</option>
								<option value="Nauru">Nauru</option>
								<option value="Nepal">Nepal</option>
								<option value="Netherland Antilles">
									Netherland Antilles
							</option>
								<option value="Netherlands">
									Netherlands (Holland, Europe)
							</option>
								<option value="Nevis">Nevis</option>
								<option value="New Caledonia">New Caledonia</option>
								<option value="New Zealand">New Zealand</option>
								<option value="Nicaragua">Nicaragua</option>
								<option value="Niger">Niger</option>
								<option value="Nigeria">Nigeria</option>
								<option value="Niue">Niue</option>
								<option value="Norfolk Island">
									Norfolk Island
							</option>
								<option value="Norway">Norway</option>
								<option value="Oman">Oman</option>
								<option value="Pakistan">Pakistan</option>
								<option value="Palau Island">Palau Island</option>
								<option value="Palestine">Palestine</option>
								<option value="Panama">Panama</option>
								<option value="Papua New Guinea">
									Papua New Guinea
							</option>
								<option value="Paraguay">Paraguay</option>
								<option value="Peru">Peru</option>
								<option value="Phillipines">Philippines</option>
								<option value="Pitcairn Island">
									Pitcairn Island
							</option>
								<option value="Poland">Poland</option>
								<option value="Portugal">Portugal</option>
								<option value="Puerto Rico">Puerto Rico</option>
								<option value="Qatar">Qatar</option>
								<option value="Republic of Montenegro">
									Republic of Montenegro
							</option>
								<option value="Republic of Serbia">
									Republic of Serbia
							</option>
								<option value="Reunion">Reunion</option>
								<option value="Romania">Romania</option>
								<option value="Russia">Russia</option>
								<option value="Rwanda">Rwanda</option>
								<option value="St Barthelemy">St Barthelemy</option>
								<option value="St Eustatius">St Eustatius</option>
								<option value="St Helena">St Helena</option>
								<option value="St Kitts-Nevis">
									St Kitts-Nevis
							</option>
								<option value="St Lucia">St Lucia</option>
								<option value="St Maarten">St Maarten</option>
								<option value="St Pierre & Miquelon">
									St Pierre & Miquelon
							</option>
								<option value="St Vincent & Grenadines">
									St Vincent & Grenadines
							</option>
								<option value="Saipan">Saipan</option>
								<option value="Samoa">Samoa</option>
								<option value="Samoa American">
									Samoa American
							</option>
								<option value="San Marino">San Marino</option>
								<option value="Sao Tome & Principe">
									Sao Tome & Principe
							</option>
								<option value="Saudi Arabia">Saudi Arabia</option>
								<option value="Senegal">Senegal</option>
								<option value="Seychelles">Seychelles</option>
								<option value="Sierra Leone">Sierra Leone</option>
								<option value="Singapore">Singapore</option>
								<option value="Slovakia">Slovakia</option>
								<option value="Slovenia">Slovenia</option>
								<option value="Solomon Islands">
									Solomon Islands
							</option>
								<option value="Somalia">Somalia</option>
								<option value="South Africa">South Africa</option>
								<option value="Spain">Spain</option>
								<option value="Sri Lanka">Sri Lanka</option>
								<option value="Sudan">Sudan</option>
								<option value="Suriname">Suriname</option>
								<option value="Swaziland">Swaziland</option>
								<option value="Sweden">Sweden</option>
								<option value="Switzerland">Switzerland</option>
								<option value="Syria">Syria</option>
								<option value="Tahiti">Tahiti</option>
								<option value="Taiwan">Taiwan</option>
								<option value="Tajikistan">Tajikistan</option>
								<option value="Tanzania">Tanzania</option>
								<option value="Thailand">Thailand</option>
								<option value="Togo">Togo</option>
								<option value="Tokelau">Tokelau</option>
								<option value="Tonga">Tonga</option>
								<option value="Trinidad & Tobago">
									Trinidad & Tobago
							</option>
								<option value="Tunisia">Tunisia</option>
								<option value="Turkey">Turkey</option>
								<option value="Turkmenistan">Turkmenistan</option>
								<option value="Turks & Caicos Is">
									Turks & Caicos Is
							</option>
								<option value="Tuvalu">Tuvalu</option>
								<option value="Uganda">Uganda</option>
								<option value="United Kingdom">
									United Kingdom
							</option>
								<option value="Ukraine">Ukraine</option>
								<option value="United Arab Erimates">
									United Arab Emirates
							</option>
								<option value="United States of America">
									United States of America
							</option>
								<option value="Uraguay">Uruguay</option>
								<option value="Uzbekistan">Uzbekistan</option>
								<option value="Vanuatu">Vanuatu</option>
								<option value="Vatican City State">
									Vatican City State
							</option>
								<option value="Venezuela">Venezuela</option>
								<option value="Vietnam">Vietnam</option>
								<option value="Virgin Islands (Brit)">
									Virgin Islands (Brit)
							</option>
								<option value="Virgin Islands (USA)">
									Virgin Islands (USA)
							</option>
								<option value="Wake Island">Wake Island</option>
								<option value="Wallis & Futana Is">
									Wallis & Futana Is
							</option>
								<option value="Yemen">Yemen</option>
								<option value="Zaire">Zaire</option>
								<option value="Zambia">Zambia</option>
								<option value="Zimbabwe">Zimbabwe</option>
							</select>
						</div>

						<div className="form-group">
							<label>
								<b>Destination Port (Nearest Port) :</b>
							</label>
							<input
								type="text"
								name="destinationPort"
								id="destinationPort"
								value={this.state.destinationPort}
								onChange={(e) => this.handleInput(e)}
								placeholder="Enter Nearest Destination Port"
							/>
						</div>

						<div className="form-group">
							<label>
								<b>Mode of Shipment :</b>
							</label>
							<select
								name="shipmentMode"
								id="shipmentMode"
								value={this.state.shipmentMode}
								onChange={(e) => this.handleInput(e)}
							>
								<option value="By Air">By Air</option>
								<option value="By Ocean">By Ocean</option>
							</select>
						</div>
					</div>
				</div>

				<div className="outer-div">
					<h4>Commodity Details</h4>

					<div className="inner-div">
						<div className="form-group">
							<label>
								<b>Commodity Name :</b>
							</label>
							<input
								type="text"
								name="commodityName"
								id="commodityName"
								value={this.state.commodityName}
								onChange={(e) => this.handleInput(e)}
								placeholder="Enter Commodity Name"
							/>
						</div>

						<div className="form-group">
							<label>
								<b>Commodity Type :</b>
							</label>
							<select
								name="commodityType"
								id="commodityType"
								value={this.state.commodityType}
								onChange={(e) => this.handleInput(e)}
							>
								<option value="Hazardous">Hazardous</option>
								<option value="Non-Hazardous">Non-Hazardous</option>
							</select>
						</div>

						<div className="form-group">
							<label>
								<b>Type of Containers / LCL Cargo :</b>
							</label>
							<select
								name="containerType"
								id="containerType"
								value={this.state.containerType}
								onChange={(e) => this.handleInput(e)}
							>
								<option value="20FT General">20FT General</option>
								<option value="20FT High Cube">
									20FT High Cube
							</option>
								<option value="40FT General">40FT General</option>
								<option value="40FT High Cube">
									40FT High Cube
							</option>
								<option value="LCL Cargo">LCL Cargo</option>
								<option value="N.A.">
									N.A. (For Air Shipments Only)
							</option>
							</select>
						</div>
					</div>
				</div>

				<div className="outer-div">
					<h4>Shipment Volume</h4>
					<div className="inner-div">
						<div className="form-group">
							<label>
								<b>Gross Weight (Kgs) :</b>
							</label>
							<input type="text" name="grossWeight" id="gross-weight" value={this.state.grossWeight} onChange={(e) => this.handleInput(e)} placeholder=" Enter Gross Weight (in Kgs)" />
						</div>
						<div className="form-group">
							<label>
								<b>No. of Packages :</b>
							</label>
							<input type="text" name="numOfPkg" id="num-of-pkg" value={this.state.numOfPkg} onChange={(e) => this.handleInput(e)} placeholder="Enter No. of Packages" />
						</div>
						<div className="form-group">
							<label>
								<b>Total Voume (CBM) :</b>
							</label>
							<input type="text" name="totalVolume" id="total-volume" value={this.state.totalVolume} onChange={(e) => this.handleInput(e)} placeholder="Enter Total Voume (CBM)" />
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

export default withRouter(EditFreightData);
