import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faWarning,
} from "@fortawesome/free-solid-svg-icons";

const Signin = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios
    //                 .get("http://localhost:4000/api/admin")
    //             setData(response.data)
    //             return response.data
    //         } catch (error) {
    //             return console.log(error)
    //         }
    //     }
    //     fetchData();
    // }, [])


    // const checkAdmin = () => {
    //     const admin = data.find((item) => item.username === username && item.password === password)

    //     if (admin) {
    //         localStorage.setItem('isLoggedIn', true)
    //         localStorage.setItem(username, admin.username)
    //         navigate('/home');
    //         setError(false)
    //     } else {
    //         setError(true)
    //     }

    // };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/home');
        } else {
            fetch("http://localhost:4000/api/admin")
                .then((res) => res.json())
                .then((json) => setData(json));
        }
    }, [navigate]);
    const handleLogin = (e) => {
        e.preventDefault();
        const auth = data.find((item) => item.username === username && item.password === password);
        if (auth) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', auth.username);
            localStorage.setItem('password', auth.password);
            navigate('/home');
            setError(false)
        } else {
            navigate('/signin');
            setError(true)
        }
    }

    return (
        <section className="bg-[#111827] dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            {error && (
                                <div className='bg-[#FF0000] py-2 px-8 rounded-xl flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faWarning} className=' text-sm text-white mr-2' />
                                    <p className=' text-base font-medium'>Username or password is incorrect!!</p>
                                </div>
                            )}
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                                <input type="username" name="username" id="username" className=" focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className=" focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { setPassword(e.target.value) }} required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#93c5fd] dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#2563eb] dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <button className="text-sm font-medium text-[#2563eb] hover:underline dark:text-[#3b82f6]">Forgot password?</button>
                            </div>
                            <button type="submit" className=" cursor-pointer w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-[#1e40af]">Sign in</button>
                            <Link to={"/signup"} className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <button className="font-medium text-[#2563eb] hover:underline dark:text-[#3b82f6]">Sign up</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Signin