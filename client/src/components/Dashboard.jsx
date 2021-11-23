import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Row, Col } from "react-bootstrap";

import TableComponent from "./TableComponent";

function Dashboard() {
  return (
    <div class="dashboard">
      <div className="container">
        <h4>Last 3 Months Stats</h4>

        <Row className="row">
          <Col className="count">
            <div className="icon-div">
              <FontAwesomeIcon icon={faUser} className="Icon" />
            </div>

            <div className="icon-content">
              <h5>5</h5>
              <p>Not Assigned</p>
            </div>
          </Col>

          <Col className="count">
            <div class="icon-div">
              <FontAwesomeIcon icon={faUser} className="Icon" />
            </div>

            <div class="icon-content">
              <h5>30</h5>
              <p>Assigned</p>
            </div>
          </Col>

          <Col className="count">
            <div class="icon-div">
              <FontAwesomeIcon icon={faUser} className="Icon" />
            </div>

            <div class="icon-content">
              <h5>10</h5>
              <p>Pending</p>
            </div>
          </Col>

          <Col className="count">
            <div class="icon-div">
              <FontAwesomeIcon icon={faUser} className="Icon" />
            </div>

            <div class="icon-content">
              <h5>20</h5>
              <p>Completed</p>
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
