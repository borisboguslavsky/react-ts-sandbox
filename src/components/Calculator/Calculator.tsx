import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";

const Calculator = () => {
	const [result, setResult] = useState<number | string | undefined>('');

	const num1Ref = useRef<HTMLInputElement>(null);
	const num2Ref = useRef<HTMLInputElement>(null);

	const addHandler = () => {
		setResult(parseFloat(num1Ref.current!.value) + parseFloat(num2Ref.current!.value));
	};

	const subtractHandler = () => {
		setResult(parseFloat(num1Ref.current!.value) - parseFloat(num2Ref.current!.value));
	}

	const multiplyHandler = () => {
		setResult(parseFloat(num1Ref.current!.value) * parseFloat(num2Ref.current!.value));
	}

	const divideHandler = () => {
		setResult(parseFloat(num1Ref.current!.value) / parseFloat(num2Ref.current!.value));
	}

	return (
		<>
			<Box sx={{ display: "flex", gap: "0.25rem" }}>
				<TextField
					label="Number 1:"
					InputLabelProps={{ shrink: true }}
					fullWidth
					id="val1"
					inputRef={num1Ref}
					defaultValue={2}
					type="number"
				/>
				<TextField
					label="Number 2:"
					InputLabelProps={{ shrink: true }}
					fullWidth
					id="val2"
					inputRef={num2Ref}
					defaultValue={3}
					type="number"
				/>
			</Box>
			<Box sx={{ display: "flex", gap: "0.25rem" }}>
				<Button variant="outlined" fullWidth onClick={addHandler}>
					Add
				</Button>
				<Button variant="outlined" fullWidth onClick={subtractHandler}>
					Subtract
				</Button>
				<Button variant="outlined" fullWidth onClick={multiplyHandler}>
					Multiply
				</Button>
				<Button variant="outlined" fullWidth onClick={divideHandler}>
					Divide
				</Button>
			</Box>

			{result && (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
				<Typography variant="h4" textAlign={"center"} lineHeight={1}>
					Result:
				</Typography>
				<Typography variant="h2" textAlign={"center"} lineHeight={1}>
					{result}
				</Typography>
			</Box>)}
		</>
	);
};

export default Calculator;
