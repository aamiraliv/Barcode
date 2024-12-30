import { useEffect, useState } from "react"
import Avatar from "react-avatar"

const AdminNavbar = (isOpen) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  },[])
  return (
    <div className={`flex items-center justify-end  w-full py-3 px-4 gap-2 `}>
      <p className="text-sm">{user.name}</p>
      <Avatar src="https://i.pinimg.com/736x/b9/e0/e3/b9e0e30ac1ec95077b7e1d0abd250e5d.jpg" name="A" size="25" round={true} />

    </div>
  )
}

export default AdminNavbar
