import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/register"
import Tasks from "./components/tasks"

export const Routing = () => {
    return <>
        <Routes>

            <Route path="toLogin" element={<Login></Login>} />

            {/* דף אודות */}
            <Route path="toRegister" element={<Register></Register>} />

            {/* דף יצירת קשר */}
            <Route path="toTasks" element={<Tasks></Tasks>} /> 
               </Routes>
    </>
}