import React from "react";
import MainAppS from "./MainAppS";
import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  isAdmin: boolean;
}

interface Task {
  id: number | null;
  body: string | null;
}

const MainApp = ({ isAdmin }: Props) => {
  const [Task, setTask] = useState<Task[]>([]);
  const [Body, setBody] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/allTask").then((res) => {
        setTask(res.data);
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  const SubmitTask = () => {
    const token = localStorage.getItem("token");
    if (Body) {
      axios({
        url: "http://localhost:5000/allTask",
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        data: {
          body: Body,
        },
      })
        .then((res) => {
          console.log(res);

          setTask(res.data);
        })
        .catch((err) => {
          setIsError(true);
        });
    }
  };

  const DeleteTask = (id: number | null) => {
    const token = localStorage.getItem("token");

    axios({
      url: `http://localhost:5000/allTask/delete/${id}`,
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);

        setTask(res.data);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  return (
    <MainAppS>
      <h1>ToDo with Admin</h1>
      <div>
        {isError ? (
          <h2>
            La tua sessione è scaduta{" "}
            <a href="http://localhost:3000/Login">Torna al Login</a>{" "}
          </h2>
        ) : (
          <ul>
            {Task.map((e) => {
              return (
                <li key={e.id}>
                  {e.body} {e.id}{" "}
                  {isAdmin && (
                    <button onClick={() => DeleteTask(e.id)}>x</button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="form">
        <input type="text" onChange={(e) => setBody(e.target.value)} />
        <button onClick={SubmitTask}>Add</button>
      </div>
    </MainAppS>
  );
};

export default MainApp;
