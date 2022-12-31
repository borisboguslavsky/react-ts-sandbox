import Row from './Row';
import classes from './WrapperComponent.module.css'

interface WrapperComponentProps {
	title: string,
	description?: string,
	children?: React.ReactNode;
}

const WrapperComponent: React.FC<WrapperComponentProps> = (props) => {
	return(
		<div className={classes.wrapper}>
			<div className={classes.title}>
				<h2>{props.title}</h2>
			</div>
			{props.children}
		</div>
	)
}

export default WrapperComponent