// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "react-toastify";

// const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];
// const groups = ["General", "Science", "Commerce", "Arts"]; // Added group options
// const years = ["2023", "2024", "2025", "2026"]; // Added year options

// const SubjectEntry = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [classes, setClasses] = useState([]);
//   const url = import.meta.env.VITE_SERVER_BASE_URL;

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       className: "",
//       subjectName: "",
//       group: "",
//       year: "",
//     },
//   });

//   useEffect(() => {
//     axios.get(`${url}/class`).then((response) => {
//       setClasses(response.data.classes);
//       //   console.log("classes:", response.data.classes);
//     });
//   }, [url]);

//   const onSubmit = async (data) => {
//     console.log("Form submitted:", data);
//     setIsLoading(true);
//     try {
//       // Simulate API call
//       //   await api.post("/add-subject", data);
//       toast.success("Subject added successfully");
//       reset();
//     } catch (error) {
//       toast.error("Failed to add subject");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const FormSelect = ({ label, name, options }) => (
//     <div className="mb-4.5">
//       <label className="mb-3 block text-black dark:text-white">{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         rules={{ required: `${label} is required` }}
//         render={({ field }) => (
//           <select
//             {...field}
//             className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//           >
//             <option value="" disabled defaultChecked>
//               Select {label}
//             </option>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         )}
//       />
//       {errors[name] && (
//         <span className="text-red-500 text-sm mt-1">
//           {errors[name].message}
//         </span>
//       )}
//     </div>
//   );

//   const FormInput = ({ label, name, placeholder }) => (
//     <div className="mb-4.5">
//       <label className="mb-3 block text-black dark:text-white">{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         rules={{ required: `${label} is required` }}
//         render={({ field }) => (
//           <input
//             {...field}
//             type="text"
//             placeholder={placeholder}
//             className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//           />
//         )}
//       />
//       {errors[name] && (
//         <span className="text-red-500 text-sm mt-1">
//           {errors[name].message}
//         </span>
//       )}
//     </div>
//   );

//   return (
//     <div>
//       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//           <h3 className="font-medium text-black dark:text-white">
//             Subject Entry
//           </h3>
//         </div>
//         <div className="p-6.5">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormSelect label="Year" name="year" options={years} />
//               <FormSelect label="Group" name="group" options={groups} />
//               <FormSelect label="Class" name="className" options={classes} />
//               <FormInput
//                 label="Subject Name"
//                 name="subjectName"
//                 placeholder="Enter Subject"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${
//                 isLoading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {isLoading ? "Loading..." : "Submit Subject"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubjectEntry;

import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const groups = ["General", "Science", "Commerce", "Arts"];
const years = ["2023", "2024", "2025", "2026"];

const SubjectEntry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const url = import.meta.env.VITE_SERVER_BASE_URL;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      className: "",
      subjectName: "",
      group: "",
      year: "",
    },
  });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${url}/class`);
        const classNames = response.data.classes.map(
          (item) => (typeof item === "string" ? item : item.name) // Adjust as per API data structure
        );
        setClasses(classNames);
      } catch (error) {
        toast.error("Failed to fetch classes");
      }
    };

    fetchClasses();
  }, [url]);

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    setIsLoading(true);
    try {
      toast.success("Subject added successfully");
      reset();
    } catch (error) {
      toast.error("Failed to add subject");
    } finally {
      setIsLoading(false);
    }
  };

  const FormSelect = ({ label, name, options }) => (
    <div className="mb-4.5">
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field }) => (
          <select
            {...field}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="" disabled>
              Select {label}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
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

  const FormInput = ({ label, name, placeholder }) => (
    <div className="mb-4.5">
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder={placeholder}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
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
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Subject Entry
          </h3>
        </div>
        <div className="p-6.5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect label="Year" name="year" options={years} />
              <FormSelect label="Group" name="group" options={groups} />
              <FormSelect label="Class" name="className" options={classes} />
              <FormInput
                label="Subject Name"
                name="subjectName"
                placeholder="Enter Subject"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Submit Subject"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubjectEntry;
