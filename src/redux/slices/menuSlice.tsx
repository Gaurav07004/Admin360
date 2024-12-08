import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
    activeMenu: string;
    activeSubMenu: string | null;
    modal: boolean;
}

// Load the activeMenu from localStorage, or default to 'Dashboard'
const initialState: MenuState = {
    activeMenu: 'Dashboard', // localStorage.getItem("activeMenu") || 
    activeSubMenu: null,
    modal: false
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setActiveMenu: (state, action: PayloadAction<string>) => {
            state.activeMenu = action.payload;
            state.activeSubMenu = null;
            // localStorage.setItem("activeMenu", action.payload); // Save to localStorage
        },
        setActiveSubMenu: (state, action: PayloadAction<string | null>) => {
            state.activeSubMenu = action.payload;
        },
        setModal: (state, action: PayloadAction<boolean>) => {
            state.modal = action.payload;
        },
    },
});

export const { setActiveMenu, setActiveSubMenu, setModal } = menuSlice.actions;
export default menuSlice.reducer;
