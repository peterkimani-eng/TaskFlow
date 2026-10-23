import { useEffect, useState} from "react";
import { LocallStorageGetId } from "../apis";
import { LocallStorageSetId } from "../apis";

import { MasterWrapper } from "../tskFlow/master";
import { LoginMainPage } from "../loginpage/authonticatication"; 


 export const Middleware =()=>{
    const[id,setId]=useState(()=>localStorage.getItem("id"));

  useEffect(() => {
    const handleUpdate = () => {
      setId(localStorage.getItem("id")); // Triggers re-render
    };

    window.addEventListener('updatedLocalstorage', handleUpdate);
    return () => window.removeEventListener('updatedLocalstorage', handleUpdate);
  }, []);
  
    return(
        <div>
            {
         id===null?<LoginMainPage></LoginMainPage>:<MasterWrapper></MasterWrapper>
        }
    
        </div>
             
       
    );
    
 }