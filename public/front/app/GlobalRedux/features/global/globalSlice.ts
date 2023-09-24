"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
    typeOpenDialog: string;
}

const initialState: GlobalState = {
    typeOpenDialog: ''
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
        }
    },
});

export const { closeDialog, openDialog } = globalSlice.actions;
export default globalSlice.reducer;
