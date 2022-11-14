import { createSlice } from '@reduxjs/toolkit'

export const SearchSlice = createSlice({
    name: 'search',
    initialState: '',
    reducers: {
        createSearch: (statte, action) => {
            return action
        },
        resetSearch: (state, action) => {
            return ''
        }
    }
})

export const { createSearch, resetSearch } = SearchSlice.actions