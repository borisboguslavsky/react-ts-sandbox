import { useRef, useState } from "react";
import {
	Button,
	Box,
	FormLabel,
	TextareaAutosize,
	TextField,
} from "@mui/material";

export const Delay: React.FC = () => {
	const messageRef = useRef<HTMLInputElement>(null);
	const delayRef = useRef<HTMLInputElement>(null);

	const [isLoading, setIsLoading] = useState(false);
	const [output, setOutput] = useState("");

	const getMessageAfterDelay = (): Promise<string> => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(messageRef.current!.value);
			}, Number(delayRef.current!.value));
		});
	};

	const onGoHandler = async () => {
		setIsLoading(true);
		setOutput("");
		const result = await getMessageAfterDelay();
		setOutput(result);
		setIsLoading(false);
	};

	return (
		<>
			<TextField
				label="Message:"
				type="text"
				inputRef={messageRef}
				defaultValue="Message"
				InputLabelProps={{ shrink: true }}
			/>
			<TextField
				label="Delay (ms):"
				type="number"
				inputRef={delayRef}
				defaultValue={1000}
				InputLabelProps={{ shrink: true }}
			/>
			<Button variant="contained" disabled={isLoading} onClick={onGoHandler}>
				{isLoading ? `Waiting... ${delayRef.current!.value} ms` : "Go"}
			</Button>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<FormLabel>Output:</FormLabel>
				<TextareaAutosize
					aria-label={"Output"}
					readOnly={true}
					value={output}
					minRows={4}
					style={{ padding: "8px" }}
				/>
			</Box>
		</>
	);
};

export default Delay;
