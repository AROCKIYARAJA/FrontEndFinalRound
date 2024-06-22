import React, { useState } from 'react';
import FILEBASE64 from "react-file-base64";
import { useNavigate } from "react-router-dom";


function PostCreateForm() {

    const [btn, setBtn] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        Image: "", About: ""
    })
    const USERID = JSON.parse(atob(localStorage.getItem("ASKAN")?.split(".")[1])).USER_ID

    async function UploadPost() {
        setBtn(true)
        try {
            const request = await fetch(`http://localhost:5000/Post/CreatePost/${USERID}`, {
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

    function handleInput(e) {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }))
    }
    return (
        <div>
            <div className="w-[300px] mx-auto max-w-[95%] mt-20">
                <div className="text-[2rem] font-[700] text-center">Post Upload</div>
                <div className="flex items-center justify-center flex-col gap-6 mt-10">
                    <FILEBASE64 name='Profile'
                        id='Image'
                        multiple={false}
                        onDone={({ base64 }) => setUser((prev) => { return { ...prev, Image: base64 } })} />

                    <textarea name="About" id="" onChange={(e) => handleInput(e)} placeholder='About' className='border border-gray-300 rounded-lg px-3 py-2 w-full'></textarea>

                    <button onClick={() => UploadPost()} className="w-full px-3 py-1 rounded-lg border bg-sky-600 text-white ">{btn ? "Please Wait" : "Upload"}</button>
                </div>
            </div>
        </div>
    )
}

export default PostCreateForm