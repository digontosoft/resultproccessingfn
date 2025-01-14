import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GridLoader } from "react-spinners";
import { toast } from "react-toastify";
import useUserProtectFilter from "../../hooks/useUserProtectFilter";
import { groupData } from "../../data/data";

const SubjectEntry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const { filterClass } = useUserProtectFilter();
  const [filterGroup, setFilterGroup] = useState([]);
  const {sessions} = useUserProtectFilter()

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isFourthSubject: false,
    },
  });
  const handelClass = (value) => {
    //console.log("i am value",value);
    const data = filterClass.filter(
      (item) => item._id === value && ( item.value == 10)
    );
    //console.log(data);

    if (data.length > 0) {
      setFilterGroup(groupData.slice(1, 4));
    } else {
      setFilterGroup(groupData.slice(0, 1));
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${url}/class`);
        const classNames = response.data.classes.map((item) =>
          typeof item === "string" ? item : item.name
        );
        setClasses(classNames);
      } catch (error) {
        toast.error("Failed to fetch classes");
      }
    };

    fetchClasses();
  }, [url]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulated API call
      await axios.post(`${url}/create-subject`, data);
      toast.success("Subject created successfully");
      reset();
    } catch (error) {
      toast.error("Failed to create subject");
    } finally {
      setIsLoading(false);
    }
    console.log("subject:", data);
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
            <option value="">Select {label}</option>
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

  const FormInput = ({ label, name, placeholder, type }) => (
    <div className="mb-4">
      <label className="block mb-2 text-black dark:text-white">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none"
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );

  const FormCheckbox = ({ label, name }) => (
    <div className="mb-4 flex items-center">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="checkbox"
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
            className="mr-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
        )}
      />
      <label className="text-black dark:text-white">{label}</label>
    </div>
  );

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed top-[40%] left-[50%] h-40 w-40 rounded-md bg-gray-200 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <GridLoader color="#3B82F6" />
        </div>
      )}
      <div className="p-6 bg-white border rounded shadow dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4 text-black dark:text-white">
          Create Subject
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Subject Name"
            name="name"
            placeholder="Enter subject name"
          />
          <FormInput
            label="Subject Code"
            name="subjectCode"
            placeholder="Enter subject code"
          />
           <div className="mb-4.5">
            <label className="mb-3 block text-black dark:text-white">
              Select year
            </label>
            <select
              {...register("year", {
                required: `class is required`,
              })}
              // onChange={(e) => handleFilterChange(e.target.value)} // Pass the selected value
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              onChange={(e) => handelClass(e.target.value)}
            >
              <option value="">Select year</option>
              {sessions.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[name] && (
              <span className="text-red-500 text-sm mt-1">
                {errors[name].message}
              </span>
            )}
          </div>
          <FormInput
            label="Marks"
            name="marks"
            type="number"
            placeholder="Enter marks"
          />
          {/* <FormSelect label="Class" name="class" options={classes} /> */}
          <div className="mb-4.5">
            <label className="mb-3 block text-black dark:text-white">
              Select Class
            </label>
            <select
              {...register("class", {
                required: `class is required`,
              })}
              // onChange={(e) => handleFilterChange(e.target.value)} // Pass the selected value
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              onChange={(e) => handelClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {filterClass.map((option, i) => (
                <option key={i} value={option._id}>
                  {option?.name}
                </option>
              ))}
            </select>
            {errors[name] && (
              <span className="text-red-500 text-sm mt-1">
                {errors[name].message}
              </span>
            )}
          </div>
          <FormSelect label="Group" name="group" options={filterGroup} />
          <FormCheckbox label="Is 4th Subject?" name="isFourthSubject" />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubjectEntry;
