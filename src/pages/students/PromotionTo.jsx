import React from "react";

const PromotionTo = () => {
  const fields = ["Class", "Section", "Shift", "Group", "Roll"];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* From Column */}
      <div className="w-1/2">
        <h2 className="text-lg font-semibold mb-4">From</h2>
        <div className="flex flex-wrap gap-2 border p-4 rounded-lg shadow-md">
          <div>
            <label htmlFor="">Class</label>
            <div>
              <input type="text" defaultValue="4" disabled />
            </div>
          </div>
          <div>
            <label htmlFor="">Section</label>
            <div>
              <input type="text" defaultValue="A" disabled />
            </div>
          </div>
          <div>
            <label htmlFor="">Shift</label>
            <div>
              <input type="text" defaultValue="Morning" disabled />
            </div>
          </div>
          <div>
            <label htmlFor="">Group</label>
            <div>
              <input type="text" defaultValue="General" disabled />
            </div>
          </div>
          <div>
            <label htmlFor="">Roll</label>
            <div>
              <input type="text" defaultValue="1" disabled />
            </div>
          </div>
        </div>
      </div>

      {/* To Column */}
      <div className="w-1/2">
        <h2 className="text-lg font-semibold mb-4">To</h2>
        <div className="flex gap-4 border p-4 rounded-lg shadow-md">
          <div>
            <label htmlFor="class">Class</label>
            <div>
              <select
                id="class"
                name="class"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="section">Section</label>
            <div>
              <select
                id="section"
                name="section"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="shift">Shift</label>
            <div>
              <select
                id="shift"
                name="shift"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="group">Group</label>
            <div>
              <select
                id="group"
                name="group"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="General">General</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="roll">Roll</label>
            <div>
              <input
                type="number"
                id="numberInput"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Roll"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionTo;
