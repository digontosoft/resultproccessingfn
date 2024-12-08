const MeritList = () => {
  return (
    <div>
      <div className="w-full h-auto min-h-180 border rounded-md">
        <div className="p-4 border-b">
          <span className="text-2xl font-semibold leading-normal">
            Merit List
          </span>
        </div>
        <div className="space-y-4 px-40 py-5">
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year <span className="text-red">*</span>
            </label>
            <select
              id="year"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Year
              </option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="exam"
              className="block text-sm font-medium text-gray-700"
            >
              Exam <span className="text-red">*</span>
            </label>
            <select
              id="exam"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Exam
              </option>
              <option value="midterm">Midterm</option>
              <option value="final">Final</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="shift"
              className="block text-sm font-medium text-gray-700"
            >
              Shift <span className="text-red">*</span>
            </label>
            <select
              id="shift"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Shift
              </option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="class"
              className="block text-sm font-medium text-gray-700"
            >
              Class <span className="text-red">*</span>
            </label>
            <select
              id="class"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Class
              </option>
              <option value="class10">Class 10</option>
              <option value="class12">Class 12</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="section"
              className="block text-sm font-medium text-gray-700"
            >
              Section <span className="text-red">*</span>
            </label>
            <select
              id="section"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Section
              </option>
              <option value="a">A</option>
              <option value="b">B</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="group"
              className="block text-sm font-medium text-gray-700"
            >
              Group <span className="text-red">*</span>
            </label>
            <select
              id="group"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Group
              </option>
              <option value="science">Science</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="mergeResult"
              className="block text-sm font-medium text-gray-700"
            >
              Merge Result?
            </label>
            <div className="mt-2 flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="mergeYes"
                  name="mergeResult"
                  value="yes"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="mergeNo"
                  name="mergeResult"
                  value="no"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button className="text-base font-normal uppercase py-2 px-4 rounded-md bg-blue-900 hover:bg-blue-700 text-white">
              Serach
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeritList;
