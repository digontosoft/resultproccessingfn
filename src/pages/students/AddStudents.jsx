import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

const AddStudents = () => {
  const { gurdedApi } = useAxios();
  const [configs, setConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await gurdedApi.get("/configs");

        if (response.status === 200) {
          setConfigs(response.data);
        }
      } catch (error) {
        console.error(error.response.data.message);
        toast.error(`Error: ${error.response.data.message}`);
      }
    };

    fetchConfigs();
  }, [gurdedApi]);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${url}/class`);
        const classNames = response.data.classes;
        setClasses(classNames);
      } catch (error) {
        toast.error("Failed to fetch classes");
      }
    };

    fetchClasses();
  }, [url]);

  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading state
    try {
      const response = await gurdedApi.post("/addStudentData", { ...data });
      console.log({ response });
      if (response.status === 200) {
        toast.success("Student added successfully");
        reset();
        navigate("/student-list");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
      toast.error(
        `Error: ${error.response?.data?.message || "Submission failed"}`
      );
    } finally {
      setIsLoading(false); // End loading state
    }

    console.log("data:", data);
  };

  // dropdown option
  const dropdownOptions = {
    // class: Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`),
    // section: ['Section A', 'Section B'],
    // shift: ['Morning', 'Day'],
    // group: ['Science', 'Commerce', 'Humanities'],
    // religion: ['Islam', 'Hinduism', 'Buddhism', 'Christianity', 'Others'],
    class: configs.filter((config) => config.slug === "Class"),
    section: configs.filter((config) => config.slug === "Section"),
    shift: configs.filter((config) => config.slug === "shift"),
    group: configs.filter((config) => config.slug === "group"),
    religion: configs.filter((config) => config.slug === "religion"),
    gender: configs.filter((config) => config.slug === "gender"),
  };

  // Reusable input field component
  const InputField = ({ label, name, type = "text", placeholder }) => (
    <div>
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required: `${label} is required` })}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );

  // Reusable select field component
  const SelectField = ({ label, name, options }) => (
    <div>
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <select
        {...register(name, { required: `${label} is required` })}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.key}
          </option>
        ))}
      </select>
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
            Add Student
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5.5 p-6.5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5">
            {/* Input fields with two per row */}
            <InputField
              label="Student ID"
              name="studentId"
              placeholder="Enter Student ID"
            />
            <InputField label="Roll" name="roll" placeholder="Enter Roll" />
            <InputField
              label="Name"
              name="studentName"
              placeholder="Enter Name"
            />
            <InputField
              label="Father's Name"
              name="fatherName"
              placeholder="Enter Father's Name"
            />
            <InputField
              label="Phone Number"
              name="mobile"
              placeholder="Enter Phone Number"
            />
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Select Class
              </label>
              <select
                {...register("class", { required: "Please select a class" })}
                // onChange={(e) => handleFilterChange(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="" hidden>
                  Select Class
                </option>
                {classes.map((option) => (
                  <option key={option._id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.class && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.class.message}
                </span>
              )}
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Select Year
              </label>
              <select
                {...register("year", { required: "Please select a year" })}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Year</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
              {errors.year && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.year.message}
                </span>
              )}
            </div>
            <SelectField
              label="Section"
              name="section"
              options={dropdownOptions.section}
            />
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Select Shift
              </label>
              <select
                {...register("shift", { required: "Please select a shift" })}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Shift</option>
                <option value="Day">Morning</option>
                <option value="Day">Day</option>
              </select>
              {errors.shift && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.shift.message}
                </span>
              )}
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Group
              </label>
              <select
                {...register("group", { required: "Group is required" })}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Group</option>
                <option value="General">General</option>
                <option value="Science">Science</option>
                <option value="Commerce">Bussines</option>
                <option value="Arts">Humanities</option>
              </select>
              {errors.group && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.group.message}
                </span>
              )}
            </div>
            <SelectField
              label="Religion"
              name="religion"
              options={dropdownOptions.religion}
            />
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Gender
              </label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                {errors.gender && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </span>
                )}
              </select>
            </div>
          </div>

          <button
            className={`inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudents;
