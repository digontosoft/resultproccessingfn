import { useEffect, useState } from "react";
import FilterMarks from "./FilterMarks";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";

const ResultList = () => {
  const [results, setResults] = useState([]);
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const { control, handleSubmit, setValue } = useForm();
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${url}/result/get_all`);
        setResults(response.data.data); // Assuming API returns data in `data.data`
        console.log("results", response.data.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [url]);
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Marks List</h3>
        </div>
        <div className="p-6.5">
          <FilterMarks />
        </div>
        <div className="p-6.5">
          <form>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    S.ID
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Class
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Name
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Subjective
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Objective
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Practical
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {results?.map((student, index) => (
                  <tr key={student._id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {student?.studentId}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {student?.className}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {student?.studentName}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Controller
                        name={`students[${index}].subjective`}
                        control={control}
                        defaultValue={student?.subjective}
                        // rules={{ validate: validateMarks }}
                        render={({ field, fieldState }) => (
                          <div>
                            <input
                              type="number"
                              {...field}
                              className={`w-full rounded border-[1.5px] ${
                                fieldState.error
                                  ? "border-red-500"
                                  : "border-stroke"
                              } bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                            />
                            {fieldState.error && (
                              <p className="text-red-500 text-sm">
                                {fieldState.error.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Controller
                        name={`students[${index}].objective`}
                        control={control}
                        defaultValue={student?.objective}
                        render={({ field }) => (
                          <div>
                            <input
                              type="number"
                              {...field}
                              className="w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                          </div>
                        )}
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Controller
                        name={`students[${index}].practical`}
                        control={control}
                        defaultValue={student?.practical}
                        render={({ field }) => (
                          <div>
                            <input
                              type="number"
                              {...field}
                              className="w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                          </div>
                        )}
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex gap-5">
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* <button
              type="submit"
              className="mt-4 w-full rounded bg-blue-500 py-3 px-5 font-medium text-white hover:bg-blue-600"
            >
              Submit
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResultList;
