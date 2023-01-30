import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, Button } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

import classes from "./Card.module.css";
import { useState } from "react";
import { Paper } from "@mui/material";

interface WrapperComponentProps {
	title: string;
	description?: string;
	children?: React.ReactNode;
}

const WrapperComponent: React.FC<WrapperComponentProps> = (props) => {
	const [showDescription, setShowDescription] = useState(false);

	return (
		<Grid xs={4}>
			<Paper elevation={3} sx={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden'}}>
				<Box className={classes.title}>
					<h2>{props.title}</h2>
					{props.description && (
						<Button
							variant='outlined'
							onClick={() => {
								setShowDescription((bool) => !bool);
							}}
						>
							<HelpIcon />
						</Button>
					)}
				</Box>
				{props.description && showDescription && (
					<Box className={classes.description}>
						{props.description}
					</Box>
				)}
				<Box sx={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
					{props.children}
				</Box>
			</Paper>
		</Grid>
	);
};

export default WrapperComponent;
