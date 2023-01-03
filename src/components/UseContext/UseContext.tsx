import React, { createContext, useContext, useState } from 'react'
import NestedComponent from './NestedComponent'

import classes from './UseContext.module.css'

export const DUMMY_DATA = [4, 8, 15, 16, 23, 42]

interface ContextShape {
	data: number[],
	setData: React.Dispatch<React.SetStateAction<number[]>>
}

export const AppContext = createContext<ContextShape>({
	data: DUMMY_DATA,
	setData: () => {}
})

const AppContextProvider: React.FC<{children: React.ReactNode}> = (props) => {
	const [appCtx, setAppCtx] = useState(DUMMY_DATA)

	return (
		<AppContext.Provider value={{data: appCtx, setData: setAppCtx}}>
			{props.children}
		</AppContext.Provider>
	)
}

const UseContext = () => {
	return(
		<div className={classes.context}>
			<AppContextProvider>
				<NestedComponent/>
			</AppContextProvider>
		</div>
	)
}

export default UseContext