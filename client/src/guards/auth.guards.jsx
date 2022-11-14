import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import PUBLIC from '../routes/Public.routes'

export const AuthGuard = () => {
    const { token } = useSelector(state => state.user)
    return token ? <Outlet /> : <Navigate to={PUBLIC.LOGIN} />
}