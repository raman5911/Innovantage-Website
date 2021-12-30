import React from "react";
import { withRouter } from "react-router-dom";

import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Toast from "react-bootstrap/Toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEllipsisV,
	faEye,
	faEdit,
	faTrashAlt,
	faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

class ValueAddedServices extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			isLoaded: false,
			isOpen: false,

			showSuccessMessage: false,
			showErrorMessage: false,

			disablePrevBtn: true,
			disableNextBtn: true,
		};
	}

	fetchData() {
		fetch("/api/value_added_services")
			.then((res) => res.json())
			.then((result) => {
				console.log(result);

				this.setState({
					isLoaded: true,
					users: result
				});
			});
	}

	componentDidMount() {
		this.fetchData();
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
		this.props.history.push("/dashboard/showValueAddedData", { id: user._id });
	}

	editData(user) {
		this.props.history.push("/dashboard/editValueAddedData", {
			userData: user,
		});
		this.fetchData();
	}

	changeStatus(user) {
		this.props.history.push("/dashboard/changeStatus", {
			id: user._id,
			status: user.status,
		});
	}

	previousButton() {
		console.log("Prev btn clicked!");

		// var newPage = this.state.currentPage - 1;

		// this.setState({
		// 	currentPage: newPage,
		// });

		// if(this.)
		// 	this.setState({
		// 		disablePrevBtn: false,
		// 	});
		// }
	}

	nextButton() {
		console.log("Next btn clicked!");

		// var newPage = this.state.currentPage + 1;

		// this.setState(
		// 	{
		// 		currentPage: newPage,
		// 		disablePrevBtn: false,
		// 	},
		// 	() => {
		// 		this.fetchData();
		// 	}
		// );
	}

	renderTableData() {
		if (this.state.users.length < 1) {
			return <p>No records were found in this table.</p>;
		}

		return this.state.users.map((user, index) => {
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
					<td className="short">{index + 1}</td>
					<td>{_id}</td>
					<td>{user_name}</td>
					<td>{user_phone_number}</td>
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
								<FontAwesomeIcon
									icon={faEllipsisV}
									className="icon"
								/>
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

	setShow(name, value) {
		this.setState({
			[name]: value,
		});
	}

	render() {
		if (!this.state.isLoaded) {
			return (
				<div className="container">
					<div className="loading-box">
						<div className="loading-animation"></div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="container">
					<Toast
						onClose={() =>
							this.setShow("showSuccessMessage", false)
						}
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

					<h3 style={{ marginTop: "0.5rem" }}>Custom Clearance</h3>

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

					{/* <button
						disabled={this.state.disablePrevBtn}
						className="previous"
						onClick={() => this.previousButton()}
					>
						{" "}
						&lt;&lt; Previous{" "}
					</button>

					<button
						disabled={this.state.disableNextBtn}
						className="next"
						onClick={() => this.nextButton()}
					>
						{" "}
						Next &gt;&gt;{" "}
					</button> */}
				</div>
			);
		}
	}
}

export default withRouter(ValueAddedServices);
