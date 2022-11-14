import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../../redux/state/userSlice'
import PRIVATE from '../../../routes/Private.routes'

function Login() {

    const navigate = useNavigate()
    const dispatcher = useDispatch()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:8000/user/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        console.log(data)
        if (res.status === 401) {
            e.target.reset()
        } else {
            dispatcher(createUser(data))
            navigate(`/${PRIVATE.PRIVATE}/${PRIVATE.HOME}`)
        }
    }
    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-100 to-cyan-300'>
            <div className='max-w-sm w-2/3 h-96 bg-cyan-500 border-2 border-black rounded-xl'>
                <form action="" className='flex flex-col h-full justify-around items-center' onSubmit={handleSubmit}>
                    <h2 className='font-bold text-4xl'>Login</h2>
                    <div className='flex flex-col' >
                        <label htmlFor="email">Email:</label>
                        <input id='email' type="email" name='email' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name='password' onChange={handleChange} />
                    </div>
                    <button className='w-24 h-10 bg-cyan-700 rounded-lg hover:bg-cyan-600'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login