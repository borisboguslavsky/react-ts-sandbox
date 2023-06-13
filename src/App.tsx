import { Box } from "@mui/system";
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Grid } from "@mui/material";

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
import VendingMachine from "./components/VendingMachine/VendingMachine";
import { FontTree } from "./components/FontTree/FontTree";
import FontTreeCheckbox from "./components/FontTreeCheckbox/FontTreeCheckbox";
import { RcTreeSelect } from "./components/RcTreeSelect/RcTreeSelect";
import { ReactQuery } from "./components/ReactQuery/ReactQuery";

function App() {
	return (
		<Box sx={{ flexGrow: 1, maxWidth: "1200px", padding: "36px" }}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="XState Vending Machine"
						description="A state machine example using the XState library."
					>
						<VendingMachine />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="React Query"
						description="A component that users @tanstack/react-query to fetch data from the Star Wars API."
					>
						<ReactQuery />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="Tree Select (v2)"
						description="A tree view component with selectable nodes depicting a font tree with font families and sub-fonts. Uses MUI <TreeView>"
					>
						<FontTreeCheckbox />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="Tree Select (v1)"
						description="A tree view component with selectable nodes depicting a font tree with font families and sub-fonts. Uses MUI <TreeView>"
					>
						<FontTree />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="React-Hook-Form"
						description="A component that uses Material UI form elements and the react-hook-form library to control the overall form."
					>
						<ReactHookForm />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="Delay"
						description="A component that uses a promise to display an entered message after a specified delay (in ms)."
					>
						<Delay />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="Example: useContext()"
						description="A component with a nested child component that utilizes the useContext() hook to access/update app-wide state via a custom Provider component."
					>
						<UseContext />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="File Tree"
						description="A file tree component that rescursively renders a series of nested unordered lists that represent a file structure."
					>
						<Tree />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="Mock Login"
						description="A login form with basic validation that sends a request to https://jsonplaceholder.typicode.com/ if the form is valid and outputs the response in the textarea below."
					>
						<Login />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="Example: useReducer()"
						description="A series of text input fields that utilize the useReducer() hook to execute actions across all of them."
					>
						<ReducerExample />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="Stopwatch"
						description="A basic stopwatch component where users can pause/resume the timer and record/clear lap times."
					>
						<Stopwatch />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="Todo List"
						description="A basic ToDo list component where users can add and remove items to the list."
					>
						<TodoList />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="Counter"
						description="A counter component where users can increment and decrement the counter by the entered value."
					>
						<Counter />
					</Card>
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<Card
						title="Calculator"
						description="A basic calculator app where users can add, subtract, multiply, and divide two numbers."
					>
						<Calculator />
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
}

export default App;
