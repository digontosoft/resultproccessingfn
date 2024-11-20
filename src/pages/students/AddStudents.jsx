import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';

const AddStudents = () => {
	const { gurdedApi } = useAxios();
	const [configs, setConfigs] = useState([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		const fetchConfigs = async () => {
			try {
				const response = await gurdedApi.get('/configs');

				if (response.status === 200) {
					setConfigs(response.data);
				}
			} catch (error) {
				console.error(error.response.data.message);
				toast.error(`Error: ${error.response.data.message}`);
			}
		};

		fetchConfigs();
	}, [gurdedApi]);

	const onSubmit = async (data) => {
		// console.log(data);

		try {
			const response = await gurdedApi.post('/addStudentData', { ...data });
			console.log({ response });

			if (response.status === 200) {
				toast.success('Student added successfully');
				reset();
			}
		} catch (error) {
			console.error(error.response.data.message);
			toast.error(`Error: ${error.response.data.message}`);
		}
	};

	// dropdown option
	const dropdownOptions = {
		// class: Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`),
		// section: ['Section A', 'Section B'],
		// shift: ['Morning', 'Day'],
		// group: ['Science', 'Commerce', 'Humanities'],
		// religion: ['Islam', 'Hinduism', 'Buddhism', 'Christianity', 'Others'],
		class: configs.filter((config) => config.slug === 'Class'),
		section: configs.filter((config) => config.slug === 'Section'),
		shift: configs.filter((config) => config.slug === 'shift'),
		group: configs.filter((config) => config.slug === 'group'),
		religion: configs.filter((config) => config.slug === 'religion'),
	};

	// Reusable input field component
	const InputField = ({ label, name, type = 'text', placeholder }) => (
		<div>
			<label className="mb-3 block text-black dark:text-white">{label}</label>
			<input
				type={type}
				placeholder={placeholder}
				{...register(name, { required: `${label} is required` })}
				className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
			/>
			{errors[name] && (
				<span className="text-red-500 text-sm mt-1">
					{errors[name].message}
				</span>
			)}
		</div>
	);

	// Reusable select field component
	const SelectField = ({ label, name, options }) => (
		<div>
			<label className="mb-3 block text-black dark:text-white">{label}</label>
			<select
				{...register(name, { required: `${label} is required` })}
				className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
			>
				<option value="">Select {label}</option>
				{options.map((option) => (
					<option key={option.key} value={option.value}>
						{option.key}
					</option>
				))}
			</select>
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
						Add Student
					</h3>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-5.5 p-6.5"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5.5">
						{/* Input fields with two per row */}
						<InputField
							label="First Name"
							name="firstName"
							placeholder="Enter First Name"
						/>
						<InputField
							label="Last Name"
							name="lastName"
							placeholder="Enter Last Name"
						/>
						<InputField
							label="Student ID"
							name="studentId"
							placeholder="Enter Student ID"
						/>
						<SelectField
							label="Class"
							name="class"
							options={dropdownOptions.class}
						/>
						<SelectField
							label="Section"
							name="section"
							options={dropdownOptions.section}
						/>
						<SelectField
							label="Shift"
							name="shift"
							options={dropdownOptions.shift}
						/>
						<SelectField
							label="Group"
							name="group"
							options={dropdownOptions.group}
						/>
						<SelectField
							label="Religion"
							name="religion"
							options={dropdownOptions.religion}
						/>
						<InputField label="Date of Birth" name="dateOfBirth" type="date" />
						<InputField
							label="Phone Number"
							name="phoneNumber"
							placeholder="Enter Phone Number"
						/>
						<InputField
							label="Email"
							name="email"
							type="email"
							placeholder="Enter Email"
						/>

						<InputField
							label="Address"
							name="address"
							placeholder="Enter Address"
						/>

						{/* Additional fields after the main grid */}
						<InputField
							label="Father's Name"
							name="fatherName"
							placeholder="Enter Father's Name"
						/>
						<InputField
							label="Mother's Name"
							name="motherName"
							placeholder="Enter Mother's Name"
						/>
					</div>

					<button className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddStudents;
