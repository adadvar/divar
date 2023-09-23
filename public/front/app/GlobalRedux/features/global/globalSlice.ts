"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
    isSearchOpen: boolean;
}

const initialState: GlobalState = {
    isSearchOpen: false,
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        closeSearch: (state) => {
            state.isSearchOpen = false;
        },
        openSearch: (state) => {
            state.isSearchOpen = true;
        },
    },
});

export const { closeSearch, openSearch } = globalSlice.actions;
export default globalSlice.reducer;
