import { ShieldClose } from "lucide-react";
import { useEffect } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blockUser, getAllUsers, unBlockUser } from "../../state/authSlice";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const { users } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleBlock = (id, isBlocked) => {
    try {
      if (isBlocked) {
        dispatch(unBlockUser(id));
        toast.success("User unblocked successfully", {
          style: {
            border: "1px solid #ccc",
            padding: "16px",
          },
        });
      } else {
        dispatch(blockUser(id));
        toast.success("User blocked successfully", {
          style: {
            border: "1px solid #ccc",
            padding: "16px",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-10">
      <div>
        <h1 className="font-semibold text-2xl">Manage Users</h1>
        <p className="text-sm text-gray-500">total {users.length} customers</p>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="user-div w-full  flex justify-between items-center p-4 rounded-lg min-h-[100px] shadow-xl hover:shadow-2xl border"
          >
            <div className="flex gap-2">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-gray-300/40">
                <Avatar
                  src="https://i.pinimg.com/736x/b9/e0/e3/b9e0e30ac1ec95077b7e1d0abd250e5d.jpg"
                  name="A"
                  size="25"
                  round={true}
                />
              </div>
              <div className="relative">
                <p
                  // onClick={() => navigate(`/admin/users/${user.id}`)}
                  className="capitalize font-semibold hover:underline cursor-pointer"
                >
                  {user.username}
                </p>
                <p className="text-[13px] text-gray-600">{user.email}</p>
                <p className="text-[13px] text-gray-600">user Id: {user.id}</p>
                <p
                  className={`absolute top-0 -right-10 text-[10px] px-2 py-1 rounded-md  font-semibold  ${
                    user.role === "ADMIN"
                      ? "text-green-600 bg-green-300/20"
                      : "text-blue-600 bg-blue-300/20"
                  }`}
                >
                  {user.role}
                </p>
              </div>
            </div>
            <div
              onClick={() => handleBlock(user.id, user.blocked)}
              className="bg-red-400/30 px-2 py-1 rounded-md flex items-center cursor-pointer border border-red-600"
            >
              <ShieldClose className="h-4 text-red-600" />
              <p className="text-[12px] text-red-600">
                {user.blocked ? "unblock" : "block"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
