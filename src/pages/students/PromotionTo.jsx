import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import useUserProtectFilter from "../../hooks/useUserProtectFilter";

const PromotionTo = ({ rollRangeStudent }) => {
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const { filterClass, filterSection, filterShift } = useUserProtectFilter();

  // Initialize formData state with default values
  const [formData, setFormData] = useState(
    rollRangeStudent.map((student) => ({
      id: student._id,
      class: "",
      section: "",
      shift: "",
      roll: "",
    }))
  );

  // Handle input changes dynamically
  const handleChange = (id, field, value) => {
    setFormData((prevData) =>
      prevData.map((data) =>
        data.id === id
          ? {
              ...data,
              [field]: field === "roll" ? Number(value) : value, // Convert roll to number
            }
          : data
      )
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { promotedStudent: formData };
      const response = await axios.post(`${url}/student-promotion`, payload);

      if (response.status === 200) {
        toast.success("Students promoted successfully!");
        console.log("Response Data:", response.data);
      }
    } catch (err) {
      console.error("Promotion Error:", err);
      toast.error("Failed to promote students.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-6 p-4">
          {/* From Column */}
          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-4">From</h2>
            {rollRangeStudent.map((student) => (
              <div
                key={student._id}
                className="flex flex-wrap gap-2 border p-4 rounded-lg shadow-md mb-4 max-h-max min-h-44"
              >
                <div>
                  <label>Class</label>
                  <input
                    type="text"
                    value={student.class}
                    disabled
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label>Section</label>
                  <input
                    type="text"
                    value={student.section}
                    disabled
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label>Shift</label>
                  <input
                    type="text"
                    value={student.shift}
                    disabled
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label>Roll</label>
                  <input
                    type="text"
                    value={student.roll}
                    disabled
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* To Column */}
          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-4">To</h2>

            {formData.map((data) => (
              <div
                key={data.id}
                className="flex flex-wrap gap-2 border p-4 rounded-lg shadow-md mb-4 max-h-max min-h-44"
              >
                <div>
                  <label>Class</label>
                  <select
                    value={data.class}
                    onChange={(e) =>
                      handleChange(data.id, "class", e.target.value)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  >
                    <option value="">Select Class</option>
                    {filterClass.map((classData) => (
                      <option key={classData.value} value={classData.value}>
                        {classData.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Section</label>
                  <select
                    value={data.section}
                    onChange={(e) =>
                      handleChange(data.id, "section", e.target.value)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  >
                    <option value="">Select Section</option>
                    {filterSection.map((sectionData) => (
                      <option key={sectionData} value={sectionData}>
                        {sectionData}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Shift</label>
                  <select
                    value={data.shift}
                    onChange={(e) =>
                      handleChange(data.id, "shift", e.target.value)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  >
                    <option value="">Select Shift</option>
                    {filterShift.map((shiftData) => (
                      <option key={shiftData} value={shiftData}>
                        {shiftData}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Roll</label>
                  <input
                    type="number"
                    value={data.roll}
                    onChange={(e) =>
                      handleChange(data.id, "roll", e.target.value)
                    }
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    placeholder="Enter Roll"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 w-full rounded-md shadow hover:bg-indigo-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PromotionTo;
