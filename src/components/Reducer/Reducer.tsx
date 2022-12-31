import React, { useReducer } from "react"

import classes from './Reducer.module.css'

interface ReducerState {
	field1: string,
	field2: string,
	field3: string
	allFieldsPopulated: boolean
}

type ReducerTypes = 'CHANGE' | 'REVERSE' | 'UPPER' | 'LOWER'

interface RedcuerAction {
	type: ReducerTypes
	field?: string
	value?: string
}

const reducerFunction = (state: ReducerState, action: RedcuerAction) => {
	if (action.type === 'CHANGE') {
		let newState: ReducerState = {
			...state,
			allFieldsPopulated: true,
			[action.field as keyof ReducerState]: action.value,
		}
		Object.keys(newState).forEach(key => {
			if (newState[key as keyof ReducerState] === '') {
				newState.allFieldsPopulated = false
			}
		})
		return newState;
	}
	if (action.type === 'REVERSE') {
		return {
			field1: state.field1.split('').reverse().join(''),
			field2: state.field2.split('').reverse().join(''),
			field3: state.field3.split('').reverse().join(''),
			allFieldsPopulated: state.allFieldsPopulated
		}
	}
	if (action.type === 'UPPER') {
		return {
			field1: state.field1.toUpperCase(),
			field2: state.field2.toUpperCase(),
			field3: state.field3.toUpperCase(),
			allFieldsPopulated: state.allFieldsPopulated
		}
	}
	if (action.type === 'LOWER') {
		return {
			field1: state.field1.toLowerCase(),
			field2: state.field2.toLowerCase(),
			field3: state.field3.toLowerCase(),
			allFieldsPopulated: state.allFieldsPopulated
		}
	}
	return state;
}

const ReducerExample = () => {
	// Using useReducer()
	// const [state, dispatchFn] = useReducer(reducerFn, initialState, initialFn)
	const initialState: ReducerState = {
		field1: 'Its rough',
		field2: 'Its coarse',
		field3: 'And it gets everywhere',
		allFieldsPopulated: true
	}
	const [formState, dispatchForm] = useReducer(reducerFunction, initialState, undefined)

	const submitHandler = (e: React.FormEvent, type: ReducerTypes) => {
		e.preventDefault();
		dispatchForm({type: type})
	}

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		// console.log((e.target as HTMLInputElement).id)
		let field = (e.target as HTMLInputElement).id
		let value = (e.target as HTMLInputElement).value
		dispatchForm({type: 'CHANGE', field: field, value: value})
	}

	return(
		<div>
			<form className={classes.reducer}>
				<input type="text" 
					id="field1"
					value={formState.field1}
					onChange={changeHandler}
				/>
				<input type="text" 
					id="field2"
					value={formState.field2}
					onChange={changeHandler}
				/>
				<input type="text" 
					id="field3"
					value={formState.field3}
					onChange={changeHandler}
				/>
				<button onClick={(e) => submitHandler(e, 'REVERSE')}>Reverse All</button>
				<button onClick={(e) => submitHandler(e, 'UPPER')}>Uppercase All</button>
				<button onClick={(e) => submitHandler(e, 'LOWER')}>Lowercase All</button>
			</form>
			<h3>All fields populated: {formState.allFieldsPopulated.toString()}</h3>
		</div>
	)
}

export default ReducerExample