import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GetUsers } from '../../services/user-service';

function Users() {
	const [data, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [errorMsg, setErrorMsg] = useState("");
	let history = useHistory();

	useEffect(async () => {
		var token = localStorage.getItem("token");
		if (!token) token = sessionStorage.getItem("token");

		if (token) {
			var users = { us: [] };
			var resultCode = await GetUsers(users, token);
			if (resultCode == "200") {
				setUsers(users.us);
			}
		}
		else {
			alert("You must login to be able to use this site.");
			history.goBack();
		}
	}, []);

	// const handleUserClick = (e) => {
	// 	//data[e.currentTarget.id]._id
	// }

	return (
		<div className="container">{isLoading ? (
			<span>Loading...</span>
		) : [
				(error ? <div key='1' className="alert alert-danger" role="alert">
					<h4 className="alert-heading">{errorMsg}</h4>
				</div>
					:
					<div key='2' className="container">
						<div className="row">
							<div className="col md-4 text-center">
							</div>
							<div className="col md-4 text-center">
								<h1>Users</h1>

							</div>
							<div className="col md-2 text-right">
								{/* <button className="btn btn-success" title="Add a book" onClick={() => redirectAddBook(props)} > */}
								{/* <i className="fas fa-plus"></i> */}
								{/* </button> */}
							</div>
						</div>
						<table className="table table-hover">
							<thead className="thead-dark">
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Username</th>
									<th scope="col">First name</th>
									<th scope="col">Last name</th>
									<th scope="col">Is active?</th>
								</tr>
							</thead>
							<tbody>

								{data.map((user, i) => (
									<tr id={i} key={user.id}> {/*onClick={handleUserClick}*/}
										<th scope="row">{i + 1}</th>
										<td>{user.username}</td>
										<td>{user.first_name}</td>
										<td>{user.last_name}</td>
										<td>{user.is_active}</td>
									</tr>
								))}
							</tbody>
						</table>
						{/* <button>Add a book</button> */}
					</div>
				)]
		}</div >
	);
}
export default Users;