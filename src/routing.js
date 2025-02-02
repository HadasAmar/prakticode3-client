import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/register"
import Tasks from "./components/tasks"

export const Routing = () => {
    return <>
        <Routes>

            <Route path="toLogin" element={<Login></Login>} />

            <Route path="/" element={<Login></Login>} />

            <Route path="toRegister" element={<Register></Register>} />

            <Route path="toTasks" element={<Tasks></Tasks>} /> 
               </Routes>
    </>
}