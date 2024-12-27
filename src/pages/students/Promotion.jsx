// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../../api";
// import { groupData, termsData } from "../../data/data";
// import PromotionTo from "./PromotionTo";

// const Promotion = () => {
//   const navigate = useNavigate();
//   const [selectedClass, setSelectedClass] = useState("");
//   const [formData, setFormData] = useState({
//     className: "",
//     group: "",
//     section: "",
//     shift: "",
//     session: "",
//     term: "",
//     roll: "",
//     studentId: "",
//   });

//   const currentYear = new Date().getFullYear();
//   const shifts = ["Morning", "Day"];
//   const sessions = [currentYear, currentYear - 1, currentYear - 2];
//   const terms = ["Annual", "Half Yearly", "Pretest", "Test", "Model Test"];
//   const classes = ["4", "5", "6", "7", "8", "9", "10"];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (name === "className") {
//       setSelectedClass(value);
//       // Reset group when class changes
//       if (!["9", "10"].includes(value)) {
//         setFormData((prev) => ({ ...prev, group: "" }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     try {
//       const response = await api.post("/result/individual", formData);
//       console.log("individual-result:", response.data);

//       if (response.status === 200) {
//         localStorage.setItem("result", JSON.stringify(response.data));
//         navigate("/get-result/transcript");
//       }
//     } catch (error) {
//       console.log(error);
//     }
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

//               {["9", "10"].includes(selectedClass) && (
//                 <FormSelect
//                   label="Select Group"
//                   name="group"
//                   options={groupData}
//                 />
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <FormSelect label="Section" name="section" options={["A", "B"]} />
//               <FormSelect label="Shift" name="shift" options={shifts} />
//               <FormSelect label="Session" name="session" options={sessions} />
//               <div className="">
//                 <label className="mb-3 block text-black dark:text-white">
//                   Roll From
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>
//               <div className="">
//                 <label className="mb-3 block text-black dark:text-white">
//                   Roll To
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
//             >
//               Get Result
//             </button>
//           </form>
//         </div>
//         <PromotionTo />
//       </div>
//     </div>
//   );
// };

// export default Promotion;

import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import useSingleUser from "../../hooks/useSingleUser";
import useUserProtectFilter from "../../hooks/useUserProtectFilter";
import { groupData, termsData } from "../../data/data";
import MarksInput from "../results/MarksInput";
import PromotionTo from "./PromotionTo";

const Promotion = () => {
  const { gurdedApi } = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [classData, setClassData] = useState("");
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [rollRangeStudent, setRollRangeStudent] = useState([]);
  const [rollRangeStudentData, setRollRangeStudentData] = useState({});
  const { getUser } = useSingleUser();
  const [filterGroup, setFilterGroup] = useState([]);
  const { filterClass, filterSection, filterShift, sessions } =
    useUserProtectFilter();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handelClass = (value) => {
    //console.log("i am value",value);
    const data = filterClass.filter(
      (item) => item._id === value && item.value == 10
    );
    //console.log(data);

    if (data.length > 0) {
      setFilterGroup(groupData.slice(1, 4));
    } else {
      setFilterGroup(groupData.slice(0, 1));
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${url}/subjects`);
        setSubjects(response.data.subjects);
      } catch (error) {
        toast.error("Failed to fetch subjects");
      }
    };

    fetchSubjects();
  }, [url]);

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = filterClass.find(
      (option) => option._id === selectedValue
    );
    const filtered = subjects.filter(
      (subject) => subject.class._id === selectedOption._id
    );

    setFilteredSubjects(filtered);
    setClassData(selectedOption.value);
  };

  const onSubmit = async (data) => {
    console.log(data);

    const payload = {
      ...data,
      class: classData,
    };
    console.log("Form Data:", payload);
    setRollRangeStudentData(payload);
    setIsLoading(true);

    try {
      const reseponse = await gurdedApi.post(
        `/get-student-by-roll-range`,
        payload
      );
      setRollRangeStudent(reseponse.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch student data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const FormSelect = ({ label, name, options, onChange }) => (
    <div className="mb-4.5">
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <select
            {...field}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) onChange(e.target.value);
            }}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select {label}</option>
            {Array.isArray(options)
              ? options.map((option) => (
                  <option
                    key={typeof option === "object" ? option.value : option}
                    value={typeof option === "object" ? option.value : option}
                  >
                    {typeof option === "object" ? option.label : option}
                  </option>
                ))
              : null}
          </select>
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Student Promotion
          </h3>
        </div>

        <div className="p-6.5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormSelect label="Year" name="session" options={sessions} />
              {/* <FormSelect label="Exam" name="term" options={termsData} /> */}
              <FormSelect label="Shift" name="shift" options={filterShift} />
              <div className="mb-4.5">
                <label className="mb-3 block text-black dark:text-white">
                  Select Class
                </label>
                <select
                  {...register("classId", {
                    required: "Please select a class",
                  })}
                  onChange={(e) => {
                    handleFilterChange(e);
                    handelClass(e.target.value);
                  }}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="" hidden>
                    Select Class
                  </option>
                  {filterClass.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                {errors.classId && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.classId.message}
                  </span>
                )}
              </div>
              <FormSelect
                label="Section"
                name="section"
                options={filterSection}
              />
              <FormSelect
                label="Select Group"
                name="group"
                options={filterGroup}
              />

              {/* <div className="mb-4.5">
                <label className="mb-3 block text-black dark:text-white">
                  Select Subject
                </label>
                <select
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select Subject</option>
                  {filteredSubjects.map((subject) => (
                    <option key={subject._id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div> */}
              <div className="">
                <label className="mb-3 block text-black dark:text-white">
                  Roll From
                </label>
                <input
                  type="number"
                  min="0"
                  {...register("startRoll", {
                    required: "Roll number is required",
                  })}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.startRoll && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.startRoll.message}
                  </span>
                )}
              </div>
              <div className="">
                <label className="mb-3 block text-black dark:text-white">
                  Roll To
                </label>
                <input
                  type="number"
                  min="0"
                  {...register("endRoll", {
                    required: "Roll number is required",
                  })}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.endRoll && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.endRoll.message}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </div>
      <div>
        {rollRangeStudent.length > 0 && (
          <PromotionTo
            rollRangeStudentData={rollRangeStudentData}
            rollRangeStudent={rollRangeStudent}
          />
        )}
      </div>
    </div>
  );
};

export default Promotion;
