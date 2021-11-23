import React from "react";
import { withRouter } from "react-router-dom";

import Toast from "react-bootstrap/Toast";

import axios from "axios";

class ChangeStatus extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: "",
			data: [],
			isLoaded: false,
			selectedValue: "",
			showSuccessMessage: false,
			showErrorMessage: false,
		};
	}

	componentDidMount() {
		if (this.props.location.state) {
			this.setState({
				id: this.props.location.state.id,
				selectedValue: this.props.location.state.status,
			});

			var url = "/api/freight_forwarding" + this.state.id;

			fetch(url)
				.then((res) => res.json())
				.then((result) => {
					this.setState({
						isLoaded: true,
						data: result,
					});
				});
		}
	}

	handleSelect(event) {
		this.setState({
			selectedValue: event.target.value,
		});
	}

	goingBack(action) {
		if (action === "save") {
			var url = "/api/changeStatus";

			axios
				.post(url, {
					id: this.state.id,
					value: this.state.selectedValue,
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

	setShow(name, value) {
		this.setState({
			[name]: value,
		});
	}

	render() {
		var statusClass = {
			"Not Assigned": "notAssigned",
			Assigned: "assigned",
			Pending: "pending",
			Completed: "completed",
		};

		if (!this.state.isLoaded) {
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
			const { service, user_name } = this.state.data[0];

			return (
				<div className="container">
					<Toast
						onClose={() => this.setShow("showErrorMessage", false)}
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
							An Error Occured while saving the changes. Please go
							back/refresh and try again.
						</Toast.Body>
					</Toast>

					<h3>Change Shipment Status Here</h3>

					<div className="outer-div">
						<p>
							<b>Order Id: </b> {this.state.id}{" "}
						</p>
						<p>
							<b>Customer Name: </b> {user_name}{" "}
						</p>
						<p>
							<b>Service: </b> {service}{" "}
						</p>
						<p>
							<b>Current Status:</b>{" "}
							<span
								className={
									statusClass[this.state.selectedValue]
								}
							>
								{this.state.selectedValue}
							</span>{" "}
						</p>

						<p className="changeStatus">
							<b>Select New Status: </b>

							<select
								value={this.state.selectedValue}
								onChange={(e) => this.handleSelect(e)}
							>
								<option value="Not Assigned" disabled hidden>
									Not Assigned
								</option>
								<option value="Assigned">Assigned</option>
								<option value="Pending">Pending</option>
								<option value="Completed">Completed</option>
							</select>
						</p>

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
					</div>
				</div>
			);
		}
	}
}

export default withRouter(ChangeStatus);
