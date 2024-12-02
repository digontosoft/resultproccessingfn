import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

const AddStudentsBulk = () => {
	const fileInputRef = useRef(null);
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm();

	// Create sample data for Excel template
	const handleDownloadTemplate = () => {
		const headers = [
			'firstName',
			'lastName',
			'studentId',
			'class',
			'section',
			'shift',
			'group',
			'religion',
			'dateOfBirth',
			'phoneNumber',
			'email',
			'address',
			'fatherName',
			'motherName',
		];
		const sampleData = [
			[
				'John,Doe,STD001,Class 1,Section A,Morning,Science,Islam,2000-01-01,1234567890,john@example.com,123 Street,Father Name,Mother Name',
			],
		];

		// Create a worksheet
		const worksheet = XLSX.utils.aoa_to_sheet([headers, ...sampleData]);

		// Create a workbook and append the worksheet
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

		// Write the workbook and trigger the download
		XLSX.writeFile(workbook, 'student_upload_template.xlsx');
	};

	const onSubmit = async (data) => {
		const file = data.excelFile[0];
		if (file) {
			console.log('Received file:', file);
			toast.success('File uploaded successfully');

			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	return (
		<div>
			<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
					<h3 className="font-medium text-black dark:text-white">
						Bulk Add Students
					</h3>
				</div>

				<div className="p-6.5">
					<div className="mb-8">
						<h4 className="mb-4 text-black dark:text-white">Instructions</h4>
						<ol className="list-decimal pl-6 space-y-2 text-black dark:text-white">
							<li>Download the Excel template using the button below</li>
							<li>
								Fill in the student information following the template format
							</li>
							<li>Upload the completed Excel file using the upload section</li>
						</ol>
					</div>

					<div className="mb-8">
						<button
							onClick={handleDownloadTemplate}
							className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
						>
							Download Template
						</button>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<label className="mb-3 block text-black dark:text-white">
								Upload Excel File
							</label>
							<input
								type="file"
								accept=".xlsx,.xls,.csv"
								ref={fileInputRef}
								{...register('excelFile', {
									required: 'Please select a file to upload',
								})}
								className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
							/>
							{errors.excelFile && (
								<span className="text-red-500 text-sm mt-1">
									{errors.excelFile.message}
								</span>
							)}
						</div>

						<button
							type="submit"
							className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
						>
							Upload Students
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddStudentsBulk;
