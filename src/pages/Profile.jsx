import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <div className="max-w-full flex justify-center items-center mx-auto max-h-180 rounded-lg p-6 py-20">
      <div className=" w-180 flex flex-col gap-10 justify-center items-center border-[1px] border-gray-600 p-10 shadow-lg shadow-gray-300 rounded-br-3xl rounded-tl-3xl bg-gradient-to-tr from-cyan-50 to-gray-100">
        <div className="flex-col flex gap-6 justify-center items-center">
          <img
            className="w-40 h-40 flex  rounded-tl-3xl rounded-br-3xl border-4 border-cyan-600 bg-gray-2"
            src="https://res.cloudinary.com/dt3qrt76n/image/upload/v1733937131/samples/21852_mqyrfh.jpg"
            alt=""
          />
          <p className="font-semibold text-xl">Name: {auth?.name}</p>
        </div>
        <div className="flex  px-24 w-full  h-full ">
          <div className="flex-1 pt-6 flex-col flex justify-between">
            <p className="text-2xl font-semibold underline ">My Profile</p>
            <p className=" font-normal ">
              User Type: <span className="font-normal">{auth?.userType}</span>
            </p>
          </div>
          <div className="flex-1 pt-6 border-l-[1px] border-gray-400 pl-4">
            <p>+880 130185****</p>
            <p>{auth.email}</p>
            <p>designation: Asst.Teacher</p>
            <p>subject: Bangla</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
