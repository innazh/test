import axios from 'axios';
import { APIurl } from "./constants";

//TODO: put this in one file with user-services
export async function getApiToken(username, password) {

	const data = {
		"username": username,
		"password": password,
	}

	var token = "";

	await axios.post(APIurl + '/api-token-auth/', data)
		.then((response) => {
			if (response.data) {
				// console.log(response.data.token);
				token = response.data.token;
			}
		})
		.catch((error) => {
			// handle error
			alert("Something went wrong. Try refreshing the page.");
			console.log(error);
		})

	return token;
}