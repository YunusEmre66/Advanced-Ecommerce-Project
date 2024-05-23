import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {}
}

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.user = action.payload
        }
    }
})

export default userSlice.reducer

export const {setUser} = userSlice.actions