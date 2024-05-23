import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    menu: []
}

export const menuSlice = createSlice({
    initialState,
    name: 'menu',
    reducers: {
        setMenu: (state, action: PayloadAction<[]>) => {
            state.menu = action.payload
        }
    }
})

export default menuSlice.reducer

export const {setMenu} = menuSlice.actions