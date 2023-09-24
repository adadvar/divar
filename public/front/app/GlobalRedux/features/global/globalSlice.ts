"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
    isSearchOpen: boolean;
    isCityOpen: boolean;
}

const initialState: GlobalState = {
    isSearchOpen: false,
    isCityOpen: false,
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
        closeCity: (state) => {
            state.isCityOpen = false;
        },
        openCity: (state) => {
            state.isSearchOpen = false;
            state.isCityOpen = true;
        },
    },
});

export const { closeSearch, openSearch, closeCity, openCity } = globalSlice.actions;
export default globalSlice.reducer;
