import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUserRole } from "../utility/role";


const user = getUserRole();

const tabs = user && user?.role!=="HR" ? ["Tasks" ,  "To Do" , "Logs"] : ["Tasks" , "Logs"];


const Sidebar = ({isOpen , setIsOpen , handleSetIsOpen}) => {


  const [activeTab , setActiveTab] = useState("");

  const toggleSidebar = () => {
    handleSetIsOpen(!isOpen);
  };



  useEffect(()=>{
    const url = window.location.href.split("user/");
    setActiveTab(url[1]?.toLocaleLowerCase().replaceAll(" " , ""));
  },[]);
  return (
    <div
    className="sidebar-wrapper"
    style={{ width: isOpen ? "250px" : "0px",height:"100vh" }}
  >
    
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? "⨉" : "☰"}
      </button>

 
      <div className={`sidebar ${isOpen ? "show" : "hide"}`}>
     
        <div className="user-section">
          <div className="user-icon">{user.role==="HR" ? "HR" : "U"}</div>
          <div className="user-info">

            <p className="user-email">user@example.com</p>
          </div>
        </div>

       
        <ul className="menu">
        {
          tabs?.map((elm,id)=>{
            return(
              <>
             <NavLink to={`/user/${tabs[id]?.toLocaleLowerCase().replaceAll(" " , "")}`}   key={elm+id} className={`menu-item ${activeTab === elm.toLocaleLowerCase().replace(" " , "") ? 'active' : ''}`} 
                 onClick={(e)=>{ setActiveTab(tabs[id]?.toLocaleLowerCase().replaceAll(" ",""))}}
              > {elm}
              </NavLink>

              </>
            )
          })
        }
          
     
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
