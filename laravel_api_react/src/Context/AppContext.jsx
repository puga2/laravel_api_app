import { createContext, useEffect, useState } from "react";


const AppContext = createContext();

export default function AppProvider({children}){
    const [token,setToken] = useState(localStorage.getItem('token'));
    const [ user,setUser] = useState({});

    async function getUser(){
        const res = await fetch('/api/user',{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        const data = await res.json();
        console.log(data);
        setUser(data);
    }
    useEffect(()=>{
        console.log("Effect ran!");
        if(token){
            getUser();
        }

    },[token]);//onnce it change token it will run again 


    return (
        <AppContext.Provider value={{token,setToken,user}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext };    


// import { createContext } from "react";


// const AppContext = createContext();

// export default function AppProvider({children}){
//     return (
//         <AppContext.Provider value={{name:"john"}}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export { AppContext };