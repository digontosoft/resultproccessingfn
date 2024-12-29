import { useForm, Controller } from "react-hook-form";
import useUserProtectFilter from "../../hooks/useUserProtectFilter";
import { useState } from "react";
import { groupData, termsData } from "../../data/data";

const ResultSummary = () => {
  const { filterClass, filterSection, filterShift, sessions } =
    useUserProtectFilter();
  const [filterGroup, setFilterGroup] = useState([]);
  const [formData, setFormData] = useState({
    // className: "",
    // group: "",
    // section: "",
    // shift: "",
    // session: "",
    // term: "",
    is_merged: false,
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handelClass = (value) => {
    // console.log(value);

    if (value == 10) {
      setFilterGroup(groupData.slice(1, 4));
    } else {
      setFilterGroup(groupData.slice(0, 1));
    }
  };

  const onSubmit = (data) => {
    console.log({ data, ...formData });
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "is_merged"
          ? value === "true"
          : value,
    }));
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
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Result Summary
          </h3>
        </div>
        <form className="space-y-4 px-6" onSubmit={handleSubmit(onSubmit)}>
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
          <FormSelect label="Exam" name="term" options={termsData} />
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
          <FormSelect label="Section" name="section" options={filterSection} />
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
              {groupData.map((item) => (
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
              Marge Result
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="is_merged"
                  value="true"
                  checked={formData.is_merged === true}
                  onChange={handleInputChange}
                  className="form-radio text-blue-600"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="is_merged"
                  value="false"
                  checked={formData.is_merged === false}
                  onChange={handleInputChange}
                  className="form-radio text-blue-600"
                />
                <span>No</span>
              </label>
            </div>
          </div>
          <button
            className={`inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10`}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResultSummary;
