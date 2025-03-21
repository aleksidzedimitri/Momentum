import "./App.css";
import { Route, Routes } from "react-router";
import Taskpage from "./pages/TaskPage";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Taskpage />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </>
  );
}

export default App;
