
import { useState} from "react";
import { AuthInput } from "./input";
import styles from './authentication.module.css'
import { AuthSignIn } from "../apis";
import { AuthLogIn } from "../apis";


export const LoginMainPage=()=>{
    const[form,setForm]=useState({fullName:"",userName:"",password:""});
    const[isLogin,setIsLogin]=useState(true);
    const[error,setError]=useState("")


    const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    
 }

    const handleSubmit=()=>{
        if(!isLogin){
            if(form.fullName.trim()===""||form.password.trim===""||form.userName.trim===""){
                setError("All fileds must be filled to proceed");
            }else{
                AuthSignIn(form);
            }
         }else{if(form.password.trim()===""||form.userName.trim===""){
            setError("All fields must be filled to proceed");
         }else{
            AuthLogIn(form);
         }
    } 
    }


    return(
        <>
         <div className={styles.authMainDiv}> 
           <div className={styles.authMainDiv1}>task flow</div>
           <div className={styles.authMainDiv2}>
             <h1>Welcome!</h1>
             <p>{isLogin?"logIn":"signUp"}</p>
             {!isLogin&&<AuthInput name={"fullName"}
                                   type={"text"}
                                  placeholder={"Full Name"}
                                  handleChange={handleChange}
                        ></AuthInput>}
                   
                        <AuthInput name={"userName"}
                                   type={"text"}
                                  placeholder={"User name"}
                                  handleChange={handleChange}
                        ></AuthInput> 
            
                        <AuthInput name={"password"}
                                   type={"password"}
                                  placeholder={"password As1#"}
                                  handleChange={handleChange}
                        ></AuthInput>
               
              <button onClick={()=>handleSubmit()}>{isLogin?"Enter":"submmit"}</button>
             {isLogin&&<p>Don`t have an account?<span onClick={()=>setIsLogin(false)}>sign up</span></p>} 
          </div>
         </div> 
        </>
    );
}