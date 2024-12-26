import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminData {
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    adminID?: string;
    isActive?: boolean | null;
    profileImage?: string;
}

interface UploadState {
    files: { name: string, dataUrl: string }[];
    imageUrl: string | null;
    accountData: AdminData | null;
    adminData: AdminData;
}

const initialState: UploadState = {
    files: [],
    imageUrl: null,
    accountData: null,
    adminData: { email: "", firstName: "", lastName: "", role: "", adminID: "", isActive: null, profileImage: "" },
};

const uploadSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFiles: (state, action: PayloadAction<{ name: string, dataUrl: string }[]>) => {
            state.files = action.payload;
        },
        setImageUrl: (state, action: PayloadAction<string | null>) => {
            state.imageUrl = action.payload;
        },
        deleteFile: (state) => {
            state.files = [];
            state.imageUrl = null;
        },
        setAccountData(state, action: PayloadAction<AdminData>) {
            state.accountData = action.payload;
        },
        setAdminData(state, action: PayloadAction<AdminData>) {
            state.adminData = action.payload;
        },
    },
});

export const { setFiles, setImageUrl, deleteFile, setAdminData, setAccountData } = uploadSlice.actions;
export default uploadSlice.reducer;
