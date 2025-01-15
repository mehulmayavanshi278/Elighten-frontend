import React, { useEffect, useState } from 'react'
import TaskTable from '../Task/TaskTable'
import { Outlet } from 'react-router-dom'
import apiService from '../../apiService/apiService';

function Todo() {
  const [tasks , setTasks] = useState();
  const getAllTasks = async()=>{
    try{
      const res  = await apiService.getMyTodo();
      if(res.status===200){
        setTasks(res.data);
      }
    }catch(err){
      console.log(err);
    }
  }
  const getTasks = async()=>{
    try{
      const res = await apiService.getMyTodo();
      if(res.status===200){
        console.log("tasks:" , res.data);
        setTasks(res.data)
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getAllTasks();
  },[]);
  return (
    <div className="outlet-outer" style={{display:'flex'}}>
    <div className="task-table-body" >
       <TaskTable tasks={tasks} setTasks={tasks} getTasks={getTasks}/>
     </div>
     <div className="">
     <Outlet/>
     </div>
    </div>
  )
}

export default Todo
