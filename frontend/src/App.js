import Signin from "./pages/signin";
import NotFound from "./pages/notFound";
import Signup from "./pages/signup";
import Home from "./pages/home.jsx";
import AddUser from "./pages/addUser";
import ManageUser from "./pages/manageUser";
import Edit from "./components/Edit";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Signin />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home/*" element={<Home />}>
            <Route index element={<Home />} />
            <Route path="addUser" element={<AddUser />} />
            <Route path="manageUser" element={<ManageUser />} />
            <Route path="editUser" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
