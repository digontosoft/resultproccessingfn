import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import MarksInput from "./MarksInput";
import useSingleUser from "../../hooks/useSingleUser";

const shifts = ["Morning", "Day"];
const section = ["A", "B"];
const currentYear = new Date().getFullYear();
const sessions = [currentYear, currentYear - 1, currentYear - 2];
const terms = ["Half Yearly", "Annual", "Pretest", "Test", "Model Test"];

const AddResult = () => {
  const { gurdedApi } = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [classData, setClassData] = useState("");
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [rollRangeStudent, setRollRangeStudent] = useState([]);
  const [rollRangeStudentData, setRollRangeStudentData] = useState({});
  const [filterClass, setFilterClass] = useState([]);
  const { getUser } = useSingleUser();
  const [filterSection, setFilterSection] = useState([]);
  const [filterShift, setFilterShift] = useState([]);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

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
  }, [url, getUser]);

  // useEffect(() => {
  //   if (getUser.userType === "teacher") {
  //     const data = classes.filter(
  //       (item) => item.name === getUser.class_id.name
  //     );
  //     const sectionData = section.filter((item) => item === getUser.section);
  //     const shiftData = shifts.filter((item) => item === getUser.shift);
  //     setFilterClass(data);
  //     setFilterSection(sectionData);
  //     setFilterShift(shiftData);
  //   } else {
  //     setFilterClass(classes);
  //     setFilterSection(section);
  //     setFilterShift(shifts);
  //   }
  // }, [getUser]);

  //console.log(singleClass);

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
    const selectedOption = classes.find(
      (option) => option._id === selectedValue
    );
    const filtered = subjects.filter(
      (subject) => subject.class._id === selectedOption._id
    );

    setFilteredSubjects(filtered);
    setClassData(selectedOption.value);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      class: classData,
    };
    console.log("Form Data:", payload);
    setRollRangeStudentData(payload);
    setIsLoading(true);

    try {
      const reseponse = await gurdedApi.get(
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
            Add Student Result
          </h3>
        </div>

        <div className="p-6.5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  }}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="" hidden>
                    Select Class
                  </option>
                  {classes.map((option) => (
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
                label="Select Group"
                name="group"
                options={[
                  { value: "General", label: "General" },
                  { value: "Science", label: "Science" },
                  { value: "Humanities", label: "Humanities" },
                  { value: "Commerce", label: "Commerce" },
                ]}
              />
              <FormSelect label="Section" name="section" options={section} />
              <FormSelect label="Shift" name="shift" options={shifts} />
              <FormSelect label="Session" name="session" options={sessions} />
              <FormSelect label="Term" name="term" options={terms} />
              <div className="mb-4.5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Subject
                </label>
                <select
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              </div>
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
              {isLoading ? "Searching..." : "Search Result"}
            </button>
          </form>
        </div>
      </div>
      <div>
        {/* {rollRangeStudent.length > 0 && (
        )} */}
        <MarksInput
          rollRangeStudent={rollRangeStudent}
          rollRangeStudentData={rollRangeStudentData}
        />
      </div>
    </div>
  );
};

export default AddResult;
