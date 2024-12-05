import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../api';

const shifts = ['morning', 'day'];
const currentYear = new Date().getFullYear();
const sessions = [currentYear, currentYear - 1, currentYear - 2];
const terms = ['Final', 'Half Yearly'];

const SUBJECTS = {
	JUNIOR: [
		'Bangla',
		'English',
		'Mathematics',
		'Science',
		'Bangladesh and Global Studies',
		'Islam and moral education',
	],
	COMMON_9_10: [
		'Bangla 1st',
		'Bangla 2nd',
		'English 1st',
		'English 2nd',
		'Mathematics',
		'Islam and moral education',
		'Bangladesh and Global studies',
		'Information and communication technology',
	],
	SCIENCE: ['Physics', 'Chemistry', 'Biology', 'Higher Mathematics'],
	ARTS: [
		'Geography',
		'Civic & Citizenship',
		'Economics',
		'General Science',
		'History of Bangladesh',
		'Agriculture studies',
	],
	COMMERCE: [
		'Finance and banking',
		'Accounting',
		'Business Ent.',
		'General Science',
		'Agriculture studies',
	],
};

const AddResult = () => {
	const [selectedClass, setSelectedClass] = useState('');
	const [selectedGroup, setSelectedGroup] = useState('');

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			section: '',
			shift: '',
			session: '',
			term: '',
			roll: '',
			class: '',
			group: '',
		},
	});

	const handleClassChange = (value) => {
		setSelectedClass(value);
		setSelectedGroup('');
		reset({
			...control._defaultValues,
			class: value,
		});
	};

	const handleGroupChange = (value) => {
		setSelectedGroup(value);
		reset({
			...control._defaultValues,
			group: value,
		});
	};

	const getSubjects = () => {
		if (['4', '5'].includes(selectedClass)) {
			return SUBJECTS.JUNIOR;
		}
		if (['9', '10'].includes(selectedClass)) {
			const commonSubjects = SUBJECTS.COMMON_9_10;
			if (selectedGroup === 'science') {
				return [...commonSubjects, ...SUBJECTS.SCIENCE];
			}
			if (selectedGroup === 'arts') {
				return [...commonSubjects, ...SUBJECTS.ARTS];
			}
			if (selectedGroup === 'commerce') {
				return [...commonSubjects, ...SUBJECTS.COMMERCE];
			}
		}
		return [];
	};

	const onSubmit = async (data) => {
		console.log('Form submitted:', data);
		try {
			const response = await api.post('/result/create', data);
			if (response.status === 201) {
				toast.success('Result uploaded');
				// Reset all form fields including subjects
				setSelectedClass('');
				setSelectedGroup('');
				reset({
					section: '',
					shift: '',
					session: '',
					term: '',
					roll: '',
					class: '',
					group: '',
					subjects: {},
				});
			} else {
				throw new Error('Result Upload failed');
			}
		} catch (error) {
			toast.error('Failed to upload results: ' + error.message);
		}
	};

	const FormSelect = ({ label, name, options, onChange }) => (
		<div className="mb-4.5">
			<label className="mb-3 block text-black dark:text-white">{label}</label>
			<Controller
				name={name}
				control={control}
				rules={{ required: 'This field is required' }}
				render={({ field }) => (
					<select
						{...field}
						onChange={(e) => {
							field.onChange(e);
							if (onChange) onChange(e.target.value);
						}}
						className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					>
						<option value="" disabled>
							Select {label}
						</option>
						{Array.isArray(options)
							? options.map((option) => (
									<option
										key={typeof option === 'object' ? option.value : option}
										value={typeof option === 'object' ? option.value : option}
									>
										{typeof option === 'object' ? option.label : option}
									</option>
							  ))
							: null}
					</select>
				)}
			/>
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
						Add Student Result
					</h3>
				</div>

				<div className="p-6.5">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormSelect
								label="Select Class"
								name="class"
								onChange={handleClassChange}
								options={[
									{ value: '4', label: 'Class 4' },
									{ value: '5', label: 'Class 5' },
									{ value: '9', label: 'Class 9' },
									{ value: '10', label: 'Class 10' },
								]}
							/>

							{['9', '10'].includes(selectedClass) && (
								<FormSelect
									label="Select Group"
									name="group"
									onChange={handleGroupChange}
									options={[
										{ value: 'science', label: 'Science' },
										{ value: 'arts', label: 'Arts' },
										{ value: 'commerce', label: 'Commerce' },
									]}
								/>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<FormSelect label="Section" name="section" options={['A', 'B']} />
							<FormSelect label="Shift" name="shift" options={shifts} />
							<FormSelect label="Session" name="session" options={sessions} />
							<FormSelect label="Term" name="term" options={terms} />

							<div className="">
								<label className="mb-3 block text-black dark:text-white">
									Roll
								</label>
								<Controller
									name="roll"
									control={control}
									rules={{ required: 'Roll number is required' }}
									render={({ field }) => (
										<input
											{...field}
											type="number"
											min="0"
											className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
										/>
									)}
								/>
								{errors.roll && (
									<span className="text-red-500 text-sm mt-1">
										{errors.roll.message}
									</span>
								)}
							</div>
						</div>

						{selectedClass &&
							(selectedGroup || ['4', '5'].includes(selectedClass)) && (
								<div className="mt-4 space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{getSubjects().map((subject) => (
											<div key={subject} className="mb-4.5">
												<label className="mb-3 block text-black dark:text-white">
													{subject}
												</label>
												<Controller
													name={`subjects.${subject}`}
													control={control}
													rules={{
														required: 'This field is required',
														min: {
															value: 0,
															message: 'Number cannot be negative',
														},
													}}
													render={({ field }) => (
														<input
															{...field}
															type="number"
															min="0"
															className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
														/>
													)}
												/>
												{errors.subjects?.[subject] && (
													<span className="text-red-500 text-sm mt-1">
														{errors.subjects[subject].message}
													</span>
												)}
											</div>
										))}
									</div>

									<button
										type="submit"
										className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
									>
										Submit Result
									</button>
								</div>
							)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddResult;
