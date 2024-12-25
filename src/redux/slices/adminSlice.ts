import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadState {
    files: File[];
    imageUrl: string | null;
    adminData: { email: string; firstName: string; lastName: string; role: string; adminID: string };
}

const initialState: UploadState = {
    files: [],
    imageUrl: null,
    adminData: { email: "", firstName: "", lastName: "", role: "", adminID: "" },
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
        setAdminData: (state, action: PayloadAction<{ email: string; firstName: string; lastName: string; role: string, adminID: string }>) => {
            state.adminData = action.payload;
        },
    },
});

export const { setFiles, deleteFile, setAdminData } = uploadSlice.actions;
export default uploadSlice.reducer;
