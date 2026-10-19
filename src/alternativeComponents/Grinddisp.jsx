import { useState, useEffect } from "react";
import styles from './Grind.module.css'

export const GrindStyle =(props)=>{
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
        {
           
               <div className={styles.gdMainDiv1}>
                    {
                        displayTasks.map((task,index)=>(
                           <div key={task._id}
                                className={styles.gdMainDiv2}>
                            <div className={styles.dateDiv}>
                                 <p>{task.createdAt?new Date(task.createdAt).toLocaleString():"..."}</p>
                                 <button onClick={()=>props.deletePost(task._id)}>❌</button>
                            </div>
                            <div className={styles.statusDiv}>
                                 <p className={task.status?styles.done:styles.pending}
                                 onClick={()=>props.upDateStatus(task._id)
                                 }>{task.status?"done":"pending"}</p>
                            </div>
                       
                        <p className={styles.taskDiv}>{task.task?task.task:"No task found"}</p>
                        
                      
                    </div>  
                        ))
                    }
                   
                </div>

        }
                

        
        
        
        </>
    );
}