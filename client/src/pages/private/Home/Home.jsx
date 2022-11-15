import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Spinner from './../../../components/Spinner'
import Heart from './../../../assets/heart.svg'
import { useSelector } from 'react-redux'

function Home() {
    const user = useSelector(state => state.user)
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const [serchWord, setSearchWord] = useState('')
    const getPost = async () => {
        const res = await fetch('http://localhost:8000/post')
        const post = await res.json()
        setPost(post)
        console.log(post)
        setLoading(false)
    }

    useEffect(() => {
        getPost()
    }, [])


    const handleChange = (e) => {
        setSearchWord(e.target.value)
    }

    const handleClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        const resWord = await fetch(`http://localhost:8000/post?word=${serchWord}`)
        const postWord = await resWord.json()
        setPost(postWord)
        console.log(postWord)
        setLoading(false)
        // e.target.reset()
    }
    const handleLike = async (pk, arrLikes) => {
        console.log(pk, arrLikes)
        let [post_to_change] = post.filter(post => post._id === pk)
        const index = post.indexOf(post_to_change)
        console.log(index)
        if (arrLikes.includes(user.id)) {
            post_to_change.likes = post_to_change.likes.filter(id => id !== user.id)
        } else {
            post_to_change.likes.push(user.id)
        }
        const allPost = post.filter(post => post._id !== pk)
        allPost.splice(index, 0, post_to_change)
        setPost(allPost)
        const res = await fetch('http://localhost:8000/post/likes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: pk, arrLikes: post_to_change.likes })
        })
        const data = await res.json()
        console.log(data)
    }

    const handleDelete = async (pk) => {
        const res = await fetch('http://localhost:8000/post/', {
            method: 'DElete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: pk })
        })
        console.log(res.status)
        if (res.status === 400) {
            msg = await res.json()
            window.alert(msg)
        } else {
            if (res.status === 204) {
                const allPost = post.filter(post => post._id !== pk)
                setPost(allPost)
            }
        }
    }

    return (
        <div >
            <div className="w-full flex items-center justify-center">
                <form action="" className='flex items-center justify-center md:w-96' onSubmit={handleClick}>

                    <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search User" aria-label="Search" onChange={handleChange}></input>
                    <button type="submit" className='px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center'>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                        </svg>
                    </button>

                </form>
            </div>
            {
                loading ? <div className='absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max'><Spinner /></div> :
                    <div className='w-full flex flex-col items-center'>
                        {
                            post.map(post => (
                                <div key={post._id} className='h-max w-2/3 max-w-2xl my-2 p-3 bg-gradient-to-r from-cyan-400 to-sky-100 border-b-2 border-black '>
                                    <div className='flex items-center gap-4'>
                                        <img src={post.userInfo[2]} className='w-10 h-10 object-cover rounded-full' alt="" />
                                        <p>{post.userInfo[0]} - {post.userInfo[1]}</p>
                                    </div>
                                    <div className='h-full flex flex-col justify-between items-center'>
                                        <div className='w-full'>
                                            <h2 className='font-bold text-center text-2xl mb-4'>{post.title}</h2>
                                            <p className='px-8'>{post.content}</p>
                                        </div>
                                        {post.url &&
                                            <div className='w-1/2 mt-2'>
                                                <img src={post.url} alt="" className='h-full object-cover' />
                                            </div>
                                        }
                                        <div className='flex items-center justify-center  my-2'>
                                            <span>{post.likes.length}</span>
                                            <button className='ml-3 w-5 h-5' onClick={() => handleLike(post._id, post.likes)}><img className={post.likes.includes(user.id) ? 'color-red' : 'color-white'} src={Heart} alt="heart" /></button>
                                        </div>
                                        {
                                            post.userInfo[1] == user.email &&
                                            <div><button className='px-4 py-2 bg-cyan-500 rounded-full hover:bg-cyan-400' onClick={() => handleDelete(post._id)}>Delete</button></div>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Home