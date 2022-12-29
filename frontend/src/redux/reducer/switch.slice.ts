import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../../utils/useLocalStorage";
interface switchState {
    isSwitch : Boolean
}
const initialState : switchState = {
    isSwitch : getItem('theme') || false
}
const switchSlice = createSlice({
    name : "switch",
    initialState : initialState,
    reducers : {
        switchMode : (state, actions) => {
            state.isSwitch = !state.isSwitch
            setItem('theme' , state.isSwitch )
        }
    },
})

export const { switchMode } =  switchSlice.actions;
const switchReducer = switchSlice.reducer;
export default switchReducer

