import { toast } from "react-toastify";
// import { toast } from "react-hot-toast";
import "../styles/Login.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser } from "../state/authSlice";

// const Login = () => {
//   const navigate = useNavigate();
//   const [detail, setDetail] = useState({
//     name: "",
//     password: "",
//   });

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setDetail({ ...detail, [name]: value });
//   };
//   console.log(detail);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!detail.name || !detail.password) {
//       // alert("Please fill in all fields");
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try {
//       const Response = await api.get("/auth/login");
//       const data = Response.data;
//       const user = data.find(
//         (user) =>
//           detail.name === user.email && user.password === detail.password
//       );
//       if (!user) {
//         toast.error("Invalid credentials");
//         return;
//       }
//       if (user.isBlocked === true) {
//         toast.error("You are blocked");
//       } else if (user) {
//         if (user.role === "admin") {
//           localStorage.setItem("user", JSON.stringify(user));
//           toast.success("Welcome Admin!", {
//             onClose: () => {
//               navigate("/admin", { replace: true });
//               window.location.reload();
//               // window.location.href = "/admin";
//             },
//           });
//         } else {
//           localStorage.setItem("user", JSON.stringify(user));
//           toast.success("logged in successfully", {
//             onClose: () => {
//               navigate("/", { replace: true });
//               window.location.reload();
//             },
//           });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="main-container flex justify-center items-center">
//       <form onSubmit={handleSubmit}>
//         <div className="grid xl:grid-cols-2 border-2 rounded-2xl border-white/50 backdrop-blur-md bg-black/20 shadow-lg">
//           <div className="flex flex-col justify-center items-center gap-5 w-[350px] xl:w-[400px] p-10 ">
//             <h4 className="text-white text-2xl font-bold font-">login</h4>
//             <input
//               className="inputStyle"
//               type="text"
//               placeholder="Email"
//               onChange={handleInput}
//               value={detail.name}
//               name="name"
//             />
//             <input
//               className="inputStyle"
//               type="password"
//               placeholder="password"
//               onChange={handleInput}
//               value={detail.password}
//               name="password"
//             ></input>
//             <button className="rounded-[50px] bg-red-600 text-white w-full p-2 mt-5 font-semibold">
//               Login
//             </button>
//             <p className="text-white text-xs">
//               don&apos;t have a account?{" "}
//               <Link to={"/register"} className="underline hover:text-blue-500">
//                 Register Here..
//               </Link>
//             </p>
//           </div>
//           <div className="side-image py-6 pr-6 h-[410px] hidden w-[400px] overflow-hidden xl:block">
//             <img
//               className="h-full  w-full  rounded-2xl object-cover "
//               src="https://i.pinimg.com/736x/ff/fc/97/fffc97effccca652c56e08a6bdb53959.jpg"
//               alt=""
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };
  console.log(detail);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!detail.email || !detail.password) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        style: {
          fontSize: "12px",
          padding: "6px 12px",
          background: "white",
          color: "red",
        },
      });
      return;
    }
    try {
      const response = await dispatch(loginUser(detail));
      console.log("redux response: ", response);

      if (response.type === "auth/login/rejected") {
        throw new Error(response.payload);
      }

      console.log(response);
      try {
        const response = await dispatch(getCurrentUser());
        console.log("redux response for current user: ", response);
      } catch (error) {
        console.log("Error fetching current user: ", error);
      }
      toast.success("logged in successfully", {
        position: "top-center",
        style: {
          fontSize: "12px",
          padding: "6px 12px",
          background: "white",
          color: "green",
          border: "1px solid green",
        },
        onClose: () => {
          navigate("/", { replace: true });
          window.location.reload();
        },
      });
    } catch (error) {
      console.log("API Error Response:", error);

      toast.error(error.message);
    }
  };

  return (
    <div className="main-container flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="grid xl:grid-cols-2 border-2 rounded-2xl border-white/50 backdrop-blur-md bg-black/20 shadow-lg">
          <div className="flex flex-col justify-center items-center gap-5 w-[350px] xl:w-[400px] p-10 ">
            <h4 className="text-white text-2xl font-bold font-">login</h4>
            <input
              className="inputStyle"
              type="text"
              placeholder="Email"
              onChange={handleInput}
              value={detail.name}
              name="email"
            />
            <input
              className="inputStyle"
              type="password"
              placeholder="password"
              onChange={handleInput}
              value={detail.password}
              name="password"
            ></input>
            <button className="rounded-[50px] bg-red-600 text-white w-full p-2 mt-5 font-semibold">
              Login
            </button>
            <p className="text-white text-xs">
              don&apos;t have a account?{" "}
              <Link to={"/register"} className="underline hover:text-blue-500">
                Register Here..
              </Link>
            </p>
          </div>
          <div className="side-image py-6 pr-6 h-[410px] hidden w-[400px] overflow-hidden xl:block">
            <img
              className="h-full  w-full  rounded-2xl object-cover "
              src="https://i.pinimg.com/736x/ff/fc/97/fffc97effccca652c56e08a6bdb53959.jpg"
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
