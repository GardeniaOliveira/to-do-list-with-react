
import "./App.css";
import { useState, useEffect } from "react";



import Header from "./components/Header";
import Form from "./components/Form";
import ListTask from "./components/ListTask";


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

      <Header />

      <Form
        titleForm="Create your task"
        handleSubmit={handleSubmit}
        setTitle={setTitle}
        title={title}
        setTime={setTime}
        time={time}

      />

      <ListTask
        titleList="Task list"
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        toDo={toDo}
      />





    </div>
  );
}

export default App;
