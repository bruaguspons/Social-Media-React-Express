import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PRIVATE from './../../../routes/Private.routes'

function CreatePost() {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const [contentData, setContentData] = useState({
        title: '',
        content: '',
        userId: user.id
    })
    const [file, setFile] = useState()
    const [img, setImg] = useState('http://localhost:8000/')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('file', file)
        data.append('content', JSON.stringify(contentData))
        const res = await fetch('http://localhost:8000/post/', {
            method: 'POST',
            headers: { 'Autherization': `Bearer ${user.token}` },
            body: data,
        })
        const msg = await res.json()
        setImg(img + msg.path)
        console.log(msg)
        navigate(`/${PRIVATE.PRIVATE}/${PRIVATE.HOME}`, { replace: true })
    }

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFile(e.target.files[0])
        }
        else {
            setContentData({ ...contentData, [e.target.name]: e.target.value })
        }

    }
    return (
        <div className='w-full flex justify-center mt-6'>

            <div className='max-w-sm w-2/3 h-max bg-gradient-to-r from-cyan-400 to-sky-100 border-2 border-black rounded-xl'>
                <form action="" className='flex flex-col h-full justify-around items-center my-3 gap-6' onSubmit={handleSubmit}>
                    <h2 className='font-bold text-4xl'>New Post</h2>
                    <div className='flex flex-col' >
                        <label htmlFor="title">Title:</label>
                        <input id='title' name='title' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="content">content:</label>
                        <textarea id="content" name='content' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="image">Image:</label>
                        <input type="file" name="image" id="image" onChange={handleChange} />
                    </div>
                    <button className='w-24 h-10 bg-cyan-600 rounded-lg hover:bg-cyan-500'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost