import { useMachine, useSelector } from "@xstate/react";
import { Box, Button, Card, List, ListItem, ListItemText, Typography } from "@mui/material";
import { vMachine } from "./vendingMachine_stateMachine";

const VendingMachine = () => {
  const [state, send, actorRef] = useMachine(vMachine);
  const { coinsInserted, coinsInReturn, dispensedDrinks } = useSelector(
    actorRef,
    (state) => state.context
  );

  return (
    <>
      <Typography>Available Drinks:</Typography>

      <Card elevation={2}>
        <List>
          <ListItem>
            <ListItemText primary="Coca Cola (50¢)" />
            <Button
              disabled={!state.matches("50")}
              variant="outlined"
              onClick={() => send({ type: "DISPENSE", drink: "Coca Cola" })}
            >
              Select
            </Button>
          </ListItem>
          <ListItem>
            <ListItemText primary="Root Beer (50¢)" />
            <Button
              disabled={!state.matches("50")}
              variant="outlined"
              onClick={() => send({ type: "DISPENSE", drink: "Root Beer" })}
            >
              Select
            </Button>
          </ListItem>
          <ListItem>
            <ListItemText primary="La Croix (50¢)" />
            <Button
              disabled={!state.matches("50")}
              variant="outlined"
              onClick={() => send({ type: "DISPENSE", drink: "La Croix" })}
            >
              Select
            </Button>
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
          <Button onClick={() => send({ type: "ADD5" })} fullWidth variant="outlined">
            +5¢
          </Button>
          <Button onClick={() => send({ type: "ADD10" })} fullWidth variant="outlined">
            +10¢
          </Button>
          <Button onClick={() => send({ type: "ADD25" })} fullWidth variant="outlined">
            +25¢
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: "0.25rem" }}>
          <Button
            disabled={dispensedDrinks.length === 0}
            onClick={() => send({ type: "TAKE_DRINKS" })}
            fullWidth
            variant="outlined"
          >
            Take Drink(s)
          </Button>
          <Button
            disabled={coinsInserted === 0}
            onClick={() => send({ type: "RETURN" })}
            fullWidth
            variant="outlined"
          >
            Coin Return
          </Button>
          <Button
            disabled={coinsInReturn === 0}
            onClick={() => send({ type: "TAKE_COINS" })}
            fullWidth
            variant="outlined"
          >
            Take Coins
          </Button>
        </Box>
      </Card>

      <Typography>State:</Typography>

      <Card
        elevation={2}
        sx={{
          padding: "12px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
          gridColumnGap: "0px",
          gridRowGap: "0px",
        }}
      >
        <Typography color={"green"}>Coins Inserted:</Typography>
        <Typography color={"green"}>{coinsInserted}¢ / 50¢</Typography>
        <Typography>Coins In Return:</Typography>
        <Typography>{coinsInReturn}¢</Typography>
        <Typography color={"orange"}>Drink in dispenser</Typography>
        <Typography color={"orange"}>[{dispensedDrinks.join(", ")}]</Typography>
        <Typography color={"lightgrey"}>Current State:</Typography>
        <Typography color={"lightgrey"}>{`"${state.value}"`}</Typography>
      </Card>
    </>
  );
};

export default VendingMachine;
