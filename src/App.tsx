import classes from './App.module.css'

import Tree from './components/Tree/Tree';
import AddNums from './components/AddNums/AddNums';
import Stopwatch from './components/Stopwatch/Stopwatch';
import TodoList from './components/ToDo/ToDo';
import Login from './components/Login/Login';
import ReducerExample from './components/Reducer/Reducer';
import Increment from './components/Increment/Increment';

function App() {
  return (
    <div className={classes.main}>
      <Increment />
      <ReducerExample />
      <Login />
      <Tree />
      <AddNums />
      <Stopwatch />
      <TodoList />
    </div>
  )
}

export default App
