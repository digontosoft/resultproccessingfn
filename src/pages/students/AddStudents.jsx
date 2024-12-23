import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import useSingleUser from "../../hooks/useSingleUser";
import useUserProtectFilter from "../../hooks/useUserProtectFilter";
import { groupData } from "../../data/data";
//const groups = ["general", "science", "humanities", "business"]

const AddStudents = () => {
  const { gurdedApi } = useAxios();
  const [configs, setConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [fourthSubject, setFourthSubject] = useState([]);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const [filterGroup, setFilterGroup] = useState([]);

  const { filterClass, filterSection, filterShift, sessions } =
    useUserProtectFilter();
  //console.log("condition", fourthSubject);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handelClass = (value) => {
    // console.log(value);

    if (value == 9 || value == 10) {
      setFilterGroup(groupData.slice(1, 4));
    } else {
      setFilterGroup(groupData.slice(0, 1));
    }
  };

  // console.log("filter Group",filterGroup);

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

  // console.log(subjects);
  const handleFourthSubjectFilter = (group) => {
    const data = subjects.filter(
      (item) => item.group === group && item.isFourthSubject === true
    );
    setFourthSubject(data);
  };

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await gurdedApi.post("/addStudentData", { ...data });
      if (response.status === 202) {
        toast.error("StudentId already exist");
      }
      if (response.status === 200) {
        toast.success("Student added successfully");
        reset();
        // navigate("/student-list");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
      toast.error(
        `Error: ${error.response?.data?.message || "Submission failed"}`
      );
    } finally {
      setIsLoading(false);
    }

    console.log("data:", data);
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
              label="Mother's Name"
              name="motherName"
              placeholder="Enter Mother's Name"
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
                onChange={(e) => handelClass(e.target.value)}
              >
                <option value="" hidden>
                  Select Class
                </option>
                {filterClass.map((option) => (
                  <option key={option._id} value={option.value}>
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
                {sessions.map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
              {errors.year && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.year.message}
                </span>
              )}
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Select Section
              </label>
              <select
                {...register("section", {
                  required: "Please select a section",
                })}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Section</option>
                {filterSection.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
              {errors.year && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.year.message}
                </span>
              )}
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Select Shift
              </label>
              <select
                {...register("shift", { required: "Please select a shift" })}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Shift</option>
                {filterShift.map((shift) => (
                  <option key={shift} value={shift}>
                    {shift}
                  </option>
                ))}
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
                onChange={(e) => handleFourthSubjectFilter(e.target.value)}
              >
                <option value="">Select Group</option>
                {filterGroup.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.group && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.group.message}
                </span>
              )}
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Religion
              </label>
              <select
                {...register("religion", { required: "Religion is required" })}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Religion</option>
                <option value="Islam">Islam</option>
                <option value="Hindu">Hindu</option>
                <option value="Christian">Christian</option>
                <option value="Buddhist">Buddhist</option>
              </select>
              {errors.religion && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.religion.message}
                </span>
              )}
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Gender
              </label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                {/* <option value="">Select Gender</option> */}
                <option value="Female">Female</option>
                {errors.gender && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </span>
                )}
              </select>
            </div>
            {fourthSubject.length > 0 && (
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  4th Subject
                </label>
                <select
                  {...register("fourthSubjectCode", {
                    required: "fourthSubjectCode is required",
                  })}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select 4th Subject</option>
                  {fourthSubject.map((item) => (
                    <option key={item._id} value={item.subjectCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.fourthSubjectCode && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.fourthSubjectCode.message}
                  </span>
                )}
              </div>
            )}
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
