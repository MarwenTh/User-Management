import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Form = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState('');
    const [isUserInserted, setIsUserInserted] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const fetchData = async () => {
        fetch('http://localhost:4000/api/users/')
            .then((res) => res.json())
            .then((json) => setData(json))

    }
    useEffect(() => {
        fetchData();
    }, [isUserInserted])

    const checkPass = () => {
        if (password === confirmPassword) {
            setError(false)
            console.log('Password match!!')
            return true
        } else {
            setError(true)
            console.log('Password do not match!!')
            return false


        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkPass() === true) {
            const auth = data.find((item) => item.email === email)
            if (auth) {
                Toast.fire({
                    icon: 'warning',
                    title: 'User already exists!'
                })
            } else {
                try {
                    axios.post('http://localhost:4000/api/users', {
                        name: {
                            firstName,
                            lastName,
                        },
                        email,
                        password,
                    }
                    )
                    console.log("User inserted successfully")
                    setIsUserInserted(true)
                    navigate('/home/manageUser')
                    Toast.fire({
                        icon: 'success',
                        title: 'User inserted successfully'
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            });
        }
    }



    // useEffect(() => {
    //     const fetchData = async () => {
    //         fetch('http://localhost:4000/api/users/')
    //             .then((res) => res.json())
    //             .then((json) => setData(json))
    //     }
    //     fetchData();
    // }, [isUserInserted])
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const auth = data.find((item) => item.email === email)
    //     console.log(auth)
    //     if (auth) {
    //         console.log("user already exists")
    //     } else {
    //         try {
    //             axios.post('http://localhost:4000/api/users', {
    //                 name: {
    //                     firstName,
    //                     lastName,
    //                 },
    //                 email,
    //                 password,
    //             }
    //             )
    //             console.log("User inserted successfully")
    //             setIsUserInserted(true)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }


    return (
        <div className=' flex justify-center h-[calc(100vh-67px)]'>

            <form className=' w-2/5 mt-9  h-fit py-5 px-5 rounded-xl bg-white' onSubmit={handleSubmit}>
                <div className=''>

                    {/* {
                        error &&
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-5 text-center font-semibold" role="alert">
                            <span className="block sm:inline"> Passwords do not match</span>
                        </div>
                    } */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => { setFirstName(e.target.value) }} />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => { setLastName(e.target.value) }} />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => { setEmail(e.target.value) }} />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => { setPassword(e.target.value) }} />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Submit</button>
                </div>
            </form>


        </div>
    )
}

export default Form