import React, { ChangeEvent, FormEvent } from "react";

interface TaskFormProps {
  createTask: (e: FormEvent<HTMLFormElement>) => void;
  name: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  updateTask: (e: FormEvent<HTMLFormElement>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  createTask,
  name,
  handleInputChange,
  isEditing,
  updateTask,
}) => {
  return (
    <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
      <input
        type="text"
        placeholder="Add a Note"
        name="name"
        value={name}
        onChange={handleInputChange}
      />

      <button type="submit">
        {/* If isEditing is true, edit, else add */}
        {isEditing ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default TaskForm;
