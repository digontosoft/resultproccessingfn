import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];
const SubjectEntry = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      className: "",
      subjectName: "", // Added subjectName field
    },
  });

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    setIsLoading(true);
    if (data) {
      setIsLoading(false);
      toast.success("Subject added successfully");
      reset();
    }
  };

  const FormSelect = ({ label, name, options }) => (
    <div className="mb-4.5">
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <select
            {...field}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="" disabled>
              Select {label}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
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
              {/* Class Select */}
              <FormSelect
                label="Select Class"
                name="className"
                options={classes}
              />

              {/* Subject Name Input */}
              <div className="mb-4.5">
                <label className="mb-3 block text-black dark:text-white">
                  Subject Name
                </label>
                <Controller
                  name="subjectName"
                  control={control}
                  rules={{ required: "Subject Name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Subject"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  )}
                />
                {errors.subjectName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.subjectName.message}
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
              {isLoading ? "Loading..." : "Submit Result"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubjectEntry;
