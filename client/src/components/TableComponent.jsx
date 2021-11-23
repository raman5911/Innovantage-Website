import Table from "react-bootstrap/Table";

function TableComponent() {
  return (
    <Table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Qoute Requested for</th>
          <th>Contact Number</th>
          <th>Email Address</th>
          <th>Status</th>
          <th>Change Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Freight Forwarding</td>
          <td>3543553652</td>
          <td>abc@gmail</td>
          <td>
            <span className="status">Not Assigned</span>
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
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Value Added</td>
          <td>3543553652</td>
          <td>abc@gmail</td>
          <td>
            <span class="status">Assigned</span>
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
        <tr>
          <td>3</td>
          <td>Larry</td>
          <td>Custom Clearance</td>
          <td>3543553652</td>
          <td>abc@gmail</td>
          <td>
            <span class="status">Pending</span>
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
        <tr>
          <td>4</td>
          <td>Sam</td>
          <td>Warehouse Management</td>
          <td>3543553652</td>
          <td>abc@gmail</td>
          <td>
            <span class="status">Pending</span>
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
        <tr>
          <td>5</td>
          <td>Larry</td>
          <td>Custom Clearance</td>
          <td>3543553652</td>
          <td>abc@gmail</td>
          <td>
            <span class="status">Pending</span>
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
      </tbody>
    </Table>
  );
}

export default TableComponent;
