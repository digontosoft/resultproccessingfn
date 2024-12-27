import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api";
import ResultNav from "../../../components/ResultNav";
import axios from "axios";
import { groupData, termsData } from "../../../data/data";
import useUserProtectFilter from "../../../hooks/useUserProtectFilter";

const MarkSheet = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [formData, setFormData] = useState({
    className: "",
    group: "",
    section: "",
    shift: "",
    session: "",
    term: "",
    roll: "",
    studentId: "",
  });

  const currentYear = new Date().getFullYear();
  const shifts = ["Morning", "Day"];
  const sessions = [currentYear, currentYear - 1, currentYear - 2];
  const terms = ["Annual", "Half Yearly", "Pretest", "Test", "Model Test"];
  const classes = ["4", "5", "6", "7", "8", "9", "10"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "className") {
      setSelectedClass(value);
      // Reset group when class changes
      if (!["9", "10"].includes(value)) {
        setFormData((prev) => ({ ...prev, group: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const response = await api.post("/result/individual", formData);
      console.log("individual-result:", response.data);

      if (response.status === 200) {
        localStorage.setItem("result", JSON.stringify(response.data));
        navigate("/get-result/transcript");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

              {["9", "10"].includes(selectedClass) && (
                <FormSelect
                  label="Select Group"
                  name="group"
                  options={groupData}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormSelect label="Section" name="section" options={["A", "B"]} />
              <FormSelect label="Shift" name="shift" options={shifts} />
              <FormSelect label="Session" name="session" options={sessions} />
              <FormSelect label="Term" name="term" options={termsData} />
              <div className="mb-4.5">
                <label className="mb-3 block text-black dark:text-white">
                  Student Id
                </label>
                <input
                  name="studentId"
                  type="number"
                  min="0"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold">Merge Result?</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="mergeResult"
                      value="yes"
                      className="form-radio text-blue-600"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="mergeResult"
                      value="no"
                      className="form-radio text-blue-600"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="">
                <label className="mb-3 block text-black dark:text-white">
                  Roll From
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="">
                <label className="mb-3 block text-black dark:text-white">
                  Roll To
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Get Result
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarkSheet;
