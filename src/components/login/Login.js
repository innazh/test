import { useState } from "react";
import { getApiToken } from "../../services/auth-service";
import './Login.css';

function Login() {
	const [userData, setState] = useState({
		usernameLogin: "",
		passwordLogin: "",
	})
	const [rememberUser, setRemembrance] = useState();

	const [passErr, setPassErr] = useState("");
	const [usernameErr, setUsernameErr] = useState("");

	const handleChange = (e) => {
		const { id, value } = e.target
		setState(prevState => ({
			...prevState,
			[id]: value
		}))
	}

	const handleCheckboxChange = (e) => {
		setRemembrance(e.target.checked);
	}

	const handleSubmitClick = async (e) => {
		e.preventDefault();
		//validation
		if (!rememberUser) {
			setRemembrance(false);
		}
		if (!userData.usernameLogin) {
			setUsernameErr("Please enter your username");
		}
		else if (!userData.passwordLogin) {
			setPassErr("Enter your password");
		} else {
			//POST request, using auth-service
			var token = "";
			token = await getApiToken(userData.usernameLogin, userData.passwordLogin);

			console.log("assigned and got a token " + token);
			if (rememberUser) {
				localStorage.setItem("token", token);
			}
			else {
				sessionStorage.setItem("token", token);
			}

			//redirect to users list.
			console.log(sessionStorage.getItem("token"));
			// console.log(sessionStorage.getItem("token"));
		}
	}

	return (
		<div className="card">
			<article className="card-body">
				<h4 className="card-title text-center mb-4 mt-1">Login</h4>
				<hr />
				<form>
					<div className="form-group">
						<label htmlFor="usernameLogin">Username</label>
						<input type="text" className="form-control" id="usernameLogin" aria-describedby="usernameHelp"
							value={userData.username} onChange={handleChange} placeholder="Username" />
						<small id="usernameErr" className="form-text text-danger">{usernameErr}</small>
					</div>
					<div className="form-group">
						<label htmlFor="passwordLogin">Password</label>
						<input type="password" className="form-control" id="passwordLogin" placeholder="Password" value={userData.password} onChange={handleChange} />
						<small id="passErr" className="form-text text-danger">{passErr}</small>
					</div>
					<div className="form-group form-check">
						<input type="checkbox" className="form-check-input" id="rememberMe" value={rememberUser} onChange={handleCheckboxChange} /> {/*if yes - localstorage, no - session storage or maybe just remove and use a cookie */}
						<label className="form-check-label" htmlFor="rememberMe">Rememeber me</label>
					</div>
					<button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Login</button>
				</form>
			</article>
		</div>
	);
}

export default Login;
