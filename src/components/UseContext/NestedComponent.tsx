import { useContext } from "react"
import Row from "../Row"
import { AppContext, DUMMY_DATA } from "./UseContext"

const NestedComponent = () => {
	const appCtx = useContext(AppContext)

	const incrementNumbers = () => {
		appCtx.setData(currentData => {
			return currentData.map((num, index) => {
				return num + 1;
			})
		})
	}

	const decrementNumbers = () => {
		appCtx.setData(currentData => {
			return currentData.map((num, index) => {
				return num - 1;
			})
		})
	}

	const resetNumbers = () => {
		appCtx.setData(DUMMY_DATA)
	}

	return(
		<>
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
				<button onClick={resetNumbers}>
					Reset
				</button>
			</Row>
		</>
	)
}

export default NestedComponent