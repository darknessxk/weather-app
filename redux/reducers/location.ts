import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type LocationProp = {
    lat?: number;
    lon?: number;
}

const initialState: LocationProp = {}

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<LocationProp>) => ({...state, ...action.payload})
    }
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
