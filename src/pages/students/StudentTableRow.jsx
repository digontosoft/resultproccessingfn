const StudentTableRow = ({ student, onView, onEdit, onDelete }) => {
  console.log("student:", student);
  const classes = "p-4 border-b border-blue-gray-50";
  return (
    <tr>
      <td className={classes}>
        <p className="text-black dark:text-white">{student?.studentId}</p>
      </td>
      <td className={classes}>
        <p className="text-black dark:text-white">{student?.class}</p>
      </td>
      <td className={classes}>
        <p className="text-black dark:text-white">{student?.shift}</p>
      </td>
      <td className={classes}>
        <p className="text-black dark:text-white">{student?.group}</p>
      </td>
      <td className={classes}>
        <p className="text-black dark:text-white">{student?.section}</p>
      </td>
      <td className={classes}>
        <p className="text-black dark:text-white">{student?.roll}</p>
      </td>
      <td className={classes}>
        <h5 className="font-medium text-black dark:text-white">
          {student?.studentName}
        </h5>
      </td>
      <td className={classes}>
        <p className="text-black dark:text-white">{student?.fatherName}</p>
      </td>
      <td className={classes}>
        <p className="text-black dark:text-white">{student?.motherName}</p>
      </td>
      <td className={classes}>
        <p className="text-black dark:text-white">{student?.gender}</p>
      </td>
      <td className={classes}>
        <p className="text-black dark:text-white">{student?.religion}</p>
      </td>
      <td className={classes}>
        <p className="text-black dark:text-white">{student?.mobile}</p>
      </td>
      <td className={classes}>
        <div className="flex gap-3">
          <button
            className="hover:text-primary"
            onClick={() => onView(student)}
          >
            <img src="/view.svg" alt="view icon" className="h-5 w-5" />
          </button>
          <button
            className="hover:text-primary"
            onClick={() => onEdit(student)}
          >
            <img src="/edit.svg" alt="edit icon" className="h-5 w-5" />
          </button>
          <button
            className="hover:text-primary"
            onClick={() => onDelete(student)}
          >
            <img src="/delete.svg" alt="delete icon" className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentTableRow;
