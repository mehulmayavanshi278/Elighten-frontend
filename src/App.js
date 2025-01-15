import "./App.css";
import { useEffect } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

import UserLayout from "./layouts/UserLayout";
import Tasks from "./components/Task/Tasks";
import Todo from "./components/ToDo/Todo";
import Logs from "./components/Logs/Logs";

import SingleTask from "./components/Task/SingleTask";
import SingleTaskview from "./components/ToDo/SingleTaskview";
import TaskProvider from "./context/TaskProvider";

import SocketProvider from "./context/SocketProvider";
import { getUserRole } from "./utility/role";
const user = getUserRole();

function App() {

  useEffect(() => {
    // toast.success('App is ready');
  }, []);

  return (
    <BrowserRouter>
      <SocketProvider>
        <TaskProvider>


          <Routes>

            {  <Route path="/" element={ !user?.role ? <Login /> : <Navigate to='/user/tasks'/>} />}

       {   user &&  <Route element={<UserLayout />}>
              <Route path="/user" element={<Navigate to="/user/tasks" />} />

              <Route path="/user/tasks" element={<Tasks />}>
                <Route path=":id" element={<SingleTask />} />
              </Route>

              {user?.role === "Employee" && (
                <Route path="/user/todo" element={<Todo />}>
                  <Route path=":id" element={<SingleTaskview />} />
                </Route>
              )}

              <Route path="/user/logs" element={<Logs />} />
            </Route>}

            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>

        </TaskProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
