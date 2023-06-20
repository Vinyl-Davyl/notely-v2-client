import { useState } from "react";
import TaskList from "./components/TaskList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* eslint-disable no-undef */
// Note this approach is recommended only for development purposes and should be removed before deploying your application.
const process = { env: { REACT_APP_SERVER_URL: "http://localhost:8080" } };

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className="app">
      <div className="task-container">
        <TaskList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
