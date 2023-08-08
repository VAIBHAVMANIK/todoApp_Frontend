import React, { useContext, useEffect, useState } from "react";
import "../Styles/Home.css";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import ToDo from "../Components/ToDo";

function Home() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  let name, value;

  useEffect(() => {
    axios
      .get(`${server}/task/allTask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [refresh]);

  const updateHandler=async(id)=>{
    try {
      setIsLoading(true);
      const {data} =await axios.patch(`${server}/task/${id}`,{},{withCredentials: true});
      setRefresh(prev=>!prev);
      toast.success(data.message);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  const deleteHandler=async(id)=>{
    try {
      setIsLoading(true);
      const {data} = await axios.delete(`${server}/task/${id}`,{},{withCredentials:true});
      setRefresh(prev=>!prev);
      toast.success(data.message);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  
  const formhandler = (e) => {
    name = e.target.name;
    value = e.target.value;
    setTask({ ...task, [name]: value });
  };

  const submiHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/task/new`, task, {
        header: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
      setTask({
        title: "",
        description: "",
      });
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }



  return (
    <div className="task-container">
      <div className="create-task">
        <div className="title">
          <h2>Create Your Tasks</h2>
        </div>
        <div>
          <form className="task-form" onSubmit={submiHandler}>
            <input
              type="text"
              name="title"
              required={true}
              placeholder="Title"
              value={task.title}
              onChange={formhandler}
            />
            <input
              type="text"
              name="description"
              required={true}
              placeholder="Description"
              value={task.description}
              onChange={formhandler}
            />
            <button type="submit" disabled={loading}>
              Create Task
            </button>
          </form>
        </div>
      </div>
      <div className="show-task">
        <div className="show-title">
          <h2>Tasks To Do</h2>
        </div>
        {tasks.length===0?<h1 className="completed">All TASKS ARE DONE</h1>:(tasks.map((i) => (
            <ToDo
              key={i._id}
              id={i._id}
              title={i.title}
              description={i.description}
              isCompleted={i.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              isLoading={isLoading}
            />
          )))}
      </div>
    </div>
  );
}

export default Home;
