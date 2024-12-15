import axios from "axios";
import { use, useEffect } from "react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import AddResultBulkAdmin from "./AddResultBulkAdmin";

const AddResultsBulk = () => {
  const fileInputRef = useRef(null);
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [teacherAccess, setTeacherAccess] = useState([]);
  const [selectedClass, setSelectedClass] = useState();
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const classes = Array.from({ length: 5 }, (_, i) => `${i + 6}`);
  const subjects = [
    "Bangla1st",
    "Bangla2nd",
    "English1st",
    "English2nd",
    "Mathematics",
    "Higher Mathematics",
    "Islam and Moral Education",
    "Biology",
    "Chemistry",
    "Physics",
    "Bangladesh and Global Studies",
    "Information and Communication Technology",
  ];
  const shifts = ["morning", "day"];
  const sessions = [currentYear, currentYear - 1, currentYear - 2];
  const terms = ["Final", "Half Yearly"];

  // Create sample data for Excel template
  const handleDownloadTemplate = () => {
    const headers = ["Roll", "Student Name", "CQ", "MCQ", "CA", "PRAC"];
    const sampleData = [["1", "Name of student", "19", "20", "16", "22"]];

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...sampleData]);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

    // Write the workbook and trigger the download
    XLSX.writeFile(workbook, "result_upload_template.xlsx");
  };

  const teacher = JSON.parse(localStorage.getItem("auth"));
  // console.log("teacher", teacher);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${url}/teacher-subjects/${teacher._id}`
        );
        const teacherData = response.data.data;
        console.log("teacherData:", teacherData);
        setTeacherAccess(teacherData);
      } catch (error) {
        toast.error("Failed to fetch users");
        console.error(error);
      }
    };

    fetchUsers();
  }, [url, teacher._id]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${url}/subjects`);
        const data = response.data.subjects;
        setTeacherSubjects(data);
        setFilteredSubjects(data); // Initially set all subjects
        console.log("teacherSubjects", data);
      } catch (error) {
        toast.error("Failed to fetch subjects");
        console.error(error);
      }
    };

    fetchSubjects();
  }, [url]);

  const handleFilterChange = (classId) => {
    console.log("Selected classId:", classId);

    // Filter the subjects based on the selected classId
    const filtered = teacherSubjects.filter(
      (subject) => subject.class._id === classId
    );

    // Update the state with the filtered subjects
    setFilteredSubjects(filtered);
    console.log("Filtered subjects:", filtered);
  };

  const teacher_class = teacherAccess.flatMap((cls) =>
    cls.ClassVsSubject.map((cl) => cl.class_id)
  );
  const teacher_subject_ids = teacherAccess.flatMap((cls) =>
    cls.ClassVsSubject.map((cl) => cl.subjects)
  );

  // console.log("Subject IDs:", teacher_class);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data.excelFile[0]);
      formData.append("section", data.section);
      formData.append("class", data.class);
      formData.append("subject", data.subject);
      formData.append("shift", data.shift);
      formData.append("session", data.session);
      formData.append("term", data.term);

      const response = await fetch(`${url}/result/bulk-upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      toast.success("Results uploaded successfully");
      // navigate("/result-list");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Failed to upload results: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const FormSelect = ({ label, name, options, required = true }) => (
    <div className="mb-4.5">
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <select
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
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
  );

  return (
    <div>
      {teacher?.userType === "teacher" ? (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Bulk Add Results
            </h3>
          </div>

          <div className="p-6.5">
            <div className="mb-8">
              <h4 className="mb-4 text-black dark:text-white">Instructions</h4>
              <ol className="list-decimal pl-6 space-y-2 text-black dark:text-white">
                <li>Download the Excel template using the button below</li>
                <li>
                  Fill in the student information following the template format
                </li>
                <li>
                  Select all required fields and upload the completed Excel file
                </li>
              </ol>
            </div>

            <div className="mb-8">
              <button
                onClick={handleDownloadTemplate}
                className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Download Template
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormSelect
                  label="Section"
                  name="section"
                  options={["A", "B"]}
                />
                {/* <FormSelect label="Class" name="class" options={teacher_class} /> */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-black dark:text-white">
                    Select Class
                  </label>
                  <select
                    {...register("class", {
                      required: `class is required`,
                    })}
                    onChange={(e) => handleFilterChange(e.target.value)} // Pass the selected value
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select Class</option>
                    {teacher_class.map((option, i) => (
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
                <div className="mb-4.5">
                  <label className="mb-3 block text-black dark:text-white">
                    Select Subject
                  </label>
                  <select
                    {...register("subject", {
                      required: `subject is required`,
                    })}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select Subject</option>
                    {filteredSubjects.map((option, i) => (
                      <option key={i} value={option?.name}>
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
                <FormSelect label="Shift" name="shift" options={shifts} />
                <FormSelect label="Session" name="session" options={sessions} />
                <FormSelect label="Term" name="term" options={terms} />
              </div>

              <div className="mt-4">
                <label className="mb-3 block text-black dark:text-white">
                  Upload Excel File
                </label>
                <input
                  type="file"
                  accept=".xlsx"
                  ref={fileInputRef}
                  {...register("excelFile", {
                    required: "Please select a file to upload",
                  })}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.excelFile && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.excelFile.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Uploading..." : "Upload Result"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <AddResultBulkAdmin />
      )}
    </div>
  );
};

export default AddResultsBulk;
