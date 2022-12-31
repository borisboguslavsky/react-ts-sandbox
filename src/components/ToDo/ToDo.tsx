import React, { useState, useRef } from "react";

const NewItem: React.FC<{
	addItem: (item: TodoItem) => void;
}> = (props) => {
	const textInputRef = useRef<HTMLInputElement>(null);

	const addItemHandler = (e: React.FormEvent) => {
		e.preventDefault();
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
		<div>
			<NewItem addItem={addItem} />
			<Items items={items} removeItem={removeItem} />
			{items.length === 0 && <h3>List is empty! Add items using the above text field...</h3>}
		</div>
	);
};

export default TodoList;
