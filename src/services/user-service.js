import axios from 'axios';
import { APIurl } from "./constants";

export async function PostUser(username, first, last, password, token) {
	var statusCode = "";
	//load the data into a single data structure
	const data = {
		"username": username,
		"first_name": first,
		"last_name": last,
		"password": password,
		"is_active": true //Designates whether this user should be treated as active.
	}

	let headers = {
		// withCredentials: true,
		headers: {
			Authorization: `Token ${token}`,
		},
	};

	await axios.post(APIurl + '/api/v1/users/', data, headers)
		.then((response) => {
			statusCode = response.status;
		})
		.catch((error) => {
			if (error.response) {
				statusCode = error.response.status;
				console.log(error.response);
			}
			else {
				statusCode = "non-http-error";
				console.log(error);
			}
		})

	return statusCode;
}

export async function GetUsers(users, token) {
	var statusCode = "";
	let headers = {
		headers: {
			Authorization: `Token ${token}`,
		},
	};

	await axios.get(APIurl + '/api/v1/users/', headers)
		.then((response) => {
			statusCode = response.status;
			users.us = response.data;
			// console.log(users);
		})
		.catch((error) => {
			if (error.response) {
				statusCode = error.response.status;
				console.log(error.response);
			}
			else {
				statusCode = "non-http-error";
				console.log(error);
			}
		})

	return statusCode;
}