import { useRef, useState } from "react"
import Col from "../Col";
import Row from "../Row";

import classes from './AddNums.module.css'

const AddNums = () => {
	const [result, setResult] = useState<number | undefined>(undefined)

	const num1Ref = useRef<HTMLInputElement>(null);
	const num2Ref = useRef<HTMLInputElement>(null);

	const addHandler = () => {
		if (!num1Ref.current || !num2Ref.current) return;
		let val1 = parseFloat(num1Ref.current.value)
		let val2 = parseFloat(num2Ref.current.value)
		if (Number.isNaN(val1) || Number.isNaN(val2)) setResult(undefined);
		setResult(val1 + val2)
	}

	return(
		<div className={classes.calc}>
			<Row>
				<Col>
					<label htmlFor="val1">Number 1:</label>
					<input
						id="val1"
						ref={num1Ref}
						defaultValue={2}
						type="text"
					/>
				</Col>
				<Col>
					<label htmlFor="val2">Number 2:</label>
					<input
						id="val2"
						ref={num2Ref}
						defaultValue={3}
						type="text"
					/>
				</Col>
			</Row>
			<button
				onClick={addHandler}
			>
				Add
			</button>
			<h3>
				Result:<br/>
				<span className={result ? classes.valid : classes.invalid}>
					{!result ? 'NaN' : result}
				</span>
			</h3>
		</div>
	)
}

export default AddNums