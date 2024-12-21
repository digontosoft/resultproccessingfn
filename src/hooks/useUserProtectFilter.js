import { useEffect, useState } from "react";
import useSingleUser from "./useSingleUser";
import { toast } from "react-toastify";
import axios from "axios";

const shifts = ["Morning", "Day"];
const section = ["A", "B"];

const useUserProtectFilter = () => {
    const currentYear = new Date().getFullYear();
    const sessions = [currentYear, currentYear - 1, currentYear - 2];
  const [filterClass, setFilterClass] = useState([]);
  const [classes, setClasses] = useState([]);
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const { getUser } = useSingleUser();
  const [filterSection, setFilterSection] = useState([]);
  const [filterShift, setFilterShift] = useState([]);
  const [isSuperAdmin,setIsSuperAdmin] = useState(false)
  

  useEffect(()=>{
    const fetchClasses = async () =>{
        try {
            const response = await axios.get(`${url}/class`);
            const classNames = response.data.classes;

            const sortData = classNames.sort((a, b) => Number(a.value) - Number(b.value));

        setClasses(sortData);
            
        } catch (error) {
            toast.error("Failed to fetch classes");
            
        }
    }
    fetchClasses()
  },[url])

  useEffect(() => {
    if (getUser.userType === "teacher"||getUser.userType === "operator") {
      const data = classes.filter(
        (item) => item.name === getUser.class_id.name
      );
      const sectionData = section.filter((item) => item === getUser.section);
      const shiftData = shifts.filter((item) => item === getUser.shift);
      setFilterClass(data);
      setFilterSection(sectionData);
      setFilterShift(shiftData);
    } else {
      setFilterClass(classes);
      setFilterSection(section);
      setFilterShift(shifts);
    }
  }, [getUser]);

  useEffect(()=>{
    if(getUser.userType==='superadmin'){
      setIsSuperAdmin(true)
    } 
    else {
      setIsSuperAdmin(false)
    }
  },[getUser])

 

  return {filterClass,filterSection,filterShift,sessions,isSuperAdmin}
};

export default useUserProtectFilter;
