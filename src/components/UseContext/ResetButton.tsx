import { useContext } from "react"
import { AppContext, DUMMY_DATA } from "./UseContext"

const ResetButton = () => {

	const appCtx = useContext(AppContext)
	
	const resetNumbers = () => {
		appCtx.setTimesIncremented(0)
		appCtx.setTimesDecremented(0)
		appCtx.setData(DUMMY_DATA)
	}

	return(
		<button onClick={resetNumbers}>
			Reset
		</button>
	)
}

export default ResetButton