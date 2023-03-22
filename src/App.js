
import "./App.css";
import { useState, useEffect } from "react";
import { BsTrash, BsCircle, BsCircleFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [toDo, setToDo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const res = await fetch(`${API}/todo`)
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.error(err))

      setLoading(false);

      setToDo(res)


    };
    loadData();

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    //send to api
    const toDo = {
      id: Math.random(),
      title,
      time,
      done: false,
    }



    await fetch(`${API}/todo`, {
      method: 'POST',
      body: JSON.stringify(toDo),
      headers: {
        "content-type": "application/json",
      }
    });

    //get what was before and update with the new task
    setToDo((prevState) => [...prevState, toDo]);

    //to clean the input
    setTitle("")
    setTime("")
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/todo/${id}`, {
      method: 'DELETE',
    });

    setToDo((prevState) => prevState.filter((toDo) => toDo.id !== id));
  }

  const handleEdit = async (toDo) => {
    //change from done to not done
    toDo.done = !toDo.done;

    const data = await fetch(`${API}/todo/${toDo.id}`, {
      method: 'PUT',
      body: JSON.stringify(toDo),
      headers: {
        "content-type": "application/json",
      }
    })
    setToDo((prevState) =>
      prevState.map((toDo) => (toDo.id === data.id ? (toDo = data) : toDo)));
  }

  return (
    <div className="App">
      <div className="toDo-header">
        <h1>To do List</h1>
      </div>

      <div className="form-toDo">
        <h2>Create your task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">Task title: </label>
            <input
              type="text"
              name="title"
              //get what the user typed
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="time">Duration:</label>
            <input
              type="text"
              name="time"
              placeholder="duration in hours"
              //get what the user typed
              onChange={(e) => setTime(e.target.value)}
              value={time}
              required
            />
          </div>

          <button type="submit" >CREATE</button>
        </form>
      </div>
      <div className="list-toDo">
        <h2>Task list</h2>
        {toDo.length === 0 && <p>There are not tasks!</p>}
        {toDo.map((toDo) => (
          <div className="toDo" key={toDo.id}>
            <div className="toDo-title">
              <h3 className={toDo.done ? "toDo-done" : "toDo"}>{toDo.title}</h3>
            </div>
            <div className="toDo-time">
              <p className="time">{toDo.time}</p>
            </div>
            <div className="actions">
              <span onClick={() => handleEdit(toDo)}>
                {!toDo.done ? <BsCircle /> : <BsCircleFill />}
              </span>
              <BsTrash onClick={() => handleDelete(toDo.id)} />
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}

export default App;
