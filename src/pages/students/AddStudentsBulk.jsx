import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddStudentsBulk = () => {
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const handleDownloadTemplate = () => {
    // File path in the public folder
    const fileUrl = "/student-sample-file.xlsx";
    window.location.href = fileUrl;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const file = data.file[0]; // Access the uploaded file
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${url}/student/bulk-upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      toast.success("Students uploaded successfully");
      navigate("/student-list");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Failed to upload students: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Bulk Add Students
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
              <li>Upload the completed Excel file using the upload section</li>
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
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Upload Excel File
              </label>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                ref={fileInputRef}
                {...register("file", {
                  required: "Please select a file to upload",
                })}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.file && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.file.message}
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
              {isLoading ? "Uploading..." : "Upload Students"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudentsBulk;
