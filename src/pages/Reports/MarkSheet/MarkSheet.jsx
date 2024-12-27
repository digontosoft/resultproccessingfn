import { useState } from "react";
import axios from "axios";
import useUserProtectFilter from "../../../hooks/useUserProtectFilter";
import { groupData, termsData } from "../../../data/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MarkSheet = () => {
  // const {
  //   Data: { studentInfo, TotalResult, summary },
  // } = JSON.parse(localStorage.getItem("result"));
  const markSheet = JSON.parse(localStorage.getItem("mergeResult"));
  console.log("marksheet", markSheet);

  // const url = import.meta.env.VITE_SERVER_BASE_URL;
  // const [formData, setFormData] = useState({
  //   session: "2024",
  //   term: "",
  //   className: "",
  //   section: "",
  //   shift: "",
  //   group: "",
  //   is_merged: false,
  //   start_roll: "",
  //   end_roll: "",
  // });
  // const { filterClass, filterSection, filterShift, sessions } =
  //   useUserProtectFilter();
  // const navigate = useNavigate();

  // const handleInputChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(`${url}/result/marksheet`, formData);
  //     if (response.status === 200) {
  //       toast.success("Form submitted successfully!");
  //       localStorage.setItem("mergeResult", JSON.stringify(response.data));
  //       navigate("/get-result/transcript");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     toast.error("Failed to fetch marksheet");
  //   }
  //   console.log("merge-result:", formData);
  // };

  return <div className="container mx-auto px-4 py-6"></div>;
};

export default MarkSheet;
