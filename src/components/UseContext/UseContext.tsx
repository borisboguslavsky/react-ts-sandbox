import React, { createContext, useState } from 'react'
import NestedComponent from './NestedComponent'

export const DUMMY_DATA = [4, 8, 15, 16, 23, 42]

interface ContextShape {
	data: number[],
	setData: React.Dispatch<React.SetStateAction<number[]>>,
	timesIncremented: number,
	setTimesIncremented: React.Dispatch<React.SetStateAction<number>>,
	timesDecremented: number,
	setTimesDecremented: React.Dispatch<React.SetStateAction<number>>,
}

export const AppContext = createContext<ContextShape>({
	data: DUMMY_DATA,
	setData: () => {},
	timesIncremented: 0,
	setTimesIncremented: () => {},
	timesDecremented: 0,
	setTimesDecremented: () => {}
})

const AppContextProvider: React.FC<{children: React.ReactNode}> = (props) => {
	
	const [numbersData, setNumbersData] = useState(DUMMY_DATA)
	const [timesIncremented, setTimesIncremented] = useState(0)
	const [timesDecremented, setTimesDecremented] = useState(0)

	return (
		<AppContext.Provider value={{
				data: numbersData, 
				setData: setNumbersData,
				timesIncremented: timesIncremented, 
				setTimesIncremented: setTimesIncremented, 
				timesDecremented: timesDecremented, 
				setTimesDecremented: setTimesDecremented, 
			}}
		>
			{props.children}
		</AppContext.Provider>
	)
}

const UseContext = () => {
	return(
		<>
			<AppContextProvider>
				<NestedComponent/>
			</AppContextProvider>
		</>
	)
}

export default UseContext