import React, { useState, useRef } from "react";

import classes from './ToDo.module.css'

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
	};

	return (
		<form onSubmit={addItemHandler} style={{display: 'flex', flexDirection: "column", gap: "0.25rem"}}>
			<label htmlFor="addItem">Add item: </label>
			<input id="addItem" type="text" ref={textInputRef} />
			<button type="submit">Add Item</button>
		</form>
	);
};

const Items: React.FC<{
	items: { id: string; text: string }[];
	removeItem: (id: string) => void;
}> = (props) => {
	return (
		<ul>
			{props.items.map((item) => {
				return (
					<li key={item.id}>
						{item.text}
						<button onClick={(e) => props.removeItem(item.id)}>X</button>
					</li>
				);
			})}
		</ul>
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
		<div className={classes.todo}>
			<NewItem addItem={addItem} />
			<div className={classes.listItems}>
				<Items items={items} removeItem={removeItem} />
				{items.length === 0 && <p>List is empty!</p>}
			</div>
		</div>
	);
};

export default TodoList;
