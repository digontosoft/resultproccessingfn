import TeacherTable from "./TeacherTable";

const TeachersTable = () => {
  return (
    <div className="w-full h-auto min-h-180 border rounded-md">
      <div className="p-4 border-b">
        <span className="text-2xl font-semibold leading-normal">
          Teacher List
        </span>
      </div>
      <TeacherTable />
    </div>
  );
};

export default TeachersTable;
