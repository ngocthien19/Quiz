import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser  from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import PrivateRoute from "./routes/PrivateRoute";
import React, { Suspense } from "react";

const NotFound = () => {
    return (
        <div className="container mt-3 alert alert-danger">
            404. Not found data with your current URL
        </div>
    )
}
const Layout = () => {
    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} ></Route>
                    <Route 
                        path="/users" 
                        element={
                            <PrivateRoute>
                                <ListQuiz />
                            </PrivateRoute>
                        } 
                    />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} ></Route>

                <Route 
                    path="/admin" 
                    element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    } 
                
                >
                    <Route index element={<DashBoard />} ></Route>
                    <Route path="manage-users" element={<ManageUser />} ></Route>
                    <Route path="manage-quizzes" element={<ManageQuiz />} ></Route>
                    <Route path="manage-questions" element={<Questions />} ></Route>
                </Route>

                <Route path="/login" element={<Login />} ></Route>
                <Route path="/register" element={<Register />} ></Route>
                <Route path="/test" element={<PrivateRoute />} ></Route>
                <Route path="*" element={<NotFound />} ></Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Suspense>
    )
}

export default Layout