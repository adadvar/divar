'use client';

import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import advertService from "./advertService";
import { advertState, } from "@/public/interfaces";

const initialState: advertState = {
    advert: {},
    adverts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: {},
};

const extractErrorMessage = (err: any) => {
    return (
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
    );
};

//get advert
export const showAdvert = createAsyncThunk("advert/show", async (params: any = {}, thunkAPI) => {
    try {
        return await advertService.show(params);
    } catch (err: any) {
        const message = extractErrorMessage(err);
        return thunkAPI.rejectWithValue(message);
    }
});

export const advertSlice = createSlice({
    name: "advert",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isPending(showAdvert),
                (state) => {
                    state.isLoading = true;
                    state.isSuccess = false;
                    state.isError = false;
                }
            )
            .addMatcher(
                isFulfilled(showAdvert),
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.advert = action.payload
                }
            )
            .addMatcher(
                isRejected(showAdvert),
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError = true;
                    state.message = action.payload ? action.payload : {};
                }
            );

    }
});

export const { reset } = advertSlice.actions;
export default advertSlice.reducer;
