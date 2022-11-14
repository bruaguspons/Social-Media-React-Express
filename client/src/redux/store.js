import { configureStore } from "@reduxjs/toolkit"
import { SearchSlice } from "./state/searchSlice"
import { UserSlice } from "./state/userSlice"

export default configureStore({
    reducer: {
        user: UserSlice.reducer,
        search: SearchSlice.reducer
    }
})