import { useState } from "react";

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, Button, Typography, Paper } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

interface WrapperComponentProps {
	title: string;
	description?: string | React.ReactNode;
	children?: React.ReactNode;
}

const WrapperComponent: React.FC<WrapperComponentProps> = ({title, description, children}) => {
	const [showDescription, setShowDescription] = useState(false);

	return (
		<Grid xs={12} lg={4} md={6} sm={12}>
			<Paper elevation={3} sx={{ padding: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
					<Typography variant='h5'>
						{title}
					</Typography>
					{description && (
						<Button
							// variant='outlined'
							onClick={() => setShowDescription((bool) => !bool)}
							sx={{ padding: '0.5rem', width: 'min-content', height: 'min-content', minWidth: 'unset' }}
						>
							<QuestionMarkIcon fontSize="large" sx={{ opacity: '0.75' }}/>
						</Button>
					)}
				</Box>
				{description && showDescription && (
					typeof description === "string" 
					? <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
							{description}
						</Typography>
					: description
				)}
				<Box sx={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
					{children}
				</Box>
			</Paper>
		</Grid>
	);
};

export default WrapperComponent;
