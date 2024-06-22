import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FILEBASE64 from "react-file-base64";

function CreateAccount() {

    
    const [password, setPassword] = useState(false);
    const [btn, setBtn] = useState(false);
    const navigate = useNavigate()
    const [user, setUser] = useState({
        Profile: "",
        UserName: "",
        About: "",
        Email: "",
        Password: "",
        Mobile: "",
    })
    function handleInput(e) {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev, [name]: value
        }))
    }

    async function CreateUser() {
        if (user.Profile == "" || user.UserName == "" || user.About == "" || user.Email == "" || user.Password == "" || user.Mobile == "") return alert("Feilds are Empty")
        setBtn(true)

        try {
            const request = await fetch(`http://localhost:5000/User/CreateSingleUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })
            const response = await request.json();
            console.log(response);
            if (response.success) {
                navigate("/")
            }
        } catch (error) {
            alert("Error")
            console.error(error.message)
        }
        setBtn(false)
    }

    return (
        <div className="w-[300px] mx-auto max-w-[95%] mt-20">
            <div className="text-[2rem] font-[700] text-center">Create Account</div>
            <div className="flex items-center justify-center flex-col gap-6 mt-10">
                <input type="text" onChange={(e) => handleInput(e)} placeholder='UserName' name='UserName' className="w-full px-3 py-1 rounded-lg border border-gray-400" />
                <textarea name="About" onChange={(e) => handleInput(e)} id="" className='w-full rounded-lg px-3 py-2 border border-gray-400' placeholder='About'></textarea>
                <input type="text" onChange={(e) => handleInput(e)} placeholder="Email" name="Email" className="w-full px-3 py-1 rounded-lg border border-gray-400" />
                <input type={password ? "text" : "password"} onChange={(e) => handleInput(e)} placeholder="Password" name="Password" className="w-full px-3 py-1 rounded-lg border border-gray-400 tracking-wider" />
                <input type="text" onChange={(e) => handleInput(e)} placeholder="Mobile" name="Mobile" className="w-full px-3 py-1 rounded-lg border border-gray-400" />
                <FILEBASE64 name='Profile'
                    id='Image'
                    multiple={false}
                    onDone={({ base64 }) => setUser((prev) => { return { ...prev, Image: base64 } })} />
                <label id="pwd" className="flex items-center gap-2 w-full">
                    <span><input onChange={() => setPassword(!password)} type="Checkbox" name="pwd" /></span>
                    <span className=" selection:bg-transparent">{password ? "Hide Password" : "Show Password"}</span>
                </label>
                <button onClick={() => CreateUser()} className="w-full px-3 py-1 rounded-lg border bg-sky-600 text-white ">{btn ? "Please Wait..." : "Create Account"}</button>
                <div className="text-center">I Don't have any Account? <Link className="px-1 text-sky-600 hover:underline" to={"/"}>Create Account</Link></div>
            </div>
        </div>
    )
}

export default CreateAccount