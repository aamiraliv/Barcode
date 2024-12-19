import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    name: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };
  console.log(detail);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!detail.name || !detail.password) {
      // alert("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const Response = await api.get("/users");
      const data = Response.data;
      const user = data.find(
        (user) =>
          (detail.name === user.email || user.name === detail.name) &&
          user.password === detail.password
      );
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        // alert("login successful");
        toast.success("logged in successfully", {
          onClose: () => {
            navigate("/", { replace: true });
            window.location.reload();
          },
        });
        // navigate("/",{replace:true});
        // window.location.reload()
        console.log(user);
      } else {
        // alert("Error! Invalid email or password");
        toast.error("Error! Invalid email or password")
      }
    } catch (error) {
      console.log(error);
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
              placeholder="userName or Email"
              onChange={handleInput}
              value={detail.name}
              name="name"
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
