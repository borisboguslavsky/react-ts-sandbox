import {
	Box,
	Button,
	Card,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";

const VendingMachine: React.FC = () => {
	return (
		<>
			<Typography>Available Drinks:</Typography>

			<Card elevation={6}>
				<List>
					<ListItem>
						<ListItemText primary="Coca Cola" />
						<Button variant="outlined" sx={{ marginLeft: "auto" }}>
							Select
						</Button>
					</ListItem>
					<ListItem>
						<ListItemText primary="Root Beer" />
						<Button variant="outlined" sx={{ marginLeft: "auto" }}>
							Select
						</Button>
					</ListItem>
					<ListItem>
						<ListItemText primary="La Croix" />
						<Button variant="outlined" sx={{ marginLeft: "auto" }}>
							Select
						</Button>
					</ListItem>
				</List>
			</Card>

			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography color={"green"}>Coins Inserted: 0¢ / 55¢</Typography>
				<Typography>Coins In Return: 0¢</Typography>
			</Box>
			<Box sx={{ display: "flex", gap: "0.25rem" }}>
				<Button fullWidth>+5¢</Button>
				<Button fullWidth>+10¢</Button>
				<Button fullWidth>+55¢</Button>
				<Button fullWidth variant="outlined">
					Return
				</Button>
			</Box>
		</>
	);
};

export default VendingMachine;
