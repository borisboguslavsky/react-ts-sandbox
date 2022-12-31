import classes from "./App.module.css";

import WrapperComponent from "./components/WrapperComponent";

import Tree from "./components/Tree/Tree";
import AddNums from "./components/AddNums/AddNums";
import Stopwatch from "./components/Stopwatch/Stopwatch";
import TodoList from "./components/ToDo/ToDo";
import Login from "./components/Login/Login";
import ReducerExample from "./components/Reducer/Reducer";
import Increment from "./components/Increment/Increment";

function App() {
	return (
		<div className={classes.main}>
			<WrapperComponent title="Increment & decrement">
				<Increment />
			</WrapperComponent>
			<WrapperComponent title="Reducer with useReducer()">
				<ReducerExample />
			</WrapperComponent>
			<WrapperComponent title="Login form with fetch()">
				<Login />
			</WrapperComponent>
			<WrapperComponent title="Recursive file tree">
				<Tree />
			</WrapperComponent>
			<WrapperComponent title="Add numbers with useRef()">
				<AddNums />
			</WrapperComponent>
			<WrapperComponent title="Stopwatch">
				<Stopwatch />
			</WrapperComponent>
			<WrapperComponent title="Todo list">
				<TodoList />
			</WrapperComponent>
    </div>
	);
}

export default App;
