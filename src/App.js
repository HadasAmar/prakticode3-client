import Tasks from "./components/tasks";
import Login from "./components/Login";
import Register from "./components/register";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./routing";
import { Home } from "./components/home";

function App() {
  

  return (
    <div>
      <BrowserRouter>
     <Home></Home>
    {/* <Tasks></Tasks> */}
    <Routing></Routing>
    </BrowserRouter>
    </div>
  );
}

export default App;
