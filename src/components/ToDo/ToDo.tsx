import {
  Button,
  Card,
  FormLabel,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
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
      <TextField
        label="Add Item"
        InputLabelProps={{ shrink: true }}
        placeholder="What do you need to do?"
        type="text"
        inputRef={textInputRef}
      />
      <Button variant="contained" type="submit" sx={{ marginTop: "0.5rem" }}>
        Add Item
      </Button>
    </form>
  );
};

interface TodoItem {
  id: string;
  text: string;
}

const TodoList: React.FC = () => {
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
        <FormLabel>List Items:</FormLabel>
        <Card elevation={2} sx={{ py: "6px", mt: "6px" }}>
          {items.map((item, index) => {
            return (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={`${index + 1}. ${item.text}`} />
              </ListItem>
            );
          })}
          {items.length === 0 && (
            <ListItem>
              <ListItemText primary="Todo list is empty..." />
            </ListItem>
          )}
        </Card>
      </Box>
    </>
  );
};

export default TodoList;
