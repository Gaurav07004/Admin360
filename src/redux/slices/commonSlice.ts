import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
    token: string | null;
    modal: boolean;
    email: string;
    isLoading: boolean;
    statusMessage: string;
    passwordStatusMessage: string;
    OTPStatusMessage: string;
    emailStatus: "valid" | "invalid" | null;
    otp: string[];
    newPassword: string;
    confirmPassword: string;
    passwordStatus: "valid" | "invalid" | null;
    OTPStatus: "valid" | "invalid" | null;
    showNewPassword: boolean;
    currentSection: number;
    form: { email: string; password: string; firstName: string; lastName: string; role: string; adminID: string };
    usernameStatus: "valid" | "invalid" | null;
    lineChartData: string[];
    pieChartData: string[];
    topProductData: string[];
    CustomerTrafficData: string[];
    productView: string[];
    addToCart: string[];
    checkout: string[];
    purchase: string[];
    mode: 'light' | 'dark';
}

// const savedTheme = (typeof window !== "undefined" && localStorage.getItem("theme")) as "light" | "dark";


const initialState: MenuState = {
    token: null,
    modal: false,
    email: "",
    isLoading: false,
    statusMessage: "",
    passwordStatusMessage: "",
    emailStatus: null,
    otp: ["", "", "", "", "", "",],
    OTPStatusMessage: "",
    OTPStatus: null,
    newPassword: "",
    confirmPassword: "",
    passwordStatus: null,
    showNewPassword: false,
    currentSection: 1,
    form: { email: "", password: "", firstName: "", lastName: "", role: "", adminID: "" },
    usernameStatus: null,
    lineChartData: [],
    pieChartData: [],
    topProductData: [],
    CustomerTrafficData: [],
    productView: [],
    addToCart: [],
    checkout: [],
    purchase: [],
    mode: "light",

};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
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
        setOTPStatusMessage: (state, action: PayloadAction<string>) => {
            state.OTPStatusMessage = action.payload;
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
        setOTPStatus: (state, action: PayloadAction<"valid" | "invalid" | null>) => {
            state.OTPStatus = action.payload;
        },
        setShowNewPassword: (state, action: PayloadAction<boolean>) => {
            state.showNewPassword = action.payload;
        },
        setCurrentSection: (state, action: PayloadAction<number>) => {
            state.currentSection = action.payload;
        },
        setForm: (state, action: PayloadAction<{ password: string; email: string; firstName: string; lastName: string; role: string, adminID: string }>) => {
            state.form = action.payload;
        },
        setUsernameStatus: (state, action: PayloadAction<"valid" | "invalid" | null>) => {
            state.usernameStatus = action.payload;
        },
        setLineChartData: (state, action: PayloadAction<string[]>) => {
            state.lineChartData = action.payload;
        },
        setPieChartData: (state, action: PayloadAction<string[]>) => {
            state.pieChartData = action.payload;
        },
        setTopProduct: (state, action: PayloadAction<string[]>) => {
            state.topProductData = action.payload;
        },
        setCustomerTraffic: (state, action: PayloadAction<string[]>) => {
            state.CustomerTrafficData = action.payload;
        },
        setProductView: (state, action: PayloadAction<string[]>) => {
            state.productView = action.payload;
        },
        setAddToCart: (state, action: PayloadAction<string[]>) => {
            state.addToCart = action.payload;
        },
        setCheckout: (state, action: PayloadAction<string[]>) => {
            state.checkout = action.payload;
        },
        setPurchase: (state, action: PayloadAction<string[]>) => {
            state.purchase = action.payload;
        },
        toggleTheme(state) {
            state.mode = state.mode === "light" ? "dark" : "light";
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", state.mode);
            }
        },
        setTheme(state, action: PayloadAction<"light" | "dark">) {
            state.mode = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", action.payload);
            }
        },
    },
});

export const {
    setToken,
    setModal,
    setEmail,
    setIsLoading,
    setStatusMessage,
    setOTPStatus,
    setOTPStatusMessage,
    setPasswordStatusMessage,
    setEmailStatus,
    setOtp,
    setNewPassword,
    setConfirmPassword,
    setPasswordStatus,
    setShowNewPassword,
    setCurrentSection,
    setForm,
    setUsernameStatus,
    setCustomerTraffic,
    setLineChartData,
    setPieChartData,
    setTopProduct,
    setPurchase,
    setAddToCart,
    setProductView,
    setCheckout,
    toggleTheme, setTheme
} = menuSlice.actions;

export default menuSlice.reducer;
