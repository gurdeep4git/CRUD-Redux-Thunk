import { TaskDetails } from "./components/TaskDetails/TaskDetails";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { Tasks } from "./components/Tasks/Tasks";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="navbar bg-info">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Tasks App</span>
        </div>
      </nav>
      <div className="container py-3">
        <Routes>
          <Route path="/" exact element={<Tasks />}></Route>
          <Route path="/details/:id" element={<TaskDetails />}></Route>
          <Route path="/edit/:id" element={<TaskForm />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
