import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import PRIVATE from '../../routes/private.routes'
import { useDispatch, useSelector } from 'react-redux'

import { resetUser } from '../../redux/state/userSlice'
function Navbar() {
    const user = useSelector(state => state.user)
    const dispatcher = useDispatch()
    const navigate = useNavigate()


    return (
        <nav className='sm:text-sm md:text-base xl:text-lg font-bold text-black bg-gradient-to-r from-cyan-400 to-sky-100 border-b-2 border-black sticky top-0 z-50'>
            <div className=' px-4 py-1 flex flex-row items-center justify-between' >
                <div className='flex items-center gap-4'>
                    <img className='h-12 w-12 rounded-full object-cover' src={`http://localhost:8000/${user.url}`} alt="" />
                    <p>Hi! {user.name}</p>
                </div>


                <ul className='flex justify-start'>
                    <li className=''>
                        <NavLink to={PRIVATE.HOME}><button className='hover:bg-cyan-500 py-4 px-6 rounded-3xl sm:py-2 sm:px-4'>Home</button></NavLink>
                    </li>
                    <li>
                        <NavLink to={PRIVATE.CREATEPOST}><button className='hover:bg-cyan-500 py-4 px-6 rounded-3xl sm:py-2 sm:px-4'>New Post</button></NavLink>
                    </li>
                    <li>
                        <button className='hover:bg-cyan-500 py-4 px-6 rounded-3xl sm:py-2 sm:px-4' onClick={() => {
                            dispatcher(resetUser)
                            navigate(PRIVATE.HOME)
                        }}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav >
    )
}

export default Navbar