

export const DisplayOptions=({filtersCtrl,filters})=>{


    return(
        <>
         <div className="optionsWraper">
            <button onClick={()=>filtersCtrl(0)}
                    className={filters[0]?"active":"normal"}>all</button>
            <button onClick={()=>filtersCtrl(1)}
                    className={filters[1]?"active":"normal"}>todays</button>
            <button onClick={()=>filtersCtrl(2)}
                    className={filters[2]?"active":"normal"}>complete</button>
            <button onClick={()=>filtersCtrl(3)}
                    className={filters[3]?"active":"normal"}>incomplete</button>
            <button onClick={()=>filtersCtrl(4)}
                    className={filters[4]?"active":"normal"}>special</button>
        
         </div>
          
        </>
    );
}