import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
    modal: boolean;
    email: string;
    isLoading: boolean;
    statusMessage: string;
    passwordStatusMessage: string;
    emailStatus: "valid" | "invalid" | null;
    otp: string[];
    newPassword: string;
    confirmPassword: string;
    passwordStatus: "valid" | "invalid" | null;
    showNewPassword: boolean;
    currentSection: number;
    form: { email: string; password: string, firstName: string, lastName: string, username: string };
    usernameStatus: "valid" | "invalid" | null;
}

const initialState: MenuState = {
    modal: false,
    email: "",
    isLoading: false,
    statusMessage: "",
    passwordStatusMessage: "",
    emailStatus: null,
    otp: ["", "", "", "", "", ""],
    newPassword: "",
    confirmPassword: "",
    passwordStatus: null,
    showNewPassword: false,
    currentSection: 1,
    form: { email: "", password: "", firstName: "", lastName: "", username: "" },
    usernameStatus: null,
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<boolean>) => {
            state.modal = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setStatusMessage: (state, action: PayloadAction<string>) => {
            state.statusMessage = action.payload;
        },
        setPasswordStatusMessage: (state, action: PayloadAction<string>) => {
            state.passwordStatusMessage = action.payload;
        },
        setEmailStatus: (state, action: PayloadAction<"valid" | "invalid" | null>) => {
            state.emailStatus = action.payload;
        },
        setOtp: (state, action: PayloadAction<string[]>) => {
            state.otp = action.payload;
        },
        setNewPassword: (state, action: PayloadAction<string>) => {
            state.newPassword = action.payload;
        },
        setConfirmPassword: (state, action: PayloadAction<string>) => {
            state.confirmPassword = action.payload;
        },
        setPasswordStatus: (state, action: PayloadAction<"valid" | "invalid" | null>) => {
            state.passwordStatus = action.payload;
        },
        setShowNewPassword: (state, action: PayloadAction<boolean>) => {
            state.showNewPassword = action.payload;
        },
        setCurrentSection: (state, action: PayloadAction<number>) => {
            state.currentSection = action.payload;
        },
        setForm: (state, action: PayloadAction<{ password: string; email: string; firstName: string; lastName: string; username: string }>) => {
            state.form = action.payload;
        },
        setUsernameStatus: (state, action: PayloadAction<"valid" | "invalid" | null>) => {
            state.usernameStatus = action.payload;
        }
    },
});

export const {
    setModal,
    setEmail,
    setIsLoading,
    setStatusMessage,
    setPasswordStatusMessage,
    setEmailStatus,
    setOtp,
    setNewPassword,
    setConfirmPassword,
    setPasswordStatus,
    setShowNewPassword,
    setCurrentSection,
    setForm,
    setUsernameStatus
} = menuSlice.actions;

export default menuSlice.reducer;
