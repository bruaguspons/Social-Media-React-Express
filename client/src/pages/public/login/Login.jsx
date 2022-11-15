import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../../redux/state/userSlice'
import PRIVATE from '../../../routes/Private.routes'
import PUBLIC from '../../../routes/Public.routes'
import { geteLogin } from '../../../utils/getLogin'

function Login() {

    const navigate = useNavigate()
    const dispatcher = useDispatch()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await geteLogin(user)
        if (data === 401) {
            e.target.reset()
            window.alert('wrong email or password')
        } else {
            dispatcher(createUser(data))
            navigate(`/${PRIVATE.PRIVATE}/${PRIVATE.HOME}`)
        }
    }
    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-100 to-cyan-300'>
            <div className='max-w-sm w-2/3 h-max bg-cyan-500 border-2 border-black rounded-xl'>
                <form action="" className='flex flex-col justify-around items-center gap-7' onSubmit={handleSubmit}>
                    <h2 className='font-bold text-4xl mt-8'>Login</h2>
                    <div className='flex flex-col' >
                        <label htmlFor="email">Email:</label>
                        <input id='email' type="email" name='email' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name='password' onChange={handleChange} />
                    </div>
                    <button className='px-4 py-2 mx-1 bg-cyan-700 rounded-lg hover:bg-cyan-600'>Login</button>

                </form>
                <div className='w-full flex justify-end my-5 px-4'>
                    <button className='text-white  hover:text-cyan-800' onClick={() => navigate(`/${PUBLIC.CREATEUSER}`)}>Sing Up</button>
                </div>
            </div>
        </div>
    )
}

export default Login