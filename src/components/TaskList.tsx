import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskMain from "./Task";
import { toast } from "react-toastify";
import axios from "axios";
import loadingImg from "../assets/loader.gif";
import { URL } from "../App";
import { Task } from "../interfaces";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskID, setTaskID] = useState<string>("");
  const [formData, setFormData] = useState<{
    name: string;
    completed: boolean;
  }>({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<Task[]>(`${URL}/api/v1/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty!");
    }
    try {
      await axios.post(`${URL}/api/v1/tasks`, formData);
      toast.success("Task added successfully");
      setFormData({ name: "", completed: false });
      getTasks();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${URL}/api/v1/tasks/${id}`);
      getTasks();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const compTask = tasks.filter((task) => task.completed);
    setCompletedTasks(compTask);
  }, [tasks]);

  const getSingleTask = async (task: Task) => {
    setFormData({ name: task.name, completed: false });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
      await axios.put(`${URL}/api/v1/tasks/${taskID}`, formData);
      setFormData({ name: "", completed: false });
      setIsEditing(false);
      getTasks();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (task: Task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };
    try {
      await axios.put(`${URL}/api/v1/tasks/${task._id}`, newFormData);
      toast.success("Task Completed");
      getTasks();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="main-task">
      <h2>Notely .v2</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />

      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Notes:</b> {tasks.length}
          </p>
          <p>
            <b>Completed:</b> {completedTasks.length}
          </p>
        </div>
      )}

      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <div className="--py">No Note added. Please add a Note</div>
      ) : (
        <>
          {tasks.map((task, index) => (
            <TaskMain
              key={task._id}
              task={task}
              index={index}
              deleteTask={deleteTask}
              getSingleTask={getSingleTask}
              setToComplete={setToComplete}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TaskList;
