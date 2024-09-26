
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Tasks/>}/>
      </Routes>
      <ToastContainer />
    </Router>
    
  );
}

export default App;
