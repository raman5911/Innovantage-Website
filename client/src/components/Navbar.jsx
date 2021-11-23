import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
	return (
		<div className="navbar">
			<h4>Dashboard</h4>
			<NavLink to="/dashboard/search">
				{" "}
				Search{" "}
				<FontAwesomeIcon icon={faSearch} className="searchIcon" />{" "}
			</NavLink>
			<a href="/logout" className="link">
				Log out
			</a>
		</div>
	);
}

export default Navbar;
