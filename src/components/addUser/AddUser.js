import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { PostUser } from '../../services/user-service';
import './AddUser.css';


function AddUser() {
	const [newUser, setState] = useState({
		firstname: "",
		lastname: "",
		username: "",
		password: "",
		confirmPassword: ""
	})
	const [validationErrMsg, setErrMsg] = useState("");
	let h = useHistory();

	useEffect(() => {
		console.log(sessionStorage.getItem("token"));
		console.log(localStorage.getItem("token"));
		if (!sessionStorage.getItem("token") && !localStorage.getItem("token")) {
			alert("You must login before you can use the site");
			h.goBack();
		}
	}, [])


	const handleChange = (e) => {
		const { id, value } = e.target
		setState(prevState => ({
			...prevState,
			[id]: value
		}))
		console.log(newUser)
	}

	const handleSubmitClick = async (e) => {
		var usernameRegExp = new RegExp('\^\[\\w\.@\+-\]\+\$');
		var passwordRegExp = new RegExp('\^\(\?=\.\*\[A-Z\]\)\(\?=\.\*\\d\)\.\{8,\}\$');//min 8 chars, at least one number, and one upper-case char

		if (!newUser.firstname || !newUser.lastname || !newUser.username || !newUser.password || !newUser.confirmPassword) {
			setErrMsg("All fields must be filled out.");
		}
		else if (!usernameRegExp.test(newUser.username)) {
			setErrMsg("Please enter a valid username");
		}
		else if (!passwordRegExp.test(newUser.password)) {
			setErrMsg("Please enter a valid password");
		}
		else if (newUser.password !== newUser.confirmPassword) {
			setErrMsg("Passwords must match");
		}
		else { //everything is well
			var token = sessionStorage.getItem("token");
			if (!token) token = localStorage.getItem("token");

			var res = await PostUser(newUser.username, newUser.firstname, newUser.lastname, newUser.password, token);
			if (res == "201") {
				alert("You've successfully created a user!");
				h.push("/users");
			}
			else { console.log("result is " + res); }
		}

	}

	return (
		<div className="card">
			<article className="card-body">
				<h4 className="card-title text-center mb-4 mt-1">Add User</h4>
				<hr />
				<p className="text-danger text-center">{validationErrMsg}</p>
				<form>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input id="username" minLength="1" maxLength="150" type="text" className="form-control" placeholder="Username"
							value={newUser.username} onChange={handleChange} />
						{/* <small id="usernameErr" className="form-text text-danger">{usernameErr}</small> */}
					</div>
					<div className="form-group form-row">
						<div className="col">
							<input id="firstname" maxLength="30" type="text" className="form-control" placeholder="First name"
								value={newUser.firstname} onChange={handleChange} />
						</div>
						<div className="col">
							<input id="lastname" maxLength="150" type="text" className="form-control" placeholder="Last name"
								value={newUser.lastname} onChange={handleChange} />
						</div>
					</div>
					<div className="form-group form-row">
						<div className="col">
							<label htmlFor="password">Password</label>
							<input id="password" minLength="1" maxLength="128" type="password" className="form-control" placeholder="*******"
								value={newUser.password} onChange={handleChange} />
							{/* <small id="passErr" className="form-text text-danger">{passErr}</small> */}
						</div>
						<div className="col">
							<label htmlFor="confirmPassword">Confirm password</label>
							<input id="confirmPassword" minLength="1" maxLength="128" type="password" className="form-control" placeholder="*******"
								value={newUser.confirmPassword} onChange={handleChange} />
							{/* <small id="passErr" className="form-text text-danger">{passErr}</small> */}
						</div>
					</div>
					{/* <br /> */}
					<button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Submit</button>
				</form>
			</article>
		</div >
	);
}

export default AddUser;