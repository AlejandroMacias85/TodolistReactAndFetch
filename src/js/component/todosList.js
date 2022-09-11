import React, { useEffect, useState } from "react";
import Input from "./input";
import { Card, ListGroup, Button } from "react-bootstrap";

export const TodosList = () => {
  const [inputV, setInputV] = useState("");
  const [todo, setTodos] = useState([{ label: "walk the dog", done: false }]);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/Luffy85")
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.log(error);})
        
    fetch("https://assets.breatheco.de/apis/fake/todos/user/Luffy85", {
      method: "POST",
      body: JSON.stringify([]),
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
        // setTodos(data);
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


  function addNewTask(e) {
    
    if (e.key === "Enter" && inputV != "") {
      const task = {
        label: inputV,
        done: false,
      };
      let newTodos = [...todo, task];
      setTodos(newTodos);
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
        })
        .then((data) => {
          console.log(data); 
        })
        .catch((error) => {
          console.log(error)
        });
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
    <>
    <Card className="bg-dark text-white text-center">
      <Card.Img src="https://getwallpapers.com/wallpaper/full/b/4/0/393582.jpg" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title><h1>To do List :</h1></Card.Title>
        <Card.Body style={{ width: '30rem' }} className="bg-dark opacity-75 border border-1 position-fixed top-50 start-50 translate-middle">
        <ListGroup variant="flush">
          <div className="input-group mb-3">
            <span className="input-group-text outline-secondary">
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
            <ListGroup.Item>  {todo.map((tarea, index) => (
              <Input
                key={index}
                id={index}
                tarea={tarea.label}
                onDelete={deleteTask}
              />
            ))}</ListGroup.Item>
 
        </ListGroup>
        <Card.Text>        <div className="flex">
{todo.length === 0
  ? "No tasks, add a task"
  : `Number of Tasks: ${todo.length}`}
</div></Card.Text>
        <Button variant="btn btn-outline-danger" onClick={() => clearTodos()}>Delete Set List</Button>

        </Card.Body>

      </Card.ImgOverlay>
      <Card.Footer className = "d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <small className="text-muted">© 2022 Company, Inc</small>
        </Card.Footer>
    </Card>

    </>
  );
};

export default TodosList;






