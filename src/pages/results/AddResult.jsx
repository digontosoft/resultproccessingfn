import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const shifts = ["Morning", "Day"];
const currentYear = new Date().getFullYear();
const sessions = [currentYear, currentYear - 1, currentYear - 2];
const terms = ["Half Yearly", "Annual", "Pretest", "Test", "Model Test"];

const AddResult = () => {
  const { gurdedApi } = useAxios();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const [subjects, setSubjects] = useState([]);
  const [classSub, setClassSub] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const { register } = useForm();

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

  useEffect(() => {
    const subject = async () => {
      const response = await axios.get(`${url}/subjects`);
      setSubjects(response.data.subjects);
      console.log("subjects:", response.data.subjects);
    };
    subject();
  }, [url]);
  //console.log(subjects);

  const handleFilterChange = (classId) => {
    console.log("Selected classId:", classId);

    // Filter the subjects based on the selected classId
    const filtered = subjects.filter(
      (subject) => subject.class._id === classId
    );

    // Update the state with the filtered subjects
    setFilteredSubjects(filtered);
    console.log("Filtered subjects:", filtered);
  };

  useEffect(() => {
    const filter = subjects.filter((item) => {
      // Ensure class exists and has a value property
      return item.class && item.class.value === selectedClass;
    });
    const sub = filter.map((item) => item.name);
    console.log(sub);
    setClassSub(sub);
  }, [selectedClass]);

  console.log(classSub);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      section: "",
      shift: "",
      session: "",
      term: "",
      rollFrom: "",
      rollTo: "",
      class: "",
      group: "",
      subject: "",
      marks: "",
    },
  });

  const handleClassChange = (value) => {
    setSelectedClass(value);
    setSelectedGroup("");

    reset({
      ...control._defaultValues,
      class: value,
      subject: "",
      marks: "",
    });
  };

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
    reset({
      ...control._defaultValues,
      group: value,
      subject: "",
      marks: "",
    });
  };

  const getSubjects = () => {
    if (["4", "5"].includes(selectedClass)) {
      return SUBJECTS.JUNIOR;
    }
    if (["9", "10"].includes(selectedClass)) {
      const commonSubjects = SUBJECTS.COMMON_9_10;
      if (selectedGroup === "science") {
        return [...commonSubjects, ...SUBJECTS.SCIENCE];
      }
      if (selectedGroup === "arts") {
        return [...commonSubjects, ...SUBJECTS.ARTS];
      }
      if (selectedGroup === "commerce") {
        return [...commonSubjects, ...SUBJECTS.COMMERCE];
      }
    }
    if (["6", "7", "8"].includes(selectedClass)) {
      return [];
    }
    return [];
  };

  const onSubmit = async (data) => {
    console.log(data);

    setIsLoading(true);
    try {
      const response = await gurdedApi.post(
        `${url}/get-student-by-roll-range`,
        data
      );
      //toast.success("Subject created successfully");
      console.log(response.data.data.length);
      if (response.data.data.length > 0) {
        navigate("/add-result/marks-input", {
          state: { students: response.data.data },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create subject");
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
            <option value="" disabled>
              Select {label}
            </option>
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
    <div>
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
                  {...register("class", { required: "Please select a class" })}
                  onChange={(e) => handleFilterChange(e.target.value)}
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
                {errors.class && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.class.message}
                  </span>
                )}
              </div>
              <FormSelect
                label="Select Group"
                name="group"
                onChange={handleGroupChange}
                options={[
                  { value: "General", label: "General" },
                  { value: "Science", label: "Science" },
                  { value: "Humanities", label: "Humanities" },
                  { value: "Commerce", label: "Commerce" },
                ]}
              />
              <FormSelect label="Section" name="section" options={["A", "B"]} />
              <FormSelect label="Shift" name="shift" options={shifts} />
              <FormSelect label="Session" name="session" options={sessions} />
              <FormSelect label="Term" name="term" options={terms} />
              <div className="mt-4.5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Subject
                </label>
                <select
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Subject
                  </option>
                  {filteredSubjects.map((subject) => (
                    <>
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    </>
                  ))}
                </select>
                {errors.userType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.userType.message}
                  </p>
                )}
              </div>

              <div className="">
                <label className="mb-3 block text-black dark:text-white">
                  Roll From
                </label>
                <Controller
                  name="startRoll"
                  control={control}
                  rules={{ required: "Roll number is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      min="0"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  )}
                />
                {errors.rollFrom && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.rollFrom.message}
                  </span>
                )}
              </div>

              <div className="">
                <label className="mb-3 block text-black dark:text-white">
                  Roll To
                </label>
                <Controller
                  name="endRoll"
                  control={control}
                  rules={{ required: "Roll number is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      min="0"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  )}
                />
                {errors.rollTo && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.rollTo.message}
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
              {isLoading ? "Submitting..." : "Submit Result"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddResult;
