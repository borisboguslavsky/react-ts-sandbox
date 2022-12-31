import { useRef, useState } from "react"

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
			<label htmlFor="val1">Number 1:</label>
			<input
				id="val1"
				ref={num1Ref}
				type="text"
			/>
			<label htmlFor="val2">Number 2:</label>
			<input
				id="val2"
				ref={num2Ref}
				type="text"
			/>
			<button
				onClick={addHandler}
			>
				Add
			</button>
			<h3>Result: {!result ? 'NaN' : result}</h3>
		</div>
	)
}

export default AddNums