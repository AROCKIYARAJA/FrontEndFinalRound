import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function UserAccount() {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    async function AllPosts() {
        try {
            const request = await fetch(`http://localhost:5000/Post/GetAllPost`, {
                method: "GET",
            });
            const response = await request.json();
            console.log(response);
            setPosts(response.Posts);
        } catch (error) {
            alert("Error")
            console.error(error.message)
        }
    }

    useEffect(() => {
        AllPosts()
    }, [])

    function RemoveAccount() {
        alert("Account Removed")
        localStorage.clear()
        navigate("/")
        window.location.reload()
    }

    return (
        <div>
            <Link to={"/PostCreateForm"} className='text-[2rem] px-4 fixed bottom-10 right-10 rounded-full bg-sky-600 text-white'>+</Link>
            <button onClick={() => RemoveAccount()} className='text-[1.2rem] px-4 fixed bottom-10 left-10 rounded-full bg-red-600 text-white'>Logout</button>
            <div className="w-[1500px] mx-auto max-w-[95%] flex justify-center gap-7 flex-wrap mt-20">
                {
                    posts && posts.length === 0 ? "Loading..." : posts && posts?.map((target, index) => <div key={"post" + index + 1} className='min-w-[300px] w-[450px] p-3 rounded-lg border border-gray-300 shadow-lg flex items-center h-fit flex-col gap-3'>
                        <div className="flex items-center justify-normal gap-3 w-full">
                            <img src={target?.Author?.Profile || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"} alt="" className='w-[50px] h-[50px] rounded-full' />
                            <div className="flex flex-col">
                                <span className='text-[15px]'>{target.Author.UserName}</span>
                                <span className='text-[12px] text-gray-400 font-[500]'>{target.Author.Email}</span>
                            </div>
                        </div>
                        <img src={target.Image} alt="" className='w-full rounded-lg mx-auto' />
                        <div className=" tracking-wide text-gray-500 w-full indent-10">{target.About}</div>
                        <div className="flex items-center w-full">
                            Likes &nbsp; <button className='px-2 py-0 rounded-md bg-red-200 text-red-600'>{target?.Likes.length}</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default UserAccount