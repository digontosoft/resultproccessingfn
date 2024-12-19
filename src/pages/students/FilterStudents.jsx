// import { useForm } from "react-hook-form";

// const FilterStudents = ({ classes }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const onSubmit = (data) => {
//     console.log("Filtered Data:", data);
//     // Implement your filter logic or API call here
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6"
//       >
//         {/* Year */}
//         <div>
//           <select
//             {...register("year", { required: "Year is required" })}
//             className={`border p-2 rounded ${
//               errors.year ? "border-red-500" : ""
//             }`}
//           >
//             <option value="">Select Year</option>
//             <option value="2024">2024</option>
//             <option value="2023">2023</option>
//             <option value="2022">2022</option>
//           </select>
//           {errors.year && (
//             <p className="text-red-500 text-sm">{errors.year.message}</p>
//           )}
//         </div>

//         {/* Shift */}
//         <div>
//           <select
//             {...register("shift", { required: "Shift is required" })}
//             className={`border p-2 rounded ${
//               errors.shift ? "border-red-500" : ""
//             }`}
//           >
//             <option value="">Shift</option>
//             <option value="Morning">Morning</option>
//             <option value="Day">Day</option>
//           </select>
//           {errors.shift && (
//             <p className="text-red-500 text-sm">{errors.shift.message}</p>
//           )}
//         </div>

//         {/* Class */}
//         <div>
//           <select
//             {...register("class", { required: "Class is required" })}
//             className={`border p-2 rounded ${
//               errors.class ? "border-red-500" : ""
//             }`}
//           >
//             <option value="">Class</option>
//             {classes.map((className) => (
//               <option key={className} value={className._id}>
//                 {className?.name}
//               </option>
//             ))}
//           </select>
//           {errors.class && (
//             <p className="text-red-500 text-sm">{errors.class.message}</p>
//           )}
//         </div>

//         {/* Group */}
//         <div>
//           <select
//             {...register("group", { required: "Group is required" })}
//             className={`border p-2 rounded ${
//               errors.group ? "border-red-500" : ""
//             }`}
//           >
//             <option value="">Group</option>
//             <option value="General">General</option>
//             <option value="Science">Science</option>
//             <option value="Commerce">Commerce</option>
//             <option value="Arts">Arts</option>
//           </select>
//           {errors.group && (
//             <p className="text-red-500 text-sm">{errors.group.message}</p>
//           )}
//         </div>

//         {/* Section */}
//         <div>
//           <select
//             {...register("section", { required: "Section is required" })}
//             className={`border p-2 rounded ${
//               errors.section ? "border-red-500" : ""
//             }`}
//           >
//             <option value="">Section</option>
//             <option value="A">A</option>
//             <option value="B">B</option>
//           </select>
//           {errors.section && (
//             <p className="text-red-500 text-sm">{errors.section.message}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             className="col-span-1 md:col-span-1 bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Filter
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FilterStudents;

import { useForm } from "react-hook-form";

const FilterStudents = ({ classes, onFilter }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onFilter(data); // Pass the filter criteria to the parent component
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {/* Year */}
          <div className="col-span-1">
            <select
              {...register("year")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Year</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          {/* Shift */}
          <div className="col-span-1">
            <select
              {...register("shift")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Shift</option>
              <option value="Morning">Morning</option>
              <option value="Day">Day</option>
            </select>
          </div>

          {/* Class */}
          <div className="col-span-1">
            <select
              {...register("class")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Class</option>
              {classes.map((className) => (
                <option key={className._id} value={className.name}>
                  {className.name}
                </option>
              ))}
            </select>
          </div>

          {/* Group */}
          <div className="col-span-1">
            <select
              {...register("group")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Group</option>
              <option value="General">General</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </div>

          {/* Section */}
          <div className="col-span-1">
            <select
              {...register("section")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center items-center w-40">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterStudents;
