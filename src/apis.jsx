
import { Middleware } from "./middleware/middleware";

let userid= localStorage.getItem("id");
const API=import.meta.env.VITE_API_URL;
const STATUS=import.meta.env.VITE_STATUS_URL;
const ORDER=import.meta.env.VITE_ORDER_URL;
const api=API;
const apii=`${API}/:${userid}`;
const statusAPI=`${STATUS}/:${userid}`;
const orderIdAPI=`${ORDER}/:${userid}`;

const authAPI1=import.meta.env.VITE_SIGNIN_URL;
const authAPI2=import.meta.env.VITE_LOGIN_URL;

 




export const GetPost = async () => {
    try {
        const res = await fetch(apii);
        
        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }
        
        return await res.json();
    } catch (err) {
        console.error("Failed to get post:", err);
        return null; 
    }
};




export const AddPost=async(task)=>{
        await fetch(apii,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(task)
        });

        
   
}

export const UpDate=async(_id,task)=>{
    await fetch(apii,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({task:task})
    });
}

export const UpDateStatus=async(id)=>{
    await fetch(`${statusAPI}/${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify()
    })
}

export const UpDateOrderId=async(ids)=>{ // ids= id1:taskmoving up,id2:task moving down
    await fetch(orderIdAPI,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ids:ids})
    })
}

export const DeletePost=async(id)=>{
    await fetch(`${apii}/${id}`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'}
    });
}

//CONTROLS MAIN PAGE DISPLAY TYPE GRID|TABLE
export const LocallStorageSetValue=(value)=>{

    value==="true"?(localStorage.setItem("displayytype","true")):(localStorage.setItem("displayytype","false"));
    
}

export const LocallStorageGetValue=()=>{
   let value= localStorage.getItem("displayytype");
   return(value);
}

//STORES THE USERID
export const LocallStorageSetId=(id)=>{
    localStorage.setItem("id",`${id}`);
}

export const LocallStorageGetId=()=>{
   let value= localStorage.getItem("id");
    return(value);
}
//let userId=LocallStorageGetId();

//auth api`s

export const AuthSignIn=async(form)=>{
    const res= 
      await fetch(`${authAPI1}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({form:form})
      })

      if (!res.ok){
        console.log('error')
      }else{
        const userId=await res.json();
        LocallStorageSetId(userId);
        window.dispatchEvent(new Event("updatedLocalstorage"));
      }
}

export const AuthLogIn=async(form)=>{
   
    const res=
      await fetch(`${authAPI2}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      })

      if (!res.ok){
        console.log('error')
      }else{
        const userId=await res.json();
        LocallStorageSetId(userId);
        window.dispatchEvent(new Event("updatedLocalstorage"));
      }
}
