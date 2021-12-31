import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./Navbar";

import Dashboard from "./Dashboard";
import FreightForwarding from "./FreightForwarding";
import CustomClearance from "./CustomClearance";
import Transportation from "./Transportation";
import WarehouseManagement from "./WarehouseManagement";
import ValueAddedServices from "./ValueAddedServices";
import ShowFreightData from "./ShowFreightData";
import ShowCustomData from "./ShowCustomData";
import SearchResult from "./SearchResult";
import ChangeStatus from "./ChangeStatus";
import EditFreightData from "./editFreightData/EditFreightData";
import EditCustomData from "./EditCustomData";
import ErrorNotFound from "./ErrorNotFound";

function Main() {
	return (
		<div className="Main">
			<Navbar />

			<Switch>
				<Route path="/dashboard/home">
					<Dashboard />
				</Route>

				<Route
					path="/dashboard/freight_forwarding"
					component={FreightForwarding}
				></Route>

				<Route path="/dashboard/custom_clearance">
					<CustomClearance />
				</Route>

				<Route path="/dashboard/transportation">
					<Transportation />
				</Route>

				<Route path="/dashboard/warehouse_management">
					<WarehouseManagement />
				</Route>

				<Route path="/dashboard/value_added_services">
					<ValueAddedServices />
				</Route>

				<Route path="/dashboard/search">
					<SearchResult />
				</Route>

				<Route
					path="/dashboard/showFreightData"
					component={ShowFreightData}
				></Route>

				<Route
					path="/dashboard/showCustomData"
					component={ShowCustomData}
				></Route>

				<Route
					path="/dashboard/changeStatus"
					component={ChangeStatus}
				></Route>

				<Route
					path="/dashboard/editFreightData"
					component={EditFreightData}
				></Route>

				<Route
					path="/dashboard/editCustomData"
					component={EditCustomData}
				></Route>

				<Route>
					<ErrorNotFound />
				</Route>
			</Switch>
		</div>
	);
}

export default Main;
