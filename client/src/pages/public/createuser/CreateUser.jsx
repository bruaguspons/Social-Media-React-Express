import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../../redux/state/userSlice'
import { geteLogin } from '../../../utils/login'
import { createSearch } from '../../../redux/state/searchSlice'
import PRIVATE from '../../../routes/Private.routes'
function CreateUser() {
    const dispatcher = useDispatch()
    const navigate = useNavigate()
    const [dataUser, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [file, setFile] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataSend = new FormData()
        dataSend.append('file', file)
        dataSend.append('data', JSON.stringify(dataUser))
        const res = await fetch('http://localhost:8000/user', {
            method: 'POST',
            body: dataSend
        })
        if (res.status === 201) {
            const data = await res.json()
            const data2 = await geteLogin({ email: data.email, password: dataUser.password })
            dispatcher(createUser({ token: data2.token, email: data.email, name: data.name, id: data._id, url: data.url }))
            console.log(data)
            navigate(`/${PRIVATE.PRIVATE}/${PRIVATE.HOME}`)
        }

    }
    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFile(e.target.files[0])
        } else {
            setData({ ...dataUser, [e.target.name]: e.target.value })
            console.log(dataUser)
        }
    }
    return (
        <div className='w-full flex justify-center mt-5'>
            <div className='max-w-sm w-2/3 h-max bg-gradient-to-r from-cyan-400 to-sky-100 border-2 border-black rounded-xl'>
                <form action="" className='flex flex-col h-full justify-around items-center my-3 gap-6' onSubmit={handleSubmit}>
                    <h2 className='font-bold text-4xl'>New Post</h2>
                    <div className='flex flex-col' >
                        <label htmlFor="name">Name:</label>
                        <input id='name' name='name' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col' >
                        <label htmlFor="email">Email:</label>
                        <input id='email' type='email' name='email' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col' >
                        <label htmlFor="password">password:</label>
                        <input id='password' type='password' name='password' onChange={handleChange} />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="image">User Image:</label>
                        <input type="file" name="image" id="image" onChange={handleChange} />
                    </div>
                    <button className='w-24 h-10 bg-cyan-600 rounded-lg hover:bg-cyan-500'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser