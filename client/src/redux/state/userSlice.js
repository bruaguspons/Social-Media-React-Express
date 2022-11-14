import { createSlice } from '@reduxjs/toolkit'

const initUser = {
    id: '',
    token: '',
    name: '',
    email: '',
    url: ''
}

export const UserSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : initUser,
    reducers: {
        createUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload))
            return action.payload
        },
        updateUser: (state, action) => {
            const newData = { ...state, ...action.payload }
            localStorage.setItem('user', JSON.stringify(newData))
            return newData
        },
        resetUser: (state, action) => {
            localStorage.removeItem('user')
            return initUser
        }
    }
})

export const { createUser, updateUser, resetUser } = UserSlice.actions