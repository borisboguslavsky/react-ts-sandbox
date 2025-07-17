import {
  Button,
  Card,
  Checkbox,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useRef } from "react";
import { Box } from "@mui/system";

const NewItem: React.FC<{
  addItem: (item: TodoItem) => void;
}> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const addItemHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInputRef.current!.value === "") return;
    // console.log(textInputRef.current?.value)
    props.addItem({
      id: new Date().getTime().toString(),
      text: textInputRef.current!.value,
    });
    textInputRef.current!.value = "";
  };

  return (
    <form
      onSubmit={addItemHandler}
      style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "stretch" }}>
        <TextField
          label="Add Item"
          InputLabelProps={{ shrink: true }}
          placeholder="What do you need to do?"
          type="text"
          inputRef={textInputRef}
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" type="submit" sx={{ fontSize: "1.5rem", p: 0 }}>
          +
        </Button>
      </Box>
    </form>
  );
};

interface TodoItem {
  id: string;
  text: string;
}

const TodoList = () => {
  const [items, setItems] = useState<TodoItem[]>([]);

  const addItem = (newItem: TodoItem) => {
    setItems((currentItems) => [...currentItems, newItem]);
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => {
        if (item.id === id) return false;
        return true;
      });
    });
  };

  return (
    <>
      <NewItem addItem={addItem} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {items.length > 0 && (
          <Card elevation={2} sx={{ p: 1 }}>
            <List
              sx={{
                p: 0,
                listStyle: "none",
              }}
            >
              {items.map((item, index) => {
                return (
                  <ListItem
                    key={item.id}
                    sx={{ p: 0 }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <Checkbox />
                    <Typography>{item.text}</Typography>
                  </ListItem>
                );
              })}
            </List>
          </Card>
        )}
      </Box>
    </>
  );
};

export default TodoList;
