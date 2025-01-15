import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom";


const UserLayout = ()=>{
      const [isOpen, setIsOpen] = useState(window.innerWidth>768);

      const handleSetIsOpen = (val)=>{
        setIsOpen(val);
      }
    
      useEffect(()=>{
 
      },[])
    return(
        <>
            <div className="sidebar-upper">

                <Sidebar isOpen={isOpen} setIsOpen={isOpen} handleSetIsOpen={handleSetIsOpen}/>

                {/* <div className=""></div> */}

                <div className="right-container" style={{}}>          
               <Outlet/>
                </div>
              
            </div>

        </>
    )
}

export default UserLayout;