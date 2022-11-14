import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PRIVATE from '../../routes/Private.routes'
import CreatePost from './createPost/CreatePost'
import Home from './Home/Home'
import Navbar from './Navbar'
function Private() {
    return (
        <div className=' w-full min-h-screen bg-cyan-600' >
            <Navbar />
            <Routes>
                <Route path='/' element={<Navigate to={PRIVATE.HOME} />} />
                <Route path={PRIVATE.HOME} element={<Home />} />
                <Route path={PRIVATE.CREATEPOST} element={<CreatePost />} />
            </Routes>
        </div >
    )
}

export default Private