
import { useEffect, useState } from "react";



export const TasksPart=(props)=>{
    const [displayTasks,SetDisplayTasks]=useState([]);
    useEffect(() => {
        let visibleTasks=props.tasks;

        if(props.filters[1]){
           visibleTasks=visibleTasks.filter(t=>{
             let targetDate=new Date(t.createdAt);
             const today=new Date();
            return(today.getFullYear()==targetDate.getFullYear() &&
                   today.getMonth()==targetDate.getMonth()&&
                   today.getDate()==targetDate.getDate()
                );

           });
          //  visibleTasks=visibleTasks.filter(t=>{console.log(new Date(t.createdAt))});
        }
        if(props.filters[2]){
            visibleTasks=visibleTasks.filter(t=>t.status===true);
        }  
        if(props.filters[3]){
            visibleTasks=visibleTasks.filter(t=>t.status!==true);
        }                      
                                
        SetDisplayTasks(visibleTasks);
    
    }, [props.tasks,props.filters]) 

    return(
        <>
        
            <table className="tasksTable">
                <thead className="tasksTableHead">
                    <tr>
                    <th>Date</th>
                    <th>task</th>
                    <th>status</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        displayTasks?.map((task,index)=>(
                           <tr key={task._id}>
                        <td>{task.createdAt?new Date(task.createdAt).toLocaleString():"..."}</td>
                        <td>{task.task?task.task:"No task found"}</td>
                        <td 
                           onClick={()=>props.upDateStatus(task._id)
                        }>{task.status?"done":"pending"}</td>
                        <td>
                            
                                <button onClick={()=>props.upDateOrderId((task.orderId),"up")}
                                
                                >🔼</button>
                                <button onClick={()=>props.upDateOrderId((task.orderId),"down")}
                                
                                >🔽</button>
                                <button onClick={()=>props.deletePost(task._id)}>❌</button>
                        </td>
                    </tr>  
                        ))
                    }
                   
                </tbody>

            </table>
        
        
        </>
    );
    
}