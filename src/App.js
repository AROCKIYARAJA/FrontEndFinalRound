import { useState } from "react";
import { Link } from "react-router-dom";
import UserAccount from "./UserAccount.js"


export default function App() {

  const [password, setPassword] = useState(false);
  const [btn, setBtn] = useState(false);
  const [user, setUser] = useState({
    Email: "", Password: ""
  })

  function handleInput(e) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev, [name]: value
    }))
  }

  async function AccountLogin() {
    if (!user.Email || !user.Password) return alert("Feilds are Empty")
    setBtn(true)
    try {
      const request = await fetch(`http://localhost:5000/User/LoginUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      const response = await request.json();
      if (response.success) {
        console.log(response);
        localStorage.setItem("ASKAN", response.CurrentUser)
      }
    } catch (error) {
      alert("Error")
      console.error(error.message)
    }
    setBtn(false)
  }

  return (
    <>
      {localStorage.getItem("ASKAN") ? <UserAccount /> : <div className="w-[300px] mx-auto max-w-[95%] mt-20">
        <div className="text-[2rem] font-[700] text-center">Login Account</div>
        <div className="flex items-center justify-center flex-col gap-6 mt-10">
          <input type="text" onChange={(e) => handleInput(e)} value={user.Email} placeholder="Email" name="Email" className="w-full px-3 py-1 rounded-lg border border-gray-400" />
          <input type={password ? "text" : "password"} value={user.Password} onChange={(e) => handleInput(e)} placeholder="Password" name="Password" className="w-full px-3 py-1 rounded-lg border border-gray-400 tracking-wider" />
          <label id="pwd" className="flex items-center gap-2 w-full">
            <span><input onChange={() => setPassword(!password)} type="Checkbox" name="pwd" /></span>
            <span className=" selection:bg-transparent">{password ? "Hide Password" : "Show Password"}</span>
          </label>

          <button onClick={() => AccountLogin()} className="w-full px-3 py-1 rounded-lg border bg-sky-600 text-white ">{btn ? "Please Wait" : "Login"}</button>
          <div className="text-center">I Don't have any Account? <Link className="px-1 text-sky-600 hover:underline" to={"/CreateAccount"}>Create Account</Link></div>
        </div>
      </div>}
    </>

  )
}