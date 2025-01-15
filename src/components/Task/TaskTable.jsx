import React, { useEffect } from 'react';
import './table.css';
import { filterOptions } from './Tasks';
import { useNavigate } from 'react-router-dom';
import apiService from '../../apiService/apiService';
import { getUserRole } from '../../utility/role';
const user = getUserRole();


console.log(user)
const TaskTable = React.memo(({tasks , setTasks , getTasks}) => {
  console.log('table rendered')
  const router = useNavigate();


const handleUpdateStatus = async(uniqueId , value)=>{
  console.log(value)

  try{
    const res = await apiService.updateTask(uniqueId , {status:value});
    if(res.status===200){
      getTasks();
    }
  }catch(err){
    console.log(err);
  }
}
  useEffect(()=>{

  },[]);

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task) => (
          <tr key={task.id}>
            <td>{task.title.slice(0,26)}</td>
            <td>{task.assaignTo?.email?.slice(0,18)}</td>
            <td className={`status ${task.status.toLowerCase()}`}>
              <select disabled={user?.role!=="HR" && user?._id.toString()!==task?.assaignTo._id.toString()} onChange={(e)=>{handleUpdateStatus(task._id , e.target.value)}} className={`view-details-btn-${task.status.toLowerCase().replaceAll(" " , "")} `} value={task.status}>

              {
                filterOptions['status']?.map((elm,id)=>{
                  return(
                    <>
                    <option key={elm+id} name={elm} value={elm} style={{backgroundColor:'white',color:'black'}}  > {elm}
                      </option>
                    </>
                  )
                })
              }
              </select>
              </td>
            <td>{task.createdAt}</td>
            <td><button className="view-details-btn" onClick={()=>{router(`${task._id}`)}}>View Details</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default TaskTable;
