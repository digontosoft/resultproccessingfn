import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { groupData, termsData } from "../../../data/data";
import axios from "axios";
import { toast } from "react-toastify";
import GlobalLoadingState from "../../../components/GlobalLoadingState/GlobalLoadingState";

const FilterMeritList = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [formData, setFormData] = useState({
    className: "",
    group: "",
    section: "",
    shift: "",
    session: "",
    term: "",
    is_merged: false,
  });

  const currentYear = new Date().getFullYear();
  const shifts = ["All", "Morning", "Day"];
  const sessions = [currentYear, currentYear - 1, currentYear - 2];
  const classes = ["4", "5", "6", "7", "8", "9", "10"];

  // const handleInputChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));

  //   if (name === "className") {
  //     setSelectedClass(value);
  //     // Reset group when class changes
  //     if (!["9", "10"].includes(value)) {
  //       setFormData((prev) => ({ ...prev, group: "" }));
  //     }
  //   }
  // };

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

  const schoolInfo = {
    session: formData.session,
    term: formData.term,
    shift: formData.shift,
    section: formData.section,
    group: formData.group,
    className: formData.className,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsLoading(true);
    const response = await axios.post(`${url}/result/merit-list`, formData);
    if (response.status === 200) {
      toast.success("Merit list generated successfully!");
      localStorage.setItem("meritList", JSON.stringify(response.data));
      localStorage.setItem("meritListSchoolInfo", JSON.stringify(schoolInfo));
      navigate("/merit-list");
    }
    setIsLoading(false);
    console.log("individual-result:", response.data);
  };

  if (isLoading) {
    return <GlobalLoadingState />;
  }

  const FormSelect = ({ label, name, options, required = true }) => (
    <div className="mb-4.5">
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        required={required}
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
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <div className="mt-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Get Student Result
          </h3>
        </div>

        <div className="p-6.5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="Select Class"
                name="className"
                options={classes}
              />

              <FormSelect
                label="Select Group"
                name="group"
                options={groupData}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormSelect
                label="Section"
                name="section"
                options={["All", "A", "B"]}
              />
              <FormSelect label="Shift" name="shift" options={shifts} />
              <FormSelect label="Session" name="session" options={sessions} />
              <FormSelect label="Term" name="term" options={termsData} />
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold">Merge Result?</label>
                <div className="flex items-center space-x-4">
                  {/* <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="is_merged"
                      value={true}
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
                      value={false}
                      checked={formData.is_merged === false}
                      onChange={handleInputChange}
                      className="form-radio text-blue-600"
                    />
                    <span>No</span>
                  </label> */}
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
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterMeritList;
