import { Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DefaultLayout from "../layout/DefaultLayout";
import {
  AddResult,
  AddResultsBulk,
  AddStudents,
  AddStudentsBulk,
  AddUser,
  Home,
  ManageUsers,
  NotFound,
  Profile,
  ResultList,
  SignIn,
  StudentList,
  StudentResult,
  UserList,
} from "../pages";

import SignUp from "../pages/auth/SignUp";
import FailList from "../pages/FailList/FailList";
import MarkSheet from "../pages/MarkSheet/MarkSheet";
import MeritList from "../pages/MeritList/MeritList";
import GetResult from "../pages/results/GetResult/GetResult";
import Transcript from "../pages/results/transcript/Transcript";
import ResultSummary from "../pages/ResultSummary/ResultSummary";
import TabulationSheet from "../pages/TabulationSheet/TabulationSheet";
import PrivateRoute from "./PrivateRoute";
import SubjectEntry from "../pages/Reports/SubjectEntry";
import TeacherList from "../pages/Teachers/TeacherList";

const AppRoutes = () => {
  const { auth } = useAuth();
  const userType = auth.userType;

  // Common routes - between admin and teacher
  const commonAdminTeacherRoutes = [
    { path: "/add-student", element: <AddStudents /> },
    { path: "/subject-entry", element: <SubjectEntry /> },
    { path: "/add-student-bulk", element: <AddStudentsBulk /> },
    { path: "/student-list", element: <StudentList /> },
    { path: "/add-result", element: <AddResult /> },
    { path: "/add-result-bulk", element: <AddResultsBulk /> },
    { path: "/result-list", element: <ResultList /> },
    { path: "/tabulation-sheet", element: <TabulationSheet /> },
    { path: "/mark-sheet", element: <MarkSheet /> },
    { path: "/merit-list", element: <MeritList /> },
    { path: "/fail-list", element: <FailList /> },
    { path: "/result-summary", element: <ResultSummary /> },
    { path: "/teachers", element: <TeacherList /> },
  ];

  // Admin routes
  const adminOnlyRoutes = [
    { path: "/add-user", element: <AddUser /> },
    { path: "/user-list", element: <UserList /> },
    { path: "/manage-users", element: <ManageUsers /> },
  ];

  // render routes based on user type
  const renderAuthorizedRoutes = () => {
    switch (userType) {
      // userType: 'admin'
      case "superadmin":
        return (
          <>
            {commonAdminTeacherRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            {adminOnlyRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="/profile" element={<Profile />} />
          </>
        );

      // userType: 'teacher'
      case "classadmin":
        return (
          <>
            {commonAdminTeacherRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="/profile" element={<Profile />} />
          </>
        );

      // userType: 'student'
      case "student":
        return (
          <>
            <Route path="/result" element={<StudentResult />} />
            <Route path="/profile" element={<Profile />} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Routes>
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />

      <Route path="/get-result" element={<GetResult />} />
      <Route path="/get-result/transcript" element={<Transcript />} />

      <Route element={<PrivateRoute />}>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          {renderAuthorizedRoutes()}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
