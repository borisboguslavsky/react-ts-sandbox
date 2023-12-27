import { useMachine } from "@xstate/react";
import {
  Box,
  Button,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { vMachine } from "./vendingMachine_stateMachine";

const VendingMachine: React.FC = () => {
  const [state, send] = useMachine(vMachine);

  return (
    <>
      <Typography>Available Drinks:</Typography>

      <Card elevation={2}>
        <List>
          <ListItem>
            <ListItemText primary="Coca Cola" />
            <ListItemText
              primary="50¢"
              sx={{ marginLeft: "auto", textAlign: "end", paddingRight: "8px" }}
            />
            <Button variant="outlined">Select</Button>
          </ListItem>
          <ListItem>
            <ListItemText primary="Root Beer" />
            <ListItemText
              primary="50¢"
              sx={{ marginLeft: "auto", textAlign: "end", paddingRight: "8px" }}
            />
            <Button variant="outlined">Select</Button>
          </ListItem>
          <ListItem>
            <ListItemText primary="La Croix" />
            <ListItemText
              primary="50¢"
              sx={{ marginLeft: "auto", textAlign: "end", paddingRight: "8px" }}
            />
            <Button variant="outlined">Select</Button>
          </ListItem>
        </List>
      </Card>

      <Typography>Actions:</Typography>

      <Card
        elevation={2}
        sx={{
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Box sx={{ display: "flex", gap: "0.25rem" }}>
          <Button onClick={() => send({ type: "ADD5", amount: 5 })} fullWidth variant="outlined">
            +5¢
          </Button>
          <Button onClick={() => send({ type: "ADD10", amount: 10 })} fullWidth variant="outlined">
            +10¢
          </Button>
          <Button onClick={() => send({ type: "ADD25", amount: 25 })} fullWidth variant="outlined">
            +25¢
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: "0.25rem" }}>
          <Button onClick={() => send("RETURN")} fullWidth variant="outlined">
            Take Coins
          </Button>
          <Button onClick={() => send("RETURN")} fullWidth variant="outlined">
            Return
          </Button>
        </Box>
      </Card>

      <Typography>State:</Typography>

      <Card elevation={2} sx={{ padding: "12px", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color={"green"}>
            Coins Inserted: <br />
            0¢ / 50¢
          </Typography>
          <Typography>
            Coins In Return: <br />
            0¢
          </Typography>
        </Box>
        <Divider orientation="horizontal" sx={{ marginY: "12px" }} />
        <Typography color={"orange"}>
          Drink in dispenser: <br />
          NONE
        </Typography>
      </Card>
    </>
  );
};

export default VendingMachine;
