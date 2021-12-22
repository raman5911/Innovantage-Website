import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faBars,
	faGlobe,
	faClipboardList,
	faShippingFast,
	faWarehouse,
	faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

function toggleSidebar() {
	var sideBar = document.getElementById("sidebar");
	sideBar.classList.toggle("hide");
}

function Sidebar() {
	return (
		<div className="sidebar" id="sidebar">
			<button onClick={toggleSidebar}>
				<FontAwesomeIcon icon={faBars} className="menuIcon" />{" "}
			</button>

			<span className="company">
				<img
					src="https://drive.google.com/uc?export=view&id=12fB-VMV1WCb_cw9ZlHenwIGYwlY7hJzR"
					alt="Innovantage logo"
				/>
				<h5>Innovantage Solutions</h5>
			</span>

			<ul>
				<li className="list">
					<NavLink to="/dashboard/home">
						{" "}
						<FontAwesomeIcon icon={faUser} className="li-Icon" />
						Dashboard
					</NavLink>
				</li>

				<li className="list">
					<NavLink to="/dashboard/freight_forwarding">
						{" "}
						<FontAwesomeIcon icon={faGlobe} className="li-Icon" />
						Freight Forwarding
					</NavLink>
				</li>

				<li className="list">
					<NavLink to="/dashboard/custom_clearance">
						{" "}
						<FontAwesomeIcon
							icon={faClipboardList}
							className="li-Icon changeMargin"
						/>
						Custom Clearance
					</NavLink>
				</li>

				<li className="list">
					<NavLink to="/dashboard/transportation">
						{" "}
						<FontAwesomeIcon
							icon={faShippingFast}
							className="li-Icon"
						/>
						Transportation
					</NavLink>
				</li>

				<li className="list">
					<NavLink to="/dashboard/warehouse_management">
						{" "}
						<FontAwesomeIcon
							icon={faWarehouse}
							className="li-Icon"
						/>
						Warehouse Management
					</NavLink>
				</li>

				<li className="list">
					<NavLink to="/dashboard/value_added_services">
						{" "}
						<FontAwesomeIcon
							icon={faDollarSign}
							className="li-Icon changeMargin"
						/>
						Value Added Services
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;
