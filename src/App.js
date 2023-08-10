import { BrowserRouter, Routes , Route } from "react-router-dom";
import { AddTask } from "./container/addTask";
import { Login } from "./container/login";
import { SignUp } from "./container/signup";
import { Update } from "./container/update";
import { ViewTask } from "./container/viewTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewTask/>} />
        <Route path="/addtask" element={<AddTask/>} />
        <Route path="/edit/:id" element={<Update/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
