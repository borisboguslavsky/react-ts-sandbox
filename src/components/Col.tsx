import React from "react"

import classes from './Col.module.css'

export const Col: React.FC<{
	children: React.ReactNode
}> = (props) => {
	return(
		<div className={classes.col}>
			{props.children}
		</div>
	)
}

export default Col