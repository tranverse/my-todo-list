import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
const TodoItem = ({ todo, updateTodo, removeTodo }) => {
  const handleUpdate = async ({ id, completed }) => {
    console.log(completed);
    await updateTodo({ id, completed });
  };
  const handleRemoveTodo = async (id) => {
    await removeTodo(id);
  };
  return (
    <div className="flex justify-between border border-purple-400 my-2 p-4 rounded-xl">
      <div className="flex gap-4 items-center">
        <div
          className={`border w-3 h-3 border-purple-400 cursor-pointer flex items-center justify-center 
            ${todo.completed ? "bg-purple-400" : ""} `}
          onClick={() =>
            handleUpdate({ id: todo._id, completed: !todo.completed })
          }
        >
          {todo.completed && (
            <FaCheck className="text-3xl font-bold text-white" />
          )}
        </div>
        <div
          className={`${todo.completed ? "line-through text-gray-500" : ""}`}
        >
          {todo.title}
        </div>
      </div>
      <div
        onClick={() => handleRemoveTodo(todo._id)}
        className="cursor-pointer"
      >
        <IoTrashOutline className="text-red-500" />
      </div>
    </div>
  );
};

export default TodoItem;
