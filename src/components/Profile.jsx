import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/MainProvider";
import { useContext } from "react";
import man from "../assets/man.jpeg";

const Profile = () => {
  const { currUser, logOut } = useContext(AuthProvider);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <div className="bg-purple-900 h-[50px] flex items-center justify-between px-1 text-white font-semibold">
      <div className="flex items-center gap-1">
        {currUser?.photoURL && (
          <img
            // src={currUser?.photoURL}
            src={man}
            alt="Profile Picture"
            className="h-[30px] w-[30px] rounded-full object-cover"
          />
        )}
        <span>{currUser?.displayName}</span>
      </div>
      <button
        className="border bg-white px-1 cursor-pointer text-black hover:bg-gray-300"
        onClick={handleLogOut}
      >
        log out
      </button>
    </div>
  );
};

export default Profile;
