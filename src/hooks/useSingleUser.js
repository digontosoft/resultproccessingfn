import { useEffect, useState } from "react"
import useAuth from "./useAuth";
import axios from "axios";

const useSingleUser = () => {
  const [loading,setLoading] = useState(false)
  const [getUser,setGetUser] = useState({})
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const { auth } = useAuth();
  useEffect(()=>{
    const singleUser = async () =>{
        setLoading(true)
        //console.log(auth._id);
        
        try {
            const res = await axios.get(`${baseUrl}/user/${auth._id}`)
            //console.log("i am single",res);
            
            // const data = await res.json()
            // if(data.error) {
            //  throw new Error(data.error)
            // }
            setGetUser(res.data)
         } catch (error) {
             toast.error(error.message)
         } finally{
             setLoading(false)
         }
    }
    singleUser()
  },[])
  return {getUser,loading}
}

export default useSingleUser