"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
    typeOpenDialog: string;
    cats: object;
}

const initialState: GlobalState = {
    typeOpenDialog: '',
    cats: {}
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        openDialog: (state, action: PayloadAction<string>) => {
            state.typeOpenDialog = action.payload
        },
        closeDialog : (state) => {
            state.typeOpenDialog = ''
        },
        setCats: (state, action: PayloadAction<object>) => {
            state.cats = action.payload
        },
    },
});

export const { closeDialog, openDialog,setCats } = globalSlice.actions;
export default globalSlice.reducer;
