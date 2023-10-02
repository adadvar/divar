"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
    typeOpenDialog: string;
    cats: cat[];
    selectedCat: number;
}

interface cat {
    id: number;
    title: string;
    slug: string;
    parent_id: number | null;
    icon: string | null;
    child: cat[];
}

const initialState: GlobalState = {
    typeOpenDialog: "",
    cats: [],
    selectedCat: 0,
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        openDialog: (state, action: PayloadAction<string>) => {
            state.typeOpenDialog = action.payload;
        },
        closeDialog: (state) => {
            state.typeOpenDialog = "";
            state.selectedCat = 0;
        },
        setCats: (state, action: PayloadAction<cat[]>) => {
            state.cats = action.payload;
        },
        setselectedCat: (state, action: PayloadAction<number>) => {
            state.selectedCat = action.payload;
        },
    },
});

export const { closeDialog, openDialog, setCats, setselectedCat } =
    globalSlice.actions;

export default globalSlice.reducer;
