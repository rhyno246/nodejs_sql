import { createReducer , createAction } from "@reduxjs/toolkit";
import { getItem, setItem } from "../../utils/useLocalStorage";
interface switchState {
    isSwitch : Boolean
}
const initialState : switchState = {
    isSwitch : getItem('theme') || false
}
export const switchMode  =  createAction<Boolean>('SWITCH_MODE')

const switchReducer = createReducer(initialState , builder => {
    builder.addCase(switchMode , (state) => {
        state.isSwitch = !state.isSwitch
        setItem('theme' , state.isSwitch )
    })
})
export default switchReducer;

