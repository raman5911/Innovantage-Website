import React from "react";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faEllipsisV,
	faEye,
	faEdit,
	faTrashAlt,
	faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Toast from "react-bootstrap/Toast";

class SearchResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			data: [],
			isLoaded: false,
			show: false,
			isOpen: false,
			showSuccessMessage: false,
			showErrorMessage: false,
		};
	}

	fetchData() {
		if (this.state.id !== " ") {
			var url = "/api/search/" + this.state.id;

			console.log(url);

			fetch(url)
				.then((res) => res.json())
				.then((result) => {
					console.log(result);

					this.setState({
						data: result,
						isLoaded: true,
						show: true,
					});
				});
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	handleInput(event) {
		var enteredId = event.target.value.trim();
		this.setState({ id: enteredId });
		console.log(this.state.id);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ show: true });
		this.fetchData();
	}

	renderForm() {
		return (
			<form
				onSubmit={this.handleSubmit.bind(this)}
				className="search"
				style={{ marginTop: "3.8rem" }}
			>
				<input
					type="text"
					name="id"
					placeholder="Enter id"
					onChange={this.handleInput.bind(this)}
					required
				/>
				<button type="submit">
					Search{" "}
					<FontAwesomeIcon icon={faSearch} className="searchIcon" />{" "}
				</button>
			</form>
		);
	}

	openModal = () => this.setState({ isOpen: true });

	closeModal = () => this.setState({ isOpen: false });

	DeleteAndCloseModal(user) {
		console.log("Deleting ...");
		this.closeModal();

		var url = "/api/delete/" + user._id;

		fetch(url)
			.then((result) => {
				console.log(result);
				this.setState({
					showSuccessMessage: true,
				});
			})
			.catch((err) => {
				this.setState({
					showErrorMessage: true,
				});
			});

		this.fetchData();
	}

	goToView(user) {
		var id = this.state.id;
		var type = id.charAt(0);

		var url = "";

		if (type === "F") {
			url = "/dashboard/showFreightData";
		}
		else if(type === "C") {
			url = "/dashboard/showCustomData";
		}
		else if(type === "T") {
			url = "/dashboard/showTransportData";
		}
		else if(type === "W") {
			url = "/dashboard/showWarehouseData";
		}
		else if(type === "V") {
			url = "/dashboard/showValueAddedData";
		}

		this.props.history.push(url, {
			id: user._id,
		});
	}

	editData(user) {
		var id = this.state.id;
		var type = id.charAt(0);

		var url = "";

		if (type === "F") {
			url = "/dashboard/editFreightData";
		}
		else if(type === "C") {
			url = "/dashboard/editCustomData";
		}
		else if(type === "T") {
			url = "/dashboard/editTransportData";
		}
		else if(type === "W") {
			url = "/dashboard/editWarehouseData";
		}
		else if(type === "V") {
			url = "/dashboard/editValueAddedData";
		}

		this.props.history.push(url, {
				userData: user,
		});
	}

	changeStatus(user) {
		this.props.history.push("/dashboard/changeStatus", {
			id: user._id,
			status: user.status,
		});
	}

	renderTableData() {
		if (this.state.data.length < 1 && this.state.show) {
			return <p>No records were found in this table.</p>;
		}

		return this.state.data.map((user, index) => {
			const {
				_id,
				user_name,
				user_email_address,
				user_phone_number,
				status,
			} = user;

			var statusClass = {
				"Not Assigned": "notAssigned",
				Assigned: "assigned",
				Pending: "pending",
				Completed: "completed",
			};

			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{_id}</td>
					<td>{user_name}</td>
					<td class="wide">{user_phone_number}</td>
					<td>{user_email_address}</td>
					<td>
						<span className={statusClass[status]}>{status}</span>
					</td>
					<td>
						<Dropdown>
							<Dropdown.Toggle
								id="dropdown-basic"
								bsPrefix="p-0"
								className="dropdownMenu"
							>
								<FontAwesomeIcon icon={faEllipsisV} />
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item
									onClick={(pressView) => this.goToView(user)}
								>
									<FontAwesomeIcon
										icon={faEye}
										className="optionIcon"
									/>
									View
								</Dropdown.Item>
								<Dropdown.Item
									onClick={(pressEdit) => this.editData(user)}
								>
									<FontAwesomeIcon
										icon={faEdit}
										className="optionIcon"
									/>
									Edit
								</Dropdown.Item>
								<DropdownItem
									onClick={(pressChangeStatus) =>
										this.changeStatus(user)
									}
								>
									<FontAwesomeIcon
										icon={faCalendarCheck}
										className="optionIcon"
									/>
									Change Status
								</DropdownItem>
								<Dropdown.Item onClick={this.openModal}>
									<FontAwesomeIcon
										icon={faTrashAlt}
										className="optionIcon"
									/>
									Delete
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</td>

					<Modal
						centered
						show={this.state.isOpen}
						onHide={this.closeModal}
					>
						<Modal.Header closeButton>
							<Modal.Title className="text-danger">
								Caution!!
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Are you sure you want to delete this record? Data
							will be deleted permanently.
						</Modal.Body>
						<Modal.Footer>
							<Button variant="light" onClick={this.closeModal}>
								Cancel
							</Button>
							<Button
								variant="outline-danger"
								onClick={(deleteOperation) =>
									this.DeleteAndCloseModal(user)
								}
							>
								Delete
							</Button>
						</Modal.Footer>
					</Modal>
				</tr>
			);
		});
	}

	renderMainComponent() {
		if (!this.state.isLoaded && this.state.id !== " " && this.state.show) {
			return (
				<div className="container">
					<div className="loading-box">
						<div className="loading-animation"></div>
					</div>
				</div>
			);
		} else {
			return (
				<Table className="table">
					<thead>
						<tr>
							<th>Sr. No.</th>
							<th>Order Id</th>
							<th>Name</th>
							<th>Contact Number</th>
							<th>Email Address</th>
							<th>Status</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{this.renderTableData()}</tbody>
				</Table>
			);
		}
	}

	setShow(name, value) {
		this.setState({
			[name]: value,
		});
	}

	render() {
		return (
			<div className="container">
				<Toast
					onClose={() => this.setShow("showSuccessMessage", false)}
					show={this.state.showSuccessMessage}
					delay={3500}
					autohide
					className="success-toast"
				>
					<Toast.Header>
						<strong className="me-auto">Success !</strong>
						<small className="time">Few Seconds ago</small>
					</Toast.Header>
					<Toast.Body>Data Deleted Successfully.</Toast.Body>
				</Toast>

				<Toast
					onClose={() => this.setShow("showErrorMessage", false)}
					show={this.state.showErrorMessage}
					delay={3500}
					autohide
					className="error-toast"
				>
					<Toast.Header>
						<strong className="me-auto">Error !</strong>
						<small className="time">Few Seconds ago</small>
					</Toast.Header>
					<Toast.Body>
						An Error Occured while deleting the data. Please go
						back/refresh and try again.
					</Toast.Body>
				</Toast>

				{this.renderForm()}
				{this.renderMainComponent()}
			</div>
		);
	}
}

export default withRouter(SearchResult);
