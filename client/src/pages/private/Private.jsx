import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PRIVATE from '../../routes/Private.routes'
import Home from './Home/Home'
function Private() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={PRIVATE.HOME} />} />
            <Route path={PRIVATE.HOME} element={<Home />} />
        </Routes>
    )
}

export default Private