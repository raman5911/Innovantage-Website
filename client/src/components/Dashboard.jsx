import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faClipboardCheck, faClock, faCheckCircle, faDownload } from "@fortawesome/free-solid-svg-icons";

import { Row, Col } from "react-bootstrap";

import TableComponent from "./TableComponent";

function Dashboard() {
  return (
    <div class="dashboard">
      <div className="container">
        <h4>Order Stats</h4>

        <Row className="row">
          <Col className="count">
            <div className="icon-div">
              <FontAwesomeIcon icon={faQuestionCircle} className="Icon d-notAssigned" />
            </div>

            <div className="icon-content">
              <h5>5</h5>
              <p>Not Assigned</p>
              <button className="btn">
                <FontAwesomeIcon icon={faDownload} className="Icon download" />
                Generate Report</button>
            </div>
          </Col>

          <Col className="count">
            <div class="icon-div">
              <FontAwesomeIcon icon={faClipboardCheck} className="Icon d-assigned" />
            </div>

            <div class="icon-content">
              <h5>30</h5>
              <p>Assigned</p>
              <button className="btn">
                <FontAwesomeIcon icon={faDownload} className="Icon download" />
                Generate Report</button>
            </div>
          </Col>

          <Col className="count">
            <div class="icon-div">
              <FontAwesomeIcon icon={faClock} className="Icon d-pending" />
            </div>

            <div class="icon-content">
              <h5>10</h5>
              <p>Pending</p>
              <button className="btn">
                <FontAwesomeIcon icon={faDownload} className="Icon download" />
                Generate Report</button>
            </div>
          </Col>

          <Col className="count">
            <div class="icon-div">
              <FontAwesomeIcon icon={faCheckCircle} className="Icon d-completed" />
            </div>

            <div class="icon-content">
              <h5>20</h5>
              <p>Completed</p>
              <button className="btn">
                <FontAwesomeIcon icon={faDownload} className="Icon download" />
                Generate Report</button>
            </div>
          </Col>
        </Row>

        <h4>Latest Orders</h4>

        <TableComponent />
      </div>
    </div>
  );
}

export default Dashboard;
