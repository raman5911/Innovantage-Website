import React from "react";

import Table from "react-bootstrap/Table";

class CustomClearance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      });
  }

  renderTableData() {
    return this.state.items.map((item, index) => {
      const { id, name, email, phone } = item;

      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td class="wide">{phone}</td>
          <td>{email}</td>
          <td class="wide">
            <span class="status">Not Assigned</span>
          </td>
          <td>
            <select>
              <option value="" selected disabled hidden>
                Select Status
              </option>
              <option value="Assigned">Assigned</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </td>
        </tr>
      );
    });
  }

  render() {
    // const { items } = this.state.items;
    if (!this.state.isLoaded) {
      return (
        <div className="container">
          <div>Loading ... </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>Custom Clearance</h1>

          <Table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>{this.renderTableData()}</tbody>
          </Table>
        </div>
      );
    }
  }
}

export default CustomClearance;