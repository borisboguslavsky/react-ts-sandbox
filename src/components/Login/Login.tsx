import React, { useState } from "react";

import Row from "../Row";
import Col from "../Col";

import classes from './Login.module.css'

const Login: React.FC = () => {
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [output, setOutput] = useState("")

	const emailIsValid = emailValue.includes('@');
	const passwordIsValid = passwordValue.length > 4;

	const randInt = (a: number, b:number): number => {
		let min = a;
		let max = b;
		if (a > b) {
			min = b;
			max = a;
		}
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!emailIsValid || !passwordIsValid) {
			setOutput('Form invalid. Email must contain an "@" character, and password must be > 4 chars.')
			return;
		}
		console.log(emailValue, passwordValue)
		let user = randInt(1, 10)
		setOutput('Loading...')
		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${user}`)
			const data = await response.json();
			console.log(data)
			setOutput(JSON.stringify(data, null, 2))
		} catch(err) {
			console.log(err)
			setOutput('Error with API response...')
		}
	};

	return (
		<div>
			<form 
				className={classes.login}
				onSubmit={submitHandler}
			>
				<Row>
					<Col>
						<label htmlFor="emailField">Email</label>
						<input
							id="emailField"
							type="email"
							value={emailValue}
							onChange={(e) => setEmailValue(e.target.value)}
						/>
					</Col>
					<Col>
						<label htmlFor="passwordField">Password</label>
						<input
							id="passwordField"
							type="password"
							value={passwordValue}
							onChange={(e) => setPasswordValue(e.target.value)}
						/>
					</Col>
				</Row>
				{/* {message && <h4>{message}</h4>} */}
				<button type="submit">Submit</button>
			</form>
			<h3>API Response:</h3>
			<textarea 
				className={classes.result}
				readOnly
				value={output ? output : ''}
			/>
		</div>
	);
};

export default Login;
