import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';

import Card from "./components/Card";

import Delay from "./components/Delay/Delay";
import UseContext from "./components/UseContext/UseContext";
import Tree from "./components/Tree/Tree";
import Calculator from "./components/Calculator/Calculator";
import Stopwatch from "./components/Stopwatch/Stopwatch";
import TodoList from "./components/ToDo/ToDo";
import Login from "./components/Login/Login";
import ReducerExample from "./components/Reducer/Reducer";
import Counter from "./components/Counter/Counter";
import ReactHookForm from "./components/ReactHookForm/ReactHookForm";

function App() {
	return (
		<Box sx={{ flexGrow: 1, maxWidth: '1200px', padding: '36px'}}>
			<Grid container spacing={2}>
				
					<Card
						title="mui + react-hook-form"
						description="A component that uses Material UI form elements and the react-hook-form library to control the overall form."
					>
						<ReactHookForm />
					</Card>

				
					<Card
						title="delay"
						description="A component that uses a promise to display an entered message after a specified delay (in ms)."
					>
						<Delay />
					</Card>

				
					<Card
						title="useContext() example"
						description="A component with a nested child component that utilizes the useContext() hook to access/update app-wide state via a custom Provider component."
					>
						<UseContext />
					</Card>

				
					<Card
						title="file tree"
						description="A file tree component that rescursively renders a series of nested unordered lists that represent a file structure."
					>
						<Tree />
					</Card>

				
					<Card
						title="login"
						description="A login form with basic validation that sends a request to https://jsonplaceholder.typicode.com/ if the form is valid and outputs the response in the textarea below."
					>
						<Login />
					</Card>

				
					<Card
						title="useReducer() example"
						description="A series of text input fields that utilize the useReducer() hook to execute actions across all of them."
					>
						<ReducerExample />
					</Card>

				
					<Card
						title="stopwatch"
						description="A basic stopwatch component where users can pause/resume the timer and record/clear lap times."
					>
						<Stopwatch />
					</Card>

				
					<Card
						title="todo"
						description="A basic ToDo list component where users can add and remove items to the list."
					>
						<TodoList />
					</Card>

				
					<Card
						title="counter"
						description="A counter component where users can increment and decrement the counter by the entered value."
					>
						<Counter />
					</Card>

				
				<Card
					title="calculator"
					description="A basic calculator app where users can add, subtract, multiply, and divide two numbers."
				>
					<Calculator />
				</Card>

			</Grid>
		</Box>
	);
}

export default App;
