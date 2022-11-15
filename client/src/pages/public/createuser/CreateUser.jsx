import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../../redux/state/userSlice'
import { geteLogin } from '../../../utils/getLogin'
import { createSearch } from '../../../redux/state/searchSlice'
import PRIVATE from '../../../routes/Private.routes'
import sendFile from '../../../utils/sendFile'
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
        const data = await sendFile(file, dataUser)
        if (data) {
            const data2 = await geteLogin({ email: data.email, password: dataUser.password })
            dispatcher(createUser({ token: data2.token, email: data.email, name: data.name, id: data._id, url: data.url }))
            navigate(`/${PRIVATE.PRIVATE}/${PRIVATE.HOME}`)
        } else {
            e.target.reset()
            window.alert('wrong request')
        }

    }
    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFile(e.target.files[0])
        } else {
            setData({ ...dataUser, [e.target.name]: e.target.value })
        }
    }
    return (
        <div className='w-full flex justify-center mt-5'>
            <div className='max-w-sm w-2/3 h-max bg-gradient-to-r from-cyan-400 to-sky-100 border-2 border-black rounded-xl'>
                <form action="" className='flex flex-col h-full justify-around items-center my-3 gap-6' onSubmit={handleSubmit}>
                    <h2 className='font-bold text-4xl'>Create User</h2>
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