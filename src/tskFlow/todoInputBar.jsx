

export  const Inputbar=(props)=>{

    return(
        <>
            <div className='inputWraper'>
                <input className="inputBar"
                       type="text"
                       placeholder="New task..."
                       value={props.newTask} 
                       onChange={props.handleChange}/>
                <button onClick={props.addNewTask}
                        className="addNewTaskBtn"
                >
                        
                    Add+
                </button>  
            </div>      
        </>
    );
}