import classes from "./App.module.css";

import Card from "./components/Card";

import Tree from "./components/Tree/Tree";
import Calculator from "./components/Calculator/Calculator";
import Stopwatch from "./components/Stopwatch/Stopwatch";
import TodoList from "./components/ToDo/ToDo";
import Login from "./components/Login/Login";
import ReducerExample from "./components/Reducer/Reducer";
import Increment from "./components/Increment/Increment";

function App() {
	return (
		<div className={classes.main}>
			<Card title="File Tree" description="A file tree component that rescursively renders a series of nested unordered lists that represent a file structure.">
				<Tree />
			</Card>
			<Card title="Login Form" description="A login form with basic validation that sends a request to https://jsonplaceholder.typicode.com/ if the form is valid and outputs the response in the textarea below.">
				<Login />
			</Card>
			<Card title="Multi-field Form Reducer" description="A series of text input fields that utilize the useReducer() hook to execute actions across all of them.">
				<ReducerExample />
			</Card>
			<Card title="Stopwatch" description="A basic stopwatch component where users can pause/resume the timer and record/clear lap times.">
				<Stopwatch />
			</Card>
			<Card title="ToDo List" description="A basic ToDo list component where users can add and remove items to the list.">
				<TodoList />
			</Card>
			<Card title="Increment" description="A counter component where users can increment and decrement the counter by the entered value.">
				<Increment />
			</Card>
			<Card title="Calculator" description="A basic calculator app where users can add, subtract, multiply, and divide two numbers.">
				<Calculator />
			</Card>
    </div>
	);
}

export default App;
