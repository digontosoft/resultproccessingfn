import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MarksInput = ({ rollRangeStudent, rollRangeStudentData }) => {
  const [results, setResults] = useState([]);
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const { control, handleSubmit, setValue } = useForm();

  const {
    section,
    class: className,
    subject: subjectName,
    shift,
    session,
    term,
  } = rollRangeStudentData;
  const onSubmit = async (data) => {
    const formattedResults = rollRangeStudent.map((student, index) => ({
      subjective: parseInt(data.students[index].subjective) || 0,
      objective: parseInt(data.students[index].objective) || 0,
      practical: parseInt(data.students[index].practical) || 0,
      classAssignment: parseInt(data.students[index].classAssignment) || 0, // Add default value or add new input field if needed
      studentId: student.studentId,
    }));

    const payload = {
      section,
      className,
      subjectName,
      shift,
      session,
      term,
      results: formattedResults,
    };

    try {
      console.log("payload", payload);
      const response = await axios.post(`${url}/result/create`, payload);
      if (response.status === 201) {
        toast.success("Marks added successfully");
      }
    } catch (error) {
      toast.error("Failed to add marks");
    }
  };

  // Error Handling
  const validateMarks = (value) => {
    const marks = parseInt(value, 10);
    if (isNaN(marks) || marks < 0 || marks > 100) {
      return "Marks must be between 0 and 100";
    }
    return true;
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Input Student Marks
          </h3>
        </div>

        <div className="p-6.5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    S.ID
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Roll
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
                    CA
                  </th>
                </tr>
              </thead>
              <tbody>
                {rollRangeStudent?.map((student, index) => (
                  <tr key={student._id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {student?.studentId}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {student?.roll}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {student?.studentName}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {/* <Controller
                        name={`students[${index}].subjective`}
                        control={control}
                        defaultValue=""
                        rules={{ validate: validateMarks }}
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
                      /> */}

                      <Controller
                        name={`students[${index}].subjective`}
                        control={control}
                        defaultValue=""
                        // rules={{ validate: validateMarks }}
                        render={({ field, fieldState }) => (
                          <div>
                            <input
                              type="number"
                              {...field}
                              className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                            />
                            {/* {fieldState.error && (
                              <p className="text-red-500 text-sm">
                                {fieldState.error.message}
                              </p>
                            )} */}
                          </div>
                        )}
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Controller
                        name={`students[${index}].objective`}
                        control={control}
                        defaultValue=""
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
                        defaultValue=""
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
                        name={`students[${index}].classAssignment`}
                        control={control}
                        defaultValue=""
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
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="submit"
              className="mt-4 w-full rounded bg-blue-500 py-3 px-5 font-medium text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarksInput;
