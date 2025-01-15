import React, { useRef, useState } from "react";
import TaskTable from "./TaskTable";
import { Outlet } from "react-router-dom";
import NewTask from "./NewTask";
import apiService from "../../apiService/apiService";
import { getUserRole } from "../../utility/role";

const user = getUserRole();

export const filterOptions = {
  status: ["Pending", "In Progress", "In Review" ,  "Completed"],
  "Assaign by":[]
}


function Tasks() {



  const debounceSearch = useRef();
  const [tasks , setTasks] = useState([]);
  const [users , setUsers] = useState([]);
  const [activeFilter , setActiveFilter] = useState('status')
  const [activeStatusType , setActiveStatusType] = useState('')
  const [activeAssaignUser , setActiveAssaignUser ]  = useState('')
  const [isopenModel , setIsOpenModel] = useState(false);
  // const [queryParams , setParams] = useState({})

  const [search , setSearch] = useState();

  const handleAddNewTask = () =>{
     setIsOpenModel(true);
  }

  const handleSearch = (e)=>{
    setSearch(e.target.val);
    if(debounceSearch.current) clearTimeout(debounceSearch.current);
    debounceSearch.current = setTimeout(()=>{
        getfilteredTasks({search:e.target.value});
    },[1500]);
  }


  const getTasks = async()=>{
    try{
      const res = await apiService.getAllTasks();
      if(res.status===200){
        console.log("tasks:" , res.data);
        setTasks(res.data)
      }
    }catch(err){
      console.log(err);
    }
  }



  const getAllUsers=async()=>{
    try{
       const res=await apiService.getAllUsers({role:'Employee'});
       if(res.status===200){
        console.log("users:" , res.data);
        setUsers(res.data);
       }
    }catch(err){
      console.log(err);
    }
  }

  const getfilteredTasks = async(params)=>{
    try{
       console.log(activeAssaignUser)
       console.log(activeStatusType);
       console.log(params);
       const res = await apiService.getAllTasks(params);
       if(res.status===200){
        console.log(res.data);
        setTasks(res.data)
       }
    }catch(err){
      console.log(err);
    }
  }


  useState(()=>{
    getTasks();
    getAllUsers();
  },[]);

  return (
    <div className="home-container" >

       <div className="model"  style={{display:isopenModel ? 'flex' : 'none' }} onClick={()=>{setIsOpenModel(false)}}>
        { user?.role==="HR" && <NewTask getTasks={getTasks}/>}
       </div>
 
      <div className="task-navbar">
        <div className="">
          <input type="text" placeholder="search..." name="search" value={search} onChange={(e)=>{handleSearch(e)}}/>
        </div>


        <div className="filterBox-upper">

       
        <div className="filterBox" style={{position:"relative"}}>
            <p>Filter</p>

            <div className="filter-container">
              <div className="">
              
              {Object.keys(filterOptions).map((elm , id)=>{
                return(
                  <>
                  <li onClick={()=>{(setActiveFilter(elm))}} key={elm+id} className={`filter-menu ${ activeFilter ===elm ?  'active' : '' }`}>{elm}</li>
                  </>
                )
              })}

              
              </div>
              <div className="">
                {
                   activeFilter==="status" ? (
                    <>
                      {
                        filterOptions['status']?.map((elm,id)=>{
                          return(
                            <>
                            <li onClick={()=>{setActiveStatusType(elm);getfilteredTasks({status:elm})}} className={`status-child-menu ${activeStatusType===elm ? 'active' : ''}`} key={elm+id}> {elm}</li>
                            </>
                          )
                          

                        })
                      }
                      <button className="clear-all-button" onClick={()=>{setActiveStatusType("");getfilteredTasks({status:"",assaignTo:activeAssaignUser})}}>
      Clear All
    </button>
                    </>
                   ):
                   (
                    <>
                    <div className="">


                       {
                        users?.map((elm,id)=>{
                          return(
                            <>
                            
                            <li onClick={()=>{setActiveAssaignUser(elm._id);getfilteredTasks({assaignTo:elm._id})}} className={`status-child-menu  ${activeAssaignUser===elm._id ? 'active' : ''}`}> {elm.email.slice(0,18)} </li>
                            </>
                          )
                        })
                       }
                       <button className="clear-all-button" onClick={()=>{setActiveAssaignUser("");getfilteredTasks({status:activeStatusType , assaignTo:""})}}>
      Clear All
    </button>
                       </div>
                    </>
                   )
                }
              </div>
            </div>

        </div>
       
       {user?.role==="HR" && <div className="" style={{position:'relative'}}>
          <button className="addNewTaskBtn" onClick={()=>{handleAddNewTask()}}> + Add new</button>
        </div>}
        </div>
      </div>

     <div className="outlet-outer" style={{display:'flex'}}>
     <div className="task-table-body" >
        <TaskTable  tasks={tasks} setTasks={setTasks} getTasks={getTasks}/>
      </div>
      <div className="">
      <Outlet/>
      </div>
     </div>


    
    </div>
  );
}

export default Tasks;
