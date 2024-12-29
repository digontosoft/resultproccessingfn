// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { groupData, termsData } from "../../../data/data";
// import axios from "axios";
// import { toast } from "react-toastify";

// const FilterFailList = () => {
//   const navigate = useNavigate();
//   const url = import.meta.env.VITE_SERVER_BASE_URL;
//   const [selectedClass, setSelectedClass] = useState("");
//   const [formData, setFormData] = useState({
//     className: "",
//     group: "",
//     section: "",
//     shift: "",
//     session: "",
//     term: "",
//     is_merged: false,
//   });

//   const currentYear = new Date().getFullYear();
//   const shifts = ["Morning", "Day"];
//   const sessions = [currentYear, currentYear - 1, currentYear - 2];
//   const classes = ["4", "5", "6", "7", "8", "9", "10"];

//   // const handleInputChange = (e) => {
//   //   const { name, value, type, checked } = e.target;
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [name]: type === "checkbox" ? checked : value,
//   //   }));

//   //   if (name === "className") {
//   //     setSelectedClass(value);
//   //     // Reset group when class changes
//   //     if (!["9", "10"].includes(value)) {
//   //       setFormData((prev) => ({ ...prev, group: "" }));
//   //     }
//   //   }
//   // };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : name === "is_merged"
//           ? value === "true"
//           : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     const response = await axios.post(`${url}/result/fail-list`, formData);
//     if (response.status === 200) {
//       toast.success("Merit list generated successfully!");
//       localStorage.setItem("meritList", JSON.stringify(response.data));
//       navigate("/fail-list");
//     }
//     console.log("individual-result:", response.data);
//   };

//   const FormSelect = ({ label, name, options, required = true }) => (
//     <div className="mb-4.5">
//       <label className="mb-3 block text-black dark:text-white">{label}</label>
//       <select
//         name={name}
//         value={formData[name]}
//         onChange={handleInputChange}
//         required={required}
//         className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//       >
//         <option value="">Select {label}</option>
//         {Array.isArray(options)
//           ? options.map((option) => (
//               <option
//                 key={typeof option === "object" ? option.value : option}
//                 value={typeof option === "object" ? option.value : option}
//               >
//                 {typeof option === "object" ? option.label : option}
//               </option>
//             ))
//           : null}
//       </select>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4">
//       <div className="mt-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//           <h3 className="font-medium text-black dark:text-white">
//             Get Student Result
//           </h3>
//         </div>

//         <div className="p-6.5">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormSelect
//                 label="Select Class"
//                 name="className"
//                 options={classes}
//               />

//               <FormSelect
//                 label="Select Group"
//                 name="group"
//                 options={groupData}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <FormSelect label="Section" name="section" options={["A", "B"]} />
//               <FormSelect label="Shift" name="shift" options={shifts} />
//               <FormSelect label="Session" name="session" options={sessions} />
//               <FormSelect label="Term" name="term" options={termsData} />
//               <div className="flex flex-col space-y-2">
//                 <label className="text-lg font-semibold">Merge Result?</label>
//                 <div className="flex items-center space-x-4">
//                   {/* <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="is_merged"
//                       value={true}
//                       checked={formData.is_merged === true}
//                       onChange={handleInputChange}
//                       className="form-radio text-blue-600"
//                     />
//                     <span>Yes</span>
//                   </label>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="is_merged"
//                       value={false}
//                       checked={formData.is_merged === false}
//                       onChange={handleInputChange}
//                       className="form-radio text-blue-600"
//                     />
//                     <span>No</span>
//                   </label> */}
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="is_merged"
//                       value="true"
//                       checked={formData.is_merged === true}
//                       onChange={handleInputChange}
//                       className="form-radio text-blue-600"
//                     />
//                     <span>Yes</span>
//                   </label>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="is_merged"
//                       value="false"
//                       checked={formData.is_merged === false}
//                       onChange={handleInputChange}
//                       className="form-radio text-blue-600"
//                     />
//                     <span>No</span>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
//             >
//               Search
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterFailList;

import { useState } from "react";
import axios from "axios";
import useUserProtectFilter from "../../../hooks/useUserProtectFilter";
import { groupData, termsData } from "../../../data/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GlobalLoadingState from "../../../components/GlobalLoadingState/GlobalLoadingState";

const FilterFailList = () => {
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    session: "",
    term: "",
    className: "",
    section: "",
    shift: "",
    group: "",
    is_merged: false,
    start_roll: "",
    end_roll: "",
  });
  const { filterClass, filterSection, filterShift, sessions } =
    useUserProtectFilter();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const schoolInfo = {
    session: formData.session,
    term: formData.term,
    shift: formData.shift,
    section: formData.section,
    group: formData.group,
    className: formData.className,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/result/fail-list`, formData);
      if (response.status === 200) {
        // formData.is_merged
        //   ? localStorage.setItem("mergeResult", JSON.stringify(response.data))
        //   : localStorage.setItem("withoutMerge", JSON.stringify(response.data));

        // navigate(
        //   formData.is_merged ? "/get-merge-marksheet" : "/get-marksheet"
        // );
        // localStorage.setItem("schoolInfo", JSON.stringify(schoolInfo));
        localStorage.setItem("failList", JSON.stringify(response.data));
        navigate("/fail-list");
        toast.success("Marksheet Generated Successfully");
        console.log("marksheet:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Please Enter Valid Details");
    } finally {
      setIsLoading(false);
    }
    console.log("merge-result:", formData);
  };

  if (isLoading) {
    return <GlobalLoadingState />;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Fail List</h3>
      </div>
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Session
            </label>
            <select
              name="session"
              value={formData.session}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Session</option>
              {sessions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Term</label>
            <select
              name="term"
              value={formData.term}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Term</option>
              {termsData.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Class Name
            </label>
            <select
              name="className"
              value={formData.className}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Class</option>
              {filterClass.map((className) => (
                <option key={className} value={className?.value}>
                  {className?.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Section
            </label>
            <select
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Section</option>
              {filterSection.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Shift
            </label>
            <select
              name="shift"
              value={formData.shift}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Shift</option>
              {filterShift.map((shift) => (
                <option key={shift} value={shift}>
                  {shift}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Group
            </label>
            <select
              name="group"
              value={formData.group}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Group</option>
              {groupData.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Merge Result?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_merged"
                  checked={formData.is_merged}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <span>Yes</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Roll From
            </label>
            <input
              type="number"
              name="start_roll"
              value={formData.start_roll}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Roll To
            </label>
            <input
              type="number"
              name="end_roll"
              value={formData.end_roll}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full border rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterFailList;
