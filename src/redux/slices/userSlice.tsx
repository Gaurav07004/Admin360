// src/redux/uploadSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadState {
    files: File[];
    imageUrl: string | null;
}

const initialState: UploadState = {
    files: [],
    imageUrl: null,
};

const uploadSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFiles(state, action: PayloadAction<File[]>) {
            state.files = action.payload;
            state.imageUrl = action.payload.length > 0 ? URL.createObjectURL(action.payload[0]) : null;
        },
        deleteFile(state, action: PayloadAction<string>) {
            state.files = state.files.filter(file => file.name !== action.payload);
            if (state.imageUrl && state.files.length === 0) {
                state.imageUrl = null;
            } else {
                state.imageUrl = state.files.length > 0 ? URL.createObjectURL(state.files[0]) : null;
            }
        },
    },
});

export const { setFiles, deleteFile } = uploadSlice.actions;
export default uploadSlice.reducer;
