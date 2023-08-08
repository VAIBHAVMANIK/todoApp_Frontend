import React from "react";
import "../Styles/ToDo.css"

function todo({id,title,description,isCompleted,updateHandler,deleteHandler,isLoading}) {
  return (
    <div  className="todo-task">
      <div className="info">
        <label className="title">{title}</label>
        <label className="description">{description}</label>
      </div>
      <div className="buttons">
        <input type="checkbox" onChange={()=>{updateHandler(id)}} className="checkbox" checked={isCompleted} disabled={isLoading}/>
        <button onClick={()=>{deleteHandler(id)}} disabled={isLoading}>Delete</button>
      </div>
    </div>
  );
}

export default todo;
