import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../state/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });
  const [error, setError] = useState({
    name: "",
    password: "",
    email: "",
  });

  console.log(input);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateError = validate();
    setError(validateError);
    if (Object.keys(validateError).length === 0) {
      try {
        const response = await dispatch(registerUser(input)).unwrap();
        console.log(response);
        toast.success("you are registered successfully", {
          position: "top-center",
          style: {
            fontSize: "12px",
            padding: "6px 12px",
            background: "white",
            color: "green",
            border: "1px solid green",
          },
          onClose: () => {
            navigate("/login");
          },
        });
      } catch (error) {
        console.log(error);
        toast.error(error, {
          position: "top-center",
          style: {
            fontSize: "12px",
            padding: "6px 12px",
          }
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
      role: "USER",
    });
  };

  const validate = () => {
    const error = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!input.username.trim()) {
      error.name = "name required";
    }
    if (!emailRegex.test(input.email)) {
      error.email = "incorrect email";
    }
    if (!input.password.trim()) {
      error.password = "password required";
    } else if (input.password.length < 8) {
      error.password = "password must be more than 8 charecter";
    }
    return error;
  };

  return (
    <div className="main-container flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="grid xl:grid-cols-2 border-2 rounded-2xl border-white/50 backdrop-blur-md bg-black/20 shadow-lg">
          <div className="flex flex-col justify-center items-center gap-2 w-[350px] xl:w-[400px] p-10 ">
            <h4 className="text-white text-2xl font-bold font-">Register</h4>
            <input
              className="inputStyle"
              type="text"
              placeholder="Enter your userName"
              onChange={handleChange}
              name="username"
              value={input.name}
            />
            {error.name && (
              <div className="error">
                <ExclamationTriangleIcon className="h-4 text-red-600" />{" "}
                <p>{error.name}</p>
              </div>
            )}
            <input
              className="inputStyle"
              type="text"
              placeholder="Enter your Email"
              onChange={handleChange}
              name="email"
              value={input.email}
            />
            {error.email && (
              <div className="error">
                <ExclamationTriangleIcon className="h-4 text-red-600" />{" "}
                <p>{error.email}</p>
              </div>
            )}
            <input
              className="inputStyle"
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
              value={input.password}
            ></input>
            {error.password && (
              <div className="error">
                <ExclamationTriangleIcon className="h-4 text-red-600" />{" "}
                <p>{error.password}</p>
              </div>
            )}
            <button className="rounded-[50px] bg-red-600 text-white w-full p-2 mt-5 font-semibold">
              Register
            </button>
            <p className="text-white text-xs">
              already have a account?{" "}
              <Link to={"/login"} className="underline hover:text-blue-500">
                Login Here..
              </Link>
            </p>
          </div>
          <div className="hidden side-image py-6 pr-6 h-[410px] w-[400px] overflow-hidden xl:block ">
            <img
              className="h-full  w-full  rounded-2xl object-cover"
              src="https://i.pinimg.com/736x/3b/e9/97/3be997cc699312fc4c54fbd0f3c44564.jpg"
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
