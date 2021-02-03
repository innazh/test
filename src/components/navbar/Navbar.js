import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
	return (

		<nav className="navbar navbar-expand-lg navbar-light bg-light">

			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
				<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
					<li className="nav-item active">
						<NavLink className="nav-link" to="/login">Login</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/adduser">Add User</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/users">Users</NavLink>
					</li>
				</ul>
			</div>
		</nav>);
}
export default Navbar;