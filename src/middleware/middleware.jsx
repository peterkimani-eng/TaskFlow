import { useEffect, useState } from "react";
import { LocallStorageGetId } from "../apis";
import { LocallStorageSetId } from "../apis";

import { MasterWrapper } from "../tskFlow/master";
import { LoginMainPage } from "../loginpage/authonticatication"; 
import { div } from "three/tsl";

 export const Middleware =()=>{
    const[id,setId]=useState("");

    useEffect(() => {
    setId(LocallStorageGetId());
    console.log(LocallStorageGetId());
    }, [LocallStorageSetId])


    return(
        <div>
            {
         id===null?<LoginMainPage></LoginMainPage>:<MasterWrapper></MasterWrapper>
        }
    
        </div>
             
       
    );
    
 }