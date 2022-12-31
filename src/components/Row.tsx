import React from "react"

import classes from './Row.module.css'

export const Row: React.FC<{
	children: React.ReactNode
}> = (props) => {
	return(
		<div className={classes.row}>
			{props.children}
		</div>
	)
}

export default Row