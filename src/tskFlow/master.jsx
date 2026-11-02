import { useState,useEffect } from "react";

import { Inputbar } from "./todoInputBar";
import { DisplayOptions } from "./tasksFilters";
import { TasksPart } from "./tasks";
import { GrindStyle } from "../alternativeComponents/Grinddisp";
import { DispCtrlBtn } from "./dispStyleCtrl";
import {GetPost, AddPost, DeletePost, UpDate,UpDateStatus,UpDateOrderId,LocallStorageGetValue,LocallStorageSetValue } from "../apis";


export const MasterWrapper=()=>{
    const[tasks,SetTasks]=useState([]);
    const[newTask,SetNewTask]=useState("");
    
    const [filters,SetFilters]=useState([false,false,false,false,false]);
    const[displaytype,SetDisplaytype]=useState(true);
    const[error,setError]=useState(false);
    const[errorr,setErrorr]=useState([{
                createdAt:new Date(),
                task:"error has occured",
                status:false,
                orderId:1
              }]) //in case of an error 
     
    function filtersCtrl(index){
        SetFilters(prev=>prev.map((value,i)=>i===index?!value:value));
        
    }

    function displaytypeCtrl() {
     
    
    if  (displaytype === false) {
         SetDisplaytype(true);
        LocallStorageSetValue("true"); 
           } else {
        SetDisplaytype(false);
        LocallStorageSetValue("false");
    }
}
    
    function handleChange(e){
        SetNewTask(e.target.value);
         
    }
    useEffect(()=>{
    let value=LocallStorageGetValue();
    
     value==="true"?SetDisplaytype(true):SetDisplaytype(false);
     
    },[])
    useEffect(() => {
      GetPost().then(data=>{
        data===null?setError(true): SetTasks(data);
      })
    },[])
    

    async function addNewTask(){
      if(newTask!==""){ 
        let orderId= await (tasks[(tasks.length-1)])?tasks[0].orderId:0;
       
        const tempTask={
                       createdAt:new Date(),
                       task:newTask,
                       status:false,
                       orderId:`${orderId+1}`
      }
      SetTasks(prev=>[tempTask,...prev]);

      try{
        await AddPost(tempTask)// fetch updated data
        .then(()=>GetPost().then(data=>{ data===null?setError(true): SetTasks(data)}));
      }catch(err){
        SetTasks(prev=>prev.filter(t=>t.id !==tempTask._id))
      }
      SetNewTask("")
      }
      
    }

   async function upDateStatus(_id){
       SetTasks(prev=>prev.map(t=>t._id===_id?{...t,status: !t.status}:t));
       try{
        await UpDateStatus(_id);
       }catch(err){
        SetTasks(prev=>prev.map(t=>t._id!==_id?{...t,status: !t.status}:t));
        alert("changing status failed try again")
       }
    }

  function upDateOrderId(id,direction) { 
     let iD=Number(id);  //convert id which is a string to a number
  
    
     const tskIndex=tasks.findIndex(t=>t.orderId===iD);
     const targetindex=direction==="up"?tskIndex-1:tskIndex+1;
    
  
     if(targetindex>=0&&targetindex<(tasks.length)){

        const currentTask=tasks.find(t=>t.orderId===iD);
        const targetOrderId=tasks[targetindex].orderId;
        const targetTask=tasks.find(t=>t.orderId===targetOrderId);

     let tempTask=[...tasks];        

          [tempTask[tskIndex],tempTask[targetindex]]=[tempTask[targetindex],tempTask[tskIndex]] //swaps order of array
           SetTasks(tempTask);    


     let ids={
      id1:currentTask._id,
      id2:targetTask._id
    }
     try {
       UpDateOrderId(ids);
       GetPost().then(data=>{
         data===null?setError(true): SetTasks(data);
      });
     } catch (error) {
       GetPost().then(data=>{
         data===null?setError(true): SetTasks(data);
      });
    window.alert("Failed to swap tasks try again!");
      
     }
     GetPost().then(data=>{
         data===null?setError(true): SetTasks(data);
      });
  }else{
    window.alert("you cant swap the first/last task");
  }

}

     async function deletePost (_id){
        const backup=tasks;

        SetTasks(prev=>prev.filter(t=>t._id !==_id));
        try{
          await DeletePost(_id);
        }catch(err){
            SetTasks(backup);
            alert("Failed to delete try again")
        }
      }


useEffect(()=>{
          if(error){
          SetTasks(errorr);


  }
  //console.log("did run")
},[error])
    
   
   
  
  return(
    <>
     <div className="mainDiv">
        <div className="headerDiv">
           <DispCtrlBtn displaytype={displaytype}
                        displaytypeCtrl={displaytypeCtrl}
           ></DispCtrlBtn>
           <h1>Task Flow</h1>
        </div>
        
        <Inputbar 
               addNewTask={addNewTask}
               newTask={newTask}
               handleChange={handleChange}>

        </Inputbar>
        

        < DisplayOptions
               filtersCtrl={filtersCtrl}
               filters={filters} >

        </DisplayOptions>
        
       {!displaytype?<TasksPart 
                      tasks={tasks}
                      filters={filters}
                      upDateStatus={upDateStatus}
                      upDateOrderId={upDateOrderId}
                      deletePost={deletePost}>

                      </TasksPart>: <GrindStyle tasks={tasks}
                      filters={filters}
                      upDateStatus={upDateStatus}
                      upDateOrderId={upDateOrderId}
                      deletePost={deletePost} >

        </GrindStyle>}
        
       
        
        
     </div>
        
    </>
    
  );
}