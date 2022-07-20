import React, { useEffect, useState } from "react";
import Input from "./input";

export const TodosList = () => {
  const [inputV, setInputV] = useState("");
  const [todo, setTodos] = useState([{ label: "walk the dog", done: false }]);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/Luffy85q", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        // console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        console.log("este es un post")
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
     
   
  }, []);

  function inputValue(e) {
    const itemValue = e.target.value;
    setInputV(itemValue);
  }

function getTasks () {
  fetch('https://assets.breatheco.de/apis/fake/todos/user/Luffy850')
  .then((resp) => {
    console.log(resp.ok); // will be true if the response is successfull
    console.log(resp.status); // the status code = 200 or code = 400 etc.
    console.log(resp.text()); // will try return the exact result as string
    return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
  })
  .then((data) => {
    console.log("este es un get")
    console.log(data); //this will print on the console the exact object received from the server
  })
  .catch(error => {
      //error handling
      console.log(error);
  })
}
  function addNewTask(e) {
    if (e.key === "Enter" && inputV != "") {
      const task = {
        label: inputV,
        done: false,
      };
      
      setTodos([...todo, task]);
      setInputV("");
      console.log(todo)
      fetch("https://assets.breatheco.de/apis/fake/todos/user/Luffy850", {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log("este es un put")
          return resp.json();
          
          // (returns promise) will try to parse the result as json as return a promise that you can .then for results
        })
        // .then((data) => {
        //   setTodos(data); 
        // })
        // .catch((error) => {
        //   console.log(error)
        // });
    }
  }

  function deleteTask(i) {
    const clearTodo = todo.filter((item, index) => index !== i);
    setTodos(clearTodo);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/Luffy850", {
      method: "PUT",
      body: JSON.stringify(clearTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        //   console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        console.log("este es un put")
        console.log("testing", data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }
 
  
  let clearTodos = (i) => {
    setTodos([]);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/Luffy850", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log("este es un delete")
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container bg-secondary  bg-opacity-10  p-5">
      <h1>To do List :</h1>
      <div className="Container mt-5 p-1 align-items-center">
        <div className="card border border-success">
          <div className="input-group mb-3">
            <span className="input-group-text border-bottom border-success">
              Tasks
            </span>
            <input
              type="text"
              className="form-control border-0"
              onChange={inputValue}
              onKeyDown={addNewTask}
              value={inputV}
            />
          </div>

          <ul className="list-group">
            {todo.map((tarea, index) => (
              <Input
                key={index}
                id={index}
                tarea={tarea.label}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        </div>

        <div className="flex">
          {todo.length === 0
            ? "No tasks, add a task"
            : `Number of Tasks: ${todo.length}`}
        </div>
      </div>

      <button
        className="btn btn-outline-danger m-4"
        onClick={() => clearTodos()}
      >
        Delete Set List
      </button>
    </div>
  );
};

export default TodosList;
