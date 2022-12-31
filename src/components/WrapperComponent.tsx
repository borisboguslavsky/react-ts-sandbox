import classes from './WrapperComponent.module.css'

interface WrapperComponentProps {
	title: string,
	children?: React.ReactNode;
}

const WrapperComponent: React.FC<WrapperComponentProps> = (props) => {
	return(
		<div className={classes.wrapper}>
			<h2>{props.title}</h2>
			{props.children}
		</div>
	)
}

export default WrapperComponent