import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/AuthService";

const initialState = {
    value: authService.getCurrentUser()
}

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers : {
        setCurrentUser: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;