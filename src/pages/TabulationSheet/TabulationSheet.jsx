const students = [
  {
    roll: 1,
    name: "ANHAF ZAHIN",
    bengali1: { cre: 27, mcq: 26, total: 53, gp: "5.00" },
    bengali2: { cre: 25, mcq: 27, total: 52, gp: "5.00" },
    english1: { cre: 78, mcq: 0, total: 78, gp: "4.00" },
    english2: { cre: 89, mcq: 0, total: 89, gp: "5.00" },
    mathematics: { total: 98, gp: "5.00" },
    islam: { total: 95, gp: "5.00" },
    hinduReligion: { total: 89, gp: "5.00" },
    physics: { total: 44, gp: "5.00" },
    chemistry: { total: 44, gp: "5.00" },
    biology: { total: 44, gp: "5.00" },
    bangladeshStudies: { total: 44, gp: "5.00" },
    ict: { total: 44, gp: "5.00" },
    totalMarks: 992,
    gpa: "5.00",
    merit: 7,
  },
  {
    roll: 2,
    name: "RAEEMA RAZ",
    bengali1: { cre: 30, mcq: 25, total: 55, gp: "5.00" },
    bengali2: { cre: 30, mcq: 25, total: 55, gp: "5.00" },
    english1: { cre: 82, mcq: 0, total: 82, gp: "5.00" },
    english2: { cre: 82, mcq: 0, total: 82, gp: "5.00" },
    mathematics: { total: 92, gp: "5.00" },
    islam: { total: 98, gp: "5.00" },
    hinduReligion: { total: 95, gp: "5.00" },
    physics: { total: 45, gp: "5.00" },
    chemistry: { total: 45, gp: "5.00" },
    biology: { total: 44, gp: "5.00" },
    bangladeshStudies: { total: 44, gp: "5.00" },
    ict: { total: 44, gp: "5.00" },
    totalMarks: 985,
    gpa: "5.00",
    merit: 9,
  },
  {
    roll: 3,
    name: "NISTHYA HAMID SADIA",
    bengali1: { cre: 30, mcq: 28, total: 58, gp: "5.00" },
    bengali2: { cre: 28, mcq: 28, total: 56, gp: "5.00" },
    english1: { cre: 88, mcq: 0, total: 88, gp: "5.00" },
    english2: { cre: 82, mcq: 0, total: 82, gp: "5.00" },
    mathematics: { total: 94, gp: "5.00" },
    islam: { total: 100, gp: "5.00" },
    hinduReligion: { total: 87, gp: "5.00" },
    physics: { total: 45, gp: "5.00" },
    chemistry: { total: 45, gp: "5.00" },
    biology: { total: 45, gp: "5.00" },
    bangladeshStudies: { total: 44, gp: "5.00" },
    ict: { total: 44, gp: "5.00" },
    totalMarks: 994,
    gpa: "5.00",
    merit: 5,
  },
  // Add additional students in the same format
];
const table_head = [
  "Roll",
  "Student Name",
  "Bengali 1st Paper",
  "Bengali 2nd Paper",
  "Total",
  "English 1st Paper",
  "English 2nd Paper",
  "Total",
  "Mathematics",
  "Islam and Moral Education",
  "Hindu Religion and Moral Education",
  "Higher Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Bangladesh & Global Studies",
  "Information & Communication Technology",
  "Total Marks & GPA",
  "Merit",
];

const subheaders = [
  ["", ""],
  ["", ""],
  ["CRE", "MCQ"],
  ["CRE", "MCQ"],
  ["CRE + MCQ", "Grade"],
  ["Marks", "Grade"],
  ["Marks", "Grade"],
  ["CRE + MCQ", "Grade"],
  ["Marks", "Grade"],
  ["Marks", "Grade"],
  ["Marks", "Grade"],
  ["Marks", "Grade"],
  ["Marks", "Grade"],
  ["Marks", "Grade"],
  ["Marks", "Grade"],
  ["Marks", "Grade"],
  ["Marks", "Grade"],
  ["Total", "GPA"],
  ["Rank", "Position"],
];

const data = [
  { title: "Session", value: "2024" },
  { title: "Examination", value: "Test" },
  { title: "Shift", value: "Morning" },
  { title: "Class", value: "X" },
  { title: "Section", value: "A" },
  { title: "Group", value: "Science" },
];
import Logo from "../../assets/school-logo.png";
const TabulationSheet = () => {
  return (
    <div>
      <section className="flex justify-between items-center space-y-10">
        <div>
          <img
            src={Logo}
            alt="viddamoty school logo"
            className="h-32 w-32 object-cover"
          />
        </div>
        <div className="grid justify-items-center gap-4">
          <h1 className="text-2xl font-bold">
            Vidyamayee Govt. Girls High School
          </h1>
          <p className="text-lg font-bold">Sadar, Mymensingh</p>
          <p className="border border-gray-400 rounded-md p-2 text-lg font-semibold text-center uppercase">
            Tabulation Sheet
          </p>
        </div>
        <div className="h-60">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="px-4 py-2 border border-gray-300 text-start text-sm">
                    {row.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-start text-sm">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="overflow-x-auto">
        {/* Table */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          {/* Header */}
          <thead className="text-xs">
            <tr>
              <th
                rowSpan={2}
                className="border border-gray-300 px-2 py-1 text-center"
              >
                Roll
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-2 py-1 text-center"
              >
                Student Name
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Bengali 1st Paper
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Bengali 2nd Paper
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Total
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                English 1st Paper
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                English 2nd Paper
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Total
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Mathemetics
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Islam and Moral Education
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Hindu Religion and Moral Education
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Higher Mathemetics
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Physics
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Chemistry
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Biology
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Bangladesh And Global Studies
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Information And Communication Technology
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                rowSpan={2}
              >
                Total Marks & GPA
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                rowSpan={2}
              >
                Merit
              </th>
              {/* Additional headers... */}
            </tr>
            <tr>
              {/* Sub-headers for Bengali 1st Paper */}
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
            </tr>
          </thead>
          {/* Body */}
          <tbody className="text-xs">
            <tr>
              <td className="border border-gray-300 px-2 py-1 text-center">
                1
              </td>
              <td className="px-2 py-1 space-y-1 block w-40 h-auto">
                <p>Ahnaf Zahin</p>
                <p>Student ID: 231702</p>
                <p>Shift: Morning</p>
                <p>Section: A</p>
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                27
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                25
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                52
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                1
              </td>
              <td className="border border-gray-300 px-2 py-1">Ahnaf Zahin</td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                27
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                25
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                52
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                25
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                52
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                25
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                52
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              {/* Add other subjects and data here */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabulationSheet;
