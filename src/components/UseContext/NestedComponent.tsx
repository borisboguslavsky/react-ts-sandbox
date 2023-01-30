import { Button, Card, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useContext } from "react"
import ResetButton from "./ResetButton"
import { AppContext } from "./UseContext"

const NestedComponent = () => {
	const appCtx = useContext(AppContext)

	const incrementNumbers = () => {
		appCtx.setTimesIncremented(cur => cur+1)
		appCtx.setData(currentData => {
			return currentData.map((num, index) => {
				return num + 1;
			})
		})
	}
	
	const decrementNumbers = () => {
		appCtx.setTimesDecremented(cur => cur+1)
		appCtx.setData(currentData => {
			return currentData.map((num, index) => {
				return num - 1;
			})
		})
	}

	return (
		<>
			<Box sx={{ display: 'flex', gap: '0.5rem'}}>
				<TextField
					label="Times Incremented:"
					type="number"
					InputLabelProps={{ shrink: true }}
					value={appCtx.timesIncremented}
					sx={{ pointerEvents: 'none' }}
					inputProps={
						{ readOnly: true, }
					}
				/>
				<TextField
					label="Times Decremented:"
					type="number"
					InputLabelProps={{ shrink: true }}
					value={appCtx.timesDecremented}
					sx={{ pointerEvents: 'none' }}
					inputProps={
						{ readOnly: true, }
					}
				/>
			</Box>
			<Card sx={{ display: 'flex', justifyContent: 'space-around', marginY: '1rem' }}>
				{appCtx.data.map((num, index) => {
					return <p key={`key_${index}`}>{num}</p>;
				})}
			</Card>
			<Box sx={{ display: 'flex', gap: '0.25rem' }}>
				<Button fullWidth onClick={incrementNumbers} variant="outlined">
					Increment
				</Button>
				<Button fullWidth onClick={decrementNumbers} variant="outlined">
					Decrement
				</Button>
				<ResetButton />
			</Box>
		</>
	);
}

export default NestedComponent