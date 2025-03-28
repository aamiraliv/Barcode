import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  // const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (loggeduser) {
  //     dispatch(getUserDetails(loggeduser));
  //   }
  // }, [dispatch, loggeduser]);

  // if (userDetailsLoding) {
  //   return <div>Loading...</div>;
  // }

  // console.log(userDetails);
  // console.log(loggeduser);

  // if (!userDetails || userDetails.role?.toUpperCase() !== "ADMIN") {
  //   return <Navigate to="/unauthorized" replace={true} />;
  // }
  console.log(isAdmin);

  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace={true} />;
};

export default AdminProtectedRoute;
