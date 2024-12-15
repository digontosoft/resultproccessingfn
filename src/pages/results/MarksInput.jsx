import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

const MarksInput = () => {
	const location = useLocation()
	console.log(location.state.students);
	// const {students}= location.state
	// console.log(students);
	
	
	// Sample student data - you can replace this with your actual data
	// const initialStudents = [
	// 	{ id: 1, roll: '001', name: 'John Doe' },
	// 	{ id: 2, roll: '002', name: 'Jane Smith' },
	// 	{ id: 3, roll: '003', name: 'Mike Johnson' },
	// ];

	const { control, handleSubmit, setError, getValues } = useForm();
	const [students] = useState(location.state.students);

	// Handle form submission
	const onSubmit = async (data) => {
		// Transform the data into an array of objects
		const results = students.map((student) => ({
			roll: student.roll,
			name:student.studentName,
			subjective: parseInt(data[`subjective_${student.id}`], 10) || 0,
			objective: parseInt(data[`objective_${student.id}`], 10) || 0,
			practical: parseInt(data[`practical_${student.id}`], 10) || 0,
		}));

		console.log('Results Array:', results);
	};

	// Error Handling
	const validateMarks = (value) => {
		const marks = parseInt(value, 10);
		if (isNaN(marks) || marks < 0 || marks > 100) {
			return 'Marks must be between 0 and 100';
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
								</tr>
							</thead>
							<tbody>
								{students.map((student) => (
									<tr key={student.id}>
										<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
											{student.roll}
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{student.studentName}
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<Controller
												name={`subjective_${student.id}`}
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
																	? 'border-red-500'
																	: 'border-stroke'
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
												name={`objective_${student.id}`}
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
																	? 'border-red-500'
																	: 'border-stroke'
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
												name={`practical_${student.id}`}
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
																	? 'border-red-500'
																	: 'border-stroke'
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
