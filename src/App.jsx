import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchtask();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleTask = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), text: todo, isCompleted: false }]);
    setTodo("");
  };


  const fetchtask = () => {
    let todoStr = localStorage.getItem("todos");
    if (todoStr) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  };

  const handleInput = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(
      todos.filter((item) => {
        item.id !== id;
      })
    );
  };

  return (
    <>
      <div className="bg-violet-950 flex justify-center items-center w-full h-screen">
        <div className="bg-violet-600 p-6 rounded-xl w-[94%] sm:w-[80%] lg:w-[60%] border-2 border-white flex flex-col max-w-2xl">
          <h1 className="text-2xl text-white font-bold sm:text-3xl text-center hover:cursor-pointer mb-3">
            TODO LIST
          </h1>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-0 items-center">
            <input
              value={todo}
              type="text"
              onChange={handleInput}
              className="w-full max-w-md px-4 sm:px-6 md:px-8 lg:px-10 py-2 text-base sm:text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-800"
              placeholder="Enter something..."
              aria-label="Input field"
            />
            <button
              className="ml-2 px-12 sm:px-4 py-2 bg-white text-violet-800 rounded-md hover:text-violet-700 hover:scale-105 transition-all duration-75 focus:outline-none focus:ring-2 focus:ring-violet-800"
              onClick={handleTask}
            >
              Add
            </button>
          </div>

          <div className="divider border-white border mt-3 w-full h-px opacity-0 scale-x-0 animate-grow-in mb-2"></div>
          {todos.map((item) => {
            return (
              <div className=" flex flex-col" key={item.id}>
                <div className="info flex justify-between gap-2 max-wd-md px-12">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleCheckbox(item.id);
                    }}
                  />
                  <p
                    className={`text-xl text-white font-bold flex-1 ${
                      item.isCompleted ? "line-through opacity-60" : ""
                    }`}
                  >
                    {item.text}
                  </p>
                  <button
                    className="ml-2 px-6 sm:px-2 py-1 bg-white text-violet-800 rounded-md hover:text-violet-700 hover:scale-105 transition-all duration-75 focus:outline-none focus:ring-2 focus:ring-violet-800"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="divider border-white border mt-3 w-full h-px mb-2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
