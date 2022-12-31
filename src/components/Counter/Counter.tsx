import React, { useState, useRef } from "react";
import { Row } from "../Row";

import classes from "./Counter.module.css";

const Counter: React.FC = () => {
	const [count, setCount] = useState(0);

	const inputRef = useRef<HTMLInputElement>(null);

	const incrementHandler = () => {
		let current = (inputRef.current as HTMLInputElement);
		if (current.value !== '')
		setCount(count => count + parseInt(current.value))
	};

	const decrementHandler = () => {
		let current = (inputRef.current as HTMLInputElement);
		if (current.value !== '')
		setCount(count => count - parseInt(current.value))
	};

	return (
		<div className={classes.increment}>
			<label htmlFor="incrementDecrementInput">Amount:</label>
			<input id="incrementDecrementInput" type="number" ref={inputRef} defaultValue={1}/>
			<Row>
				<button onClick={incrementHandler}>Increment</button>
				<button onClick={decrementHandler}>Decrement</button>
				<button onClick={() => setCount(0)}>Reset</button>
			</Row>
			<h3>
				Count:<br/>
				<span>{count}</span>
			</h3>
		</div>
	);
};

export default Counter;
