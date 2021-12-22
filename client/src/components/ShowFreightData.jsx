import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

class ShowFreightData extends React.Component {
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
		this.props.history.push("/dashboard/editFreightData", {
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
						<p>
							<b>Shipment type:</b> {user.shipment_type}{" "}
						</p>
						<p>
							<b>Delivery Incoterms:</b> {user.delivery_incoterms}{" "}
						</p>
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
								<b>Shipment Address:</b> {user.shipment_address}{" "}
							</p>
							<p>
								<b>ZIP/PIN Code:</b> {user.code}{" "}
							</p>
							<p>
								<b>Phone Number:</b> (+
								{user.shipment_country_code}){" "}
								{user.shipment_phone_number}{" "}
							</p>
							<p>
								<b>Shipment From:</b> {user.shipment_from}{" "}
							</p>
							<p>
								<b>Port of Origin:</b> {user.origin_port}{" "}
							</p>
							<p>
								<b>Shipment To:</b> {user.shipment_to}{" "}
							</p>
							<p>
								<b>Destination Port:</b> {user.destination_port}{" "}
							</p>
							<p>
								<b>Mode of Shipment:</b> {user.shipment_mode}{" "}
							</p>
						</div>
					</div>

					<div className="outer-div">
						<h4>Commodity Details</h4>

						<div className="inner-div">
							<p>
								<b>Commodity Name:</b> {user.commodity_name}{" "}
							</p>
							<p>
								<b>Commodity Type:</b> {user.commodity_type}{" "}
							</p>
							<p>
								<b>MSDS Report:</b>
							</p>
						</div>
					</div>

					<div className="outer-div">
						<p>
							<b>Type of Containers / LCL Cargo:</b>{" "}
							{user.container_type}{" "}
						</p>
						<p>
							<b>Gross Weight (Kgs):</b> {user.gross_weight}{" "}
						</p>
						<p>
							<b>No. of Packages:</b>
							{user.num_of_pkg}
						</p>
						<p>
							<b>Total Voume (CBM):</b>
							{user.total_volume}
						</p>
					</div>
				</div>
			);
		}
	}
}

export default ShowFreightData;
