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

  useEffect(()=>{
    const fetchClasses = async () =>{
        try {
            const response = await axios.get(`${url}/class`);
            const classNames = response.data.classes;

        setClasses(classNames);
            
        } catch (error) {
            toast.error("Failed to fetch classes");
            
        }
    }
    fetchClasses()
  },[url])

  useEffect(() => {
    if (getUser.userType === "teacher") {
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

 

  return {filterClass,filterSection,filterShift,sessions}
};

export default useUserProtectFilter;
