import { ArrowRight } from "lucide-react";

const UnauthorizedPage = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center h-screen bg-gray-900 text-white/60 p-4">
      <div className="flex flex-col gap-4 p-20 rounded-lg shadow-lg border-2 border-zinc-500/70">
        <h1 className=" font-extrabold text-2xl xl:text-4xl font-customFont">401 - Unauthorized</h1>
        <p className=" font-Poppins font-light">You do not have permission to access this page.</p>
        <a className="flex flex-row gap-1 items-center justify-center " href="/">Go back to Home <ArrowRight size={20}/></a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
