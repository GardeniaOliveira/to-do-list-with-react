
import "./App.css";
import { useState, useEffect } from "react";
import { BsTrash, BsBookMarckCheck, BsBookMarckCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [toDo, setToDo] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title)
  };
  return (
    <div className="App">
      <div className="toDo-header">
        <h1>To do List</h1>
      </div>

      <div className="form-toDo">
        <h2>Create your task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">What do you want to do?</label>
            <input
              type="text"
              name="title"
              placeholder="task title"
              //get what the user typed
              onChange={(e) => setTitle(e.target.value)}
              value={title}

              required
            />
          </div>
          <button type="submit" >CREATE</button>
        </form>
      </div>
      <div className="list-toDo">
        <h2>Task list:</h2>
        {
          toDo.length === 0 && <p>There are not tasks!</p>
        }
      </div>
    </div>
  );
}

export default App;
