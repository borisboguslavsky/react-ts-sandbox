import React, { useState, useRef } from "react";

import classes from "./Increment.module.css";

const Increment: React.FC = () => {
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
		<section>
			<h2>Increment & Decrement</h2>
			<div className={classes.increment}>
				<input type="number" ref={inputRef} />
				<button onClick={incrementHandler}>Increment</button>
				<button onClick={decrementHandler}>Decrement</button>
				<h3>Counter: {count}</h3>
				<button onClick={() => setCount(0)}>Reset</button>
			</div>
		</section>
	);
};

export default Increment;
