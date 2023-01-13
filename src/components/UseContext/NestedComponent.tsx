import { useContext } from "react"
import Row from "../Row"
import ResetButton from "./ResetButton"
import { AppContext, DUMMY_DATA } from "./UseContext"

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

	return(
		<>
			<Row>
				Times Incremented: {appCtx.timesIncremented}
			</Row>
			<Row>
				Times Decremented: {appCtx.timesDecremented}
			</Row>
			<Row>
				{appCtx.data.map((num, index) => {
					return <p key={`key_${index}`}>{num}</p>
				})}
			</Row>
			<Row>
				<button onClick={incrementNumbers}>
					Increment
				</button>
				<button onClick={decrementNumbers}>
					Decrement
				</button>
				<ResetButton />
			</Row>
		</>
	)
}

export default NestedComponent