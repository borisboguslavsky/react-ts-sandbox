import { Grid } from "@mui/material";

import Applet from "./components/Applet";

import Delay from "./components/Delay/Delay";
import UseContext from "./components/UseContext/UseContext";
import Tree from "./components/Tree/Tree";
import Calculator from "./components/Calculator/Calculator";
import Stopwatch from "./components/Stopwatch/Stopwatch";
import TodoList from "./components/ToDo/ToDo";
import Login from "./components/Login/Login";
import ReducerExample from "./components/Reducer/Reducer";
import ReactHookForm from "./components/ReactHookForm/ReactHookForm";
import VendingMachine from "./components/VendingMachine/VendingMachine";
import FontTreeCheckbox from "./components/TreeSelect/TreeSelect";
import TanstackQuery from "./components/TanstackQuery/TanstackQuery";

function App() {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1, maxWidth: "1200px", padding: "36px" }}>
      <Applet
        title="XState Vending Machine"
        description="A vending machine demo that uses state machine built with the XState library."
      >
        <VendingMachine />
      </Applet>

      <Applet
        title="Tanstack Query"
        description="A component that users @tanstack/react-query to fetch data from the swapi.dev REST API."
      >
        <TanstackQuery />
      </Applet>

      <Applet
        title="Tree Select"
        description="A tree view component with selectable nodes depicting a font tree with font families and sub-fonts. Uses MUI <TreeView>"
      >
        <FontTreeCheckbox />
      </Applet>

      <Applet
        title="React-Hook-Form"
        description="A component that uses the react-hook-form library to control the overall form and yup for client-side validation."
      >
        <ReactHookForm />
      </Applet>

      <Applet
        title="Delay"
        description="A component that uses a promise to display an entered message after a configurable delay (in ms)."
      >
        <Delay />
      </Applet>

      <Applet
        title="Example: useContext()"
        description="An example of how the useContext() hook can be used to access/update app-wide state via a custom Provider component."
      >
        <UseContext />
      </Applet>

      <Applet
        title="Example: useReducer()"
        description="An example of how the useReducer() hook can be used to execute complex actions."
      >
        <ReducerExample />
      </Applet>

      <Applet
        title="File Tree"
        description="A file tree component that rescursively renders a series of nested unordered lists that represent a file structure."
      >
        <Tree />
      </Applet>

      <Applet
        title="Mock Login"
        description="A login form with basic validation that sends a request to https://jsonplaceholder.typicode.com/ if the form is valid and outputs the response in the textarea below."
      >
        <Login />
      </Applet>

      <Applet
        title="Stopwatch"
        description="A basic stopwatch component where users can pause/resume the timer and record/clear lap times."
      >
        <Stopwatch />
      </Applet>

      <Applet
        title="Todo List"
        description="A basic ToDo list component where users can add and remove items to the list."
      >
        <TodoList />
      </Applet>

      <Applet
        title="Calculator"
        description="A basic calculator app where users can add, subtract, multiply, and divide two numbers."
      >
        <Calculator />
      </Applet>
    </Grid>
  );
}

export default App;
