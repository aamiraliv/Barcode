import { useEffect } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../state/authSlice";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const { loggeduser, userDetails } = useSelector((state) => state.auth);
  useEffect(() => {
    if (loggeduser) {
      dispatch(getUserDetails(loggeduser));
    }
  }, [dispatch, loggeduser]);


  console.log(userDetails)


  return (
    <div className={`flex items-center justify-end  w-full py-3 px-4 gap-2 `}>
      <p className="text-sm">{userDetails?.username}</p>
      <Avatar
        src="https://i.pinimg.com/736x/b9/e0/e3/b9e0e30ac1ec95077b7e1d0abd250e5d.jpg"
        name="A"
        size="25"
        round={true}
      />
    </div>
  );
};

export default AdminNavbar;
