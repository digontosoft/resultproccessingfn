import { useState } from "react";
import { useForm } from "react-hook-form";
import { groupData } from "../../data/data";

const FilterStudents = ({ classes, onFilter, shift, section, sessions }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [filterGroup, setFilterGroup] = useState([]);

  const onSubmit = (data) => {
    onFilter(data); // Pass the filter criteria to the parent component
  };

  const handelClass = (value) =>{
    console.log(value);
     if (value == 9 || value == 10) {
          setFilterGroup(groupData.slice(1, 4));
        } else {
          setFilterGroup(groupData.slice(0, 1));
        }
  }

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
              {sessions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>

          {/* Shift */}
          <div className="col-span-1">
            <select
              {...register("shift")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Shift</option>
              {shift.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div className="col-span-1">
            <select
              {...register("class")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=>handelClass(e.target.value)}
            >
              <option value="">Class</option>
              {classes.map((className) => (
                <option key={className._id} value={className.value}>
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
              {filterGroup.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>

          {/* Section */}
          <div className="col-span-1">
            <select
              {...register("section")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Section</option>
              {section.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
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
