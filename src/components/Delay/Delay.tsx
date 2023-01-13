import classes from './Delay.module.css'

import Row from '../Row'
import Col from '../Col'
import { useRef, useState } from 'react'

export const Delay: React.FC = () => {
	const messageRef = useRef<HTMLInputElement>(null)
	const delayRef = useRef<HTMLInputElement>(null)

	const [isLoading, setIsLoading] = useState(false);
	const [output, setOutput] = useState('');

	const getMessageAfterDelay = (): Promise<string> => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(messageRef.current!.value)
			}, Number(delayRef.current!.value))
		})	
	}

	const onGoHandler = async () => {
		setIsLoading(true)
		setOutput('')
		const result = await getMessageAfterDelay();
		setOutput(result)
		setIsLoading(false);
	}	

	return(
		<div className={classes.delay}>
			<Row>
				<Col>
					<label>Message:</label>
					<input
						type="text"
						ref={messageRef}
						defaultValue={`Here's some output...`}
						/>
				</Col>
				<Col>
					<label>Delay (ms):</label>
					<input
						type="number"
						ref={delayRef}
						defaultValue={1000}
					/>
				</Col>
			</Row>
			<Row>
				<button
					disabled={isLoading}
					onClick={onGoHandler}
				>
					{isLoading ? `Waiting... ${delayRef.current!.value} ms` : 'Go'}
				</button>
			</Row>
			<Row>
				<label>Output:</label>
			</Row>
			<Row>
				<textarea readOnly={true} value={output} />
			</Row>
		</div>
	)
}

export default Delay;