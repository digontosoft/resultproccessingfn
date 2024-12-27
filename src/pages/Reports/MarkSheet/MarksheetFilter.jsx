import { useState } from "react";
import axios from "axios";
import useUserProtectFilter from "../../../hooks/useUserProtectFilter";
import { groupData, termsData } from "../../../data/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MarkSheetFilter = () => {
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const [formData, setFormData] = useState({
    session: "2024",
    term: "",
    className: "",
    section: "",
    shift: "",
    group: "",
    is_merged: false,
    start_roll: "",
    end_roll: "",
  });
  const { filterClass, filterSection, filterShift, sessions } =
    useUserProtectFilter();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/result/marksheet`, formData);
      if (response.status === 200) {
        // localStorage.setItem("mergeResult", JSON.stringify(response.data));
        // navigate(
        //   formData.is_merged ? "/get-merge-marksheet" : "/get-marksheet"
        // );
        toast.success("Marksheet Generated Successfully");
        console.log("marksheet:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Please Enter Valid Details");
    }
    console.log("merge-result:", formData);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 shadow-md rounded-md"
      >
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Session
          </label>
          <select
            name="session"
            value={formData.session}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Session</option>
            {sessions.map((session) => (
              <option key={session} value={session}>
                {session}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Term</label>
          <select
            name="term"
            value={formData.term}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Term</option>
            {termsData.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Class Name
          </label>
          <select
            name="className"
            value={formData.className}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Class</option>
            {filterClass.map((className) => (
              <option key={className} value={className?.value}>
                {className?.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Section
          </label>
          <select
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Section</option>
            {filterSection.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Shift</label>
          <select
            name="shift"
            value={formData.shift}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Shift</option>
            {filterShift.map((shift) => (
              <option key={shift} value={shift}>
                {shift}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Group</label>
          <select
            name="group"
            value={formData.group}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Group</option>
            {groupData.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Merge Result?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_merged"
                checked={formData.is_merged}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span>Yes</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Roll From
          </label>
          <input
            type="number"
            name="start_roll"
            value={formData.start_roll}
            onChange={handleInputChange}
            required
            min="1"
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Roll To
          </label>
          <input
            type="number"
            name="end_roll"
            value={formData.end_roll}
            onChange={handleInputChange}
            required
            min="1"
            className="w-full border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MarkSheetFilter;