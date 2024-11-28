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
			<div className="text-center mb-8">
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
				<h1 className="text-2xl font-bold mb-2">
					{transcriptData.school.name}
				</h1>
				<p className="text-lg mb-2">{transcriptData.school.location}</p>
				<h2 className="text-xl font-semibold">ACADEMIC TRANSCRIPT</h2>
				<p className="text-lg">Pre-Test, 2024</p>
			</div>

			{/* Student Information */}
			<div className="grid grid-cols-2 gap-4 mb-6">
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
				<div>
					<p className="flex justify-between">
						<span>
							<span className="font-semibold">Class:</span>{' '}
							{transcriptData.student.class}
						</span>
						<span>
							<span className="font-semibold">Section:</span>{' '}
							{transcriptData.student.section}
						</span>
					</p>
					<p className="flex justify-between">
						<span>
							<span className="font-semibold">Group:</span>{' '}
							{transcriptData.student.group}
						</span>
						<span>
							<span className="font-semibold">Roll:</span>{' '}
							{transcriptData.student.roll}
						</span>
					</p>
				</div>
			</div>

			{/* Grade Scale */}
			<div className="mb-6 absolute top-0 right-0">
				<div className="overflow-x-auto">
					<table className="min-w-full border">
						<thead>
							<tr className="bg-gray-100">
								<th className="border px-4 py-2">Grade</th>
								<th className="border px-4 py-2">Marks</th>
								<th className="border px-4 py-2">GP</th>
							</tr>
						</thead>
						<tbody>
							{transcriptData.gradeScale.map((grade, index) => (
								<tr key={index}>
									<td className="border px-4 py-2 text-center">
										{grade.grade}
									</td>
									<td className="border px-4 py-2 text-center">
										{grade.marks}
									</td>
									<td className="border px-4 py-2 text-center">{grade.gp}</td>
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
					</tbody>
				</table>
			</div>

			{/* Summary */}
			<div className="grid grid-cols-3 gap-4 mb-6">
				<div>
					<p>
						<span className="font-semibold">Total Marks:</span>{' '}
						{transcriptData.summary.totalMarks}
					</p>
					<p>
						<span className="font-semibold">Obtained:</span>{' '}
						{transcriptData.summary.obtainedMarks}
					</p>
				</div>
				<div>
					<p>
						<span className="font-semibold">GPA (Without 4th):</span>{' '}
						{transcriptData.summary.gpaWithout4th}
					</p>
					<p>
						<span className="font-semibold">GPA:</span>{' '}
						{transcriptData.summary.gpa}
					</p>
				</div>
				<div>
					<p>
						<span className="font-semibold">Remark:</span>{' '}
						{transcriptData.summary.remark}
					</p>
					<p>
						<span className="font-semibold">Students:</span>{' '}
						{transcriptData.summary.studentsCount}
					</p>
				</div>
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
