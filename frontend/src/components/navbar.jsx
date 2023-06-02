import React, { useEffect } from 'react';
import { BrowserRouter, Routes, useNavigate, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AddUser from "../pages/addUser";
import ManageUser from "../pages/manageUser";
import Home from '../pages/home';

const Navbar = () => {
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('isLoggedIn');
        history('/signin');
    };
    useEffect(() => {
        if (!localStorage.getItem('isLoggedIn')) {
            history('/signin')
        }
    }, [])
    return (
        <div>
            <navbar className='bg-black flex text-white justify-between px-5 py-5'>
                <div className=' font-bold'>Admin Panel</div>
                <div className='flex '>
                    <Link to='/home/addUser' className='hover:bg-white rounded-lg hover:text-black transition-all ease-in-out duration-300 px-3 cursor-pointer'>Add User</Link>
                    <Link to='/home/manageUser' className='px-3 hover:bg-white rounded-lg hover:text-black transition-all ease-in-out duration-300 mx-3 cursor-pointer'>Manage User</Link>
                    <div onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} className=' text-2xl rotate-180 cursor-pointer' /></div>
                </div>
            </navbar>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='addUser' element={<AddUser />} />
                <Route path='manageUser' element={<ManageUser />} />
            </Routes>

        </div>
    )
}

export default Navbar