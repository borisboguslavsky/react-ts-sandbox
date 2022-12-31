import { useRef, useState } from "react";
import Col from "../Col";
import Row from "../Row";

import classes from "./Calculator.module.css";

const Calculator = () => {
	const [result, setResult] = useState<number | string | undefined>('');

	const num1Ref = useRef<HTMLInputElement>(null);
	const num2Ref = useRef<HTMLInputElement>(null);

	const validateNumbers = () => {
		if (!num1Ref.current || !num2Ref.current) { 
			setResult(undefined)
			return false
		};
		if (num1Ref.current.value === '' || num2Ref.current.value === '') { 
			setResult('Missing value')
			return false
		};
		let val1 = parseFloat(num1Ref.current.value);
		let val2 = parseFloat(num2Ref.current.value);
		if (Number.isNaN(val1) || Number.isNaN(val2)) { 
			setResult('Could not parse numbers')
			return false	
		};
		return [val1, val2];
	}

	const addHandler = () => {
		if (!validateNumbers()) return;
		setResult(parseFloat(num1Ref.current!.value) + parseFloat(num2Ref.current!.value));
	};

	const subtractHandler = () => {
		if (!validateNumbers()) return;
		setResult(parseFloat(num1Ref.current!.value) - parseFloat(num2Ref.current!.value));
	}

	const multiplyHandler = () => {
		if (!validateNumbers()) return;
		setResult(parseFloat(num1Ref.current!.value) * parseFloat(num2Ref.current!.value));
	}

	const divideHandler = () => {
		if (!validateNumbers()) return;
		setResult(parseFloat(num1Ref.current!.value) / parseFloat(num2Ref.current!.value));
	}

	return (
		<div className={classes.calc}>
			<Row>
				<Col>
					<label htmlFor="val1">Number 1:</label>
					<input id="val1" ref={num1Ref} defaultValue={2} type="text" />
				</Col>
				<Col>
					<label htmlFor="val2">Number 2:</label>
					<input id="val2" ref={num2Ref} defaultValue={3} type="text" />
				</Col>
			</Row>
			<Row>
				<button onClick={addHandler}>Add</button>
				<button onClick={subtractHandler}>Subtact</button>
				<button onClick={multiplyHandler}>Multiply</button>
				<button onClick={divideHandler}>Divide</button>
			</Row>
			{result && <h3>
				Result:
				<br />
				<span className={result ? classes.valid : classes.invalid}>
					{result}
				</span>
			</h3>}
		</div>
	);
};

export default Calculator;
