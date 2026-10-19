import styles from './dispStylectrl.module.css'

export const DispCtrlBtn=(props)=>{

  let present;
  let other;
  if(props.displaytype){
    present="table";
    other='grind';
  }else{
    present="grind";
    other="table";
  }

    return(
        <>
          <button className={styles.mainBtn}
                  onClick={()=>props.displaytypeCtrl()}>
            <div></div>
            <p>{`${present}`}</p>
          </button>
          <p className={styles.hoverInfo}>switch from {`${present} display`} to {`${other} display`}</p>
        </>
    )
}