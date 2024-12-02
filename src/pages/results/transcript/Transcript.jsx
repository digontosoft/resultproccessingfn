import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { transcriptData } from './transcriptData'; // Using same data structure as before

// PDF Styles
const pdfStyles = StyleSheet.create({
	page: { padding: 30 },
	header: { textAlign: 'center', marginBottom: 20 },
	schoolName: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
	title: { fontSize: 16, marginBottom: 10 },
	table: { width: '100%', marginBottom: 20 },
	tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' },
	tableHeader: { backgroundColor: '#f3f4f6', padding: 5 },
	tableCell: { flex: 1, padding: 5 },
	signature: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 50,
	},
});

// PDF Document Component
const TranscriptPDF = () => (
	<Document>
		<Page size="A4" style={pdfStyles.page}>
			<View style={pdfStyles.header}>
				<Text style={pdfStyles.schoolName}>{transcriptData.school.name}</Text>
				<Text>{transcriptData.school.location}</Text>
				<Text style={pdfStyles.title}>ACADEMIC TRANSCRIPT</Text>
			</View>
			{/* Add more PDF content structure here */}
		</Page>
	</Document>
);

// Main Component
const Transcript = () => {
	return (
		<div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
			{/* Header Section */}
			<div className="mb-8 flex flex-col items-center">
				{/* <div className="flex justify-end mb-4">
					<button
						onClick={() => window.print()}
						className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 print:hidden"
					>
						Print
					</button>
					<PDFDownloadLink
						document={<TranscriptPDF />}
						fileName="academic-transcript.pdf"
						className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 print:hidden"
					>
						{({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
					</PDFDownloadLink>
				</div> */}
				<h1 className="text-2xl font-bold">{transcriptData.school.name}</h1>
				<p className="text-lg font-semibold">
					{transcriptData.school.location}
				</p>
				<img
					src="/public/vidyamoyee_logo.png"
					alt="school logo"
					width={80}
					height={80}
					className="grayscale"
				/>
				<h2 className="text-xl font-semibold border-[1px] border-black px-4 rounded-md">
					ACADEMIC TRANSCRIPT
				</h2>
				<p className="text-lg font-semibold">Pre-Test, 2024</p>
			</div>

			{/* Student Information */}
			<div className="">
				<div>
					<p>
						<span className="font-semibold">Student ID:</span>{' '}
						{transcriptData.student.id}
					</p>
					<p>
						<span className="font-semibold">Name:</span>{' '}
						{transcriptData.student.name}
					</p>
					<p>
						<span className="font-semibold">Father's Name:</span>{' '}
						{transcriptData.student.fatherName}
					</p>
					<p>
						<span className="font-semibold">Mother's Name:</span>{' '}
						{transcriptData.student.motherName}
					</p>
				</div>

				<div className="mt-4 flex justify-between">
					<p>
						<span className="font-semibold">Class:</span>{' '}
						{transcriptData.student.class}
					</p>
					<p>
						<span className="font-semibold">Section:</span>{' '}
						{transcriptData.student.section}
					</p>

					<p>
						<span className="font-semibold">Group:</span>{' '}
						{transcriptData.student.group}
					</p>
					<p>
						<span className="font-semibold">Roll:</span>{' '}
						{transcriptData.student.roll}
					</p>
					<p>
						<span className="font-semibold">Merit:</span>{' '}
						{transcriptData.student.merit}
					</p>
					<p>
						<span className="font-semibold">Type:</span>{' '}
						{transcriptData.student.studentType}
					</p>
					<p>
						<span className="font-semibold">
							4<sup>th</sup> Subject:
						</span>{' '}
						{transcriptData.student.fourthSubject}
					</p>
				</div>
			</div>

			{/* Grade Scale */}
			<div className="mb-6 absolute top-5 right-2">
				<div className="overflow-x-auto">
					<table className="min-w-full border">
						<thead>
							<tr className="">
								<th className="border px-4">Grade</th>
								<th className="border px-4">Marks</th>
								<th className="border px-4">GP</th>
							</tr>
						</thead>
						<tbody>
							{transcriptData.gradeScale.map((grade, index) => (
								<tr key={index}>
									<td className="border px-4 text-center">{grade.grade}</td>
									<td className="border px-4 text-center">{grade.marks}</td>
									<td className="border px-4 text-center">{grade.gp}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Results Table */}
			<div className="mb-6 overflow-x-auto">
				<table className="min-w-full border">
					<thead>
						<tr className="bg-gray-100">
							<th className="border px-4 py-2">Subjects</th>
							<th className="border px-4 py-2">Full Marks</th>
							<th className="border px-4 py-2">Subjective</th>
							<th className="border px-4 py-2">Objective</th>
							<th className="border px-4 py-2">Practical</th>
							<th className="border px-4 py-2">Total</th>
							<th className="border px-4 py-2">LG</th>
							<th className="border px-4 py-2">GP</th>
							<th className="border px-4 py-2">Highest</th>
						</tr>
					</thead>
					<tbody>
						{transcriptData.results.map((result, index) => (
							<tr key={index}>
								<td className="border px-4 py-2">{result.subject}</td>
								<td className="border px-4 py-2 text-center">
									{result.fullMarks}
								</td>
								<td className="border px-4 py-2 text-center">
									{result.subjective}
								</td>
								<td className="border px-4 py-2 text-center">
									{result.objective}
								</td>
								<td className="border px-4 py-2 text-center">
									{result.practical}
								</td>
								<td className="border px-4 py-2 text-center">{result.total}</td>
								<td className="border px-4 py-2 text-center">{result.lg}</td>
								<td className="border px-4 py-2 text-center">{result.gp}</td>
								<td className="border px-4 py-2 text-center">
									{result.highest}
								</td>
							</tr>
						))}

						{/* Totla marks row */}
						<tr>
							<td className="border px-4 py-2 font-semibold text-right ">
								Total Marks:
							</td>
							<td className="border px-4 py-2 text-center">
								{transcriptData.summary.totalMarks}
							</td>
							<td className="border px-4 py-2 text-center"></td>
							<td className="border px-4 py-2 text-center"></td>
							<td className="border px-4 py-2 text-center"></td>
							<td className="border px-4 py-2 text-center">
								{transcriptData.summary.obtainedMarks}
							</td>
							<td className="border px-4 py-2 text-center"></td>
							<td className="border px-4 py-2 text-center"></td>
							<td className="border px-4 py-2 text-center"></td>
						</tr>

						{/* Working days row */}
						<tr>
							<td className="border px-4 py-2 font-semibold text-right ">
								Working days:
							</td>
							<td className="border px-4 py-2 text-center">
								{/* Working days count here */}
							</td>
							<td className="border px-4 py-2 font-semibold text-right">
								Present:
							</td>
							<td className="border px-4 py-2 text-center"></td>
							<td className="border px-4 py-2 font-semibold text-right ">
								{/* Present count here */}
							</td>
							<td className="border px-4 py-2 text-center">Max. Present:</td>
							<td className="border px-4 py-2 text-center">
								{/* Max. Present count here */}
							</td>
							<td className="border px-4 py-2 text-center"></td>
							<td className="border px-4 py-2 text-center"></td>
						</tr>

						{/* summary of results */}
						<tr>
							<td className="border px-4 py-2 font-semibold text-right ">
								No. of Students:
							</td>
							<td className="border px-4 py-2 text-center">
								{transcriptData.summary.studentsCount}
							</td>
							<td className="border px-4 py-2 font-semibold text-right">
								GPA Without 4th:
							</td>
							<td className="border px-4 py-2 text-center">
								{transcriptData.summary.gpaWithout4th}
							</td>
							<td className="border px-4 py-2 font-semibold text-right">
								GPA:
							</td>
							<td className="border px-4 py-2 text-center">
								{transcriptData.summary.gpa}
							</td>
							<td className="border py-2 font-semibold text-right">Remark:</td>
							<td>Good</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Signatures */}
			<div className="grid grid-cols-3 gap-4 mt-16 pt-8">
				<div className="text-center">
					<div className="border-t border-black mx-8 pt-2">
						Guardian's Signature
					</div>
				</div>
				<div className="text-center">
					<div className="border-t border-black mx-8 pt-2">
						Class Teacher's Signature
					</div>
				</div>
				<div className="text-center">
					<div className="border-t border-black mx-8 pt-2">
						Headmaster's Signature
					</div>
				</div>
			</div>

			{/* Print Date */}
			<div className="text-sm text-gray-500 mt-8">
				Printing Date & Time: 18 August, 2024 09:18:25 AM
			</div>
		</div>
	);
};

export default Transcript;
