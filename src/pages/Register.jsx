import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

const Register = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    id: "",
    name: "",
    password: "",
    email: "",
    role: "",
  });
  const [error, setError] = useState({
    name: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/users");
      setData(response.data);
    };
    getData();
  }, [isSubmit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateError = validate();
    setError(validateError);
    if (Object.keys(validateError).length === 0) {
      try {
        const response = await api.get(`/users?email=${input.email}`);
        if (response.data.length > 0) {
          // alert("Email already exists");
          toast.error("Email already exists");
        } else {
          const response = await api.post("/users", input);
          console.log(response.data);
          // alert("you are registered successfully");
          toast.success('you are registered successfully',{
            onClose:()=>{
              navigate("/login");
            }
          })
          // navigate("/login");
          setIsSubmit(!isSubmit);
        }
        } catch (error) {
          console.log(error);
        }
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
      id: String(data.length + 1),
      role: "user",
      isBlocked: false,
    });
  };

  console.log(input);

  const validate = () => {
    const error = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!input.name.trim()) {
      error.name =  'name required';
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
              name="name"
              value={input.name}
            />
            {error.name &&<div className="error"><ExclamationTriangleIcon className="h-4 text-red-600" /> <p >{error.name}</p></div>}
            <input
              className="inputStyle"
              type="text"
              placeholder="Enter your Email"
              onChange={handleChange}
              name="email"
              value={input.email}
            />
            {error.email && <div className="error"><ExclamationTriangleIcon className="h-4 text-red-600" /> <p>{error.email}</p></div>}
            <input
              className="inputStyle"
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
              value={input.password}
            ></input>
            {error.password && <div className="error"><ExclamationTriangleIcon className="h-4 text-red-600" /> <p>{error.password}</p></div>}
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
            <img className="h-full  w-full  rounded-2xl object-cover" src="https://i.pinimg.com/736x/3b/e9/97/3be997cc699312fc4c54fbd0f3c44564.jpg" alt="" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
