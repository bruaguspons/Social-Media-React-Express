import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthGuard } from './guards/auth.guards'
import PRIVATE from './routes/Private.routes'
import Private from './pages/private/Private'
import Login from './pages/public/login/Login'
import PUBLIC from './routes/Public.routes'
import CreateUser from './pages/public/createuser/CreateUser'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <div className=' w-full min-h-screen bg-cyan-600'>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Navigate to={PRIVATE.PRIVATE} />} />
            <Route element={<AuthGuard />}>
              <Route path={`${PRIVATE.PRIVATE}/*`} element={<Private />} />
            </Route>
            <Route path={PUBLIC.LOGIN} element={<Login />} />
            <Route path={PUBLIC.CREATEUSER} element={<CreateUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
