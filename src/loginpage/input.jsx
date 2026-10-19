import styles from './input.module.css'


export const AuthInput=(props)=>{



    return(
        <>
          <div className={styles.inputmainDiv}>
            <input type={props.type}
                   name={props.name}
                   placeholder={props.placeholder}
                   onChange={props.handleChange}
                    />
          </div>
        </>
    );
}