import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TodoItem from "../components/TodoItem";
import axios from "axios";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3000/api/todos");
    setTodos(response.data);
  };
  const updateTodo = async ({ id, completed }) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/todos/${id}`, {
        completed,
      });
      setTodos((prev) =>
        prev.map((t, index) => {
          if (t._id === id) return { ...t, completed: res.data.completed };
          return t;
        }),
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title == "") {
      setError("Name is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/todos", {
        title,
      });
      setTodos((prev) => [...prev, res.data]);
      setTitle("");
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const removeTodo = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center my-20">
        <div className="">
          <h1 className="font-bold text-2xl text-purple-400 uppercase text-center">
            Todo app
          </h1>
          <div className="my-10">
            <form
              action=""
              onSubmit={handleSubmit}
              className="border border-purple-400 rounded-xl  overflow-hidden"
            >
              <input
                type="text"
                className="outline-none p-2 w-lg"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                value={title}
              />
              <button
                className="bg-purple-400 p-2  text-white font-semibold cursor-pointer"
                type="submit"
              >
                Add
              </button>
            </form>
            {error && (
              <span className="text-red-500 italic text-sm text-start">
                {error}
              </span>
            )}
          </div>

          <div>
            {todos.map((todo, index) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                updateTodo={updateTodo}
                removeTodo={removeTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
