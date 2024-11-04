import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
    activeMenu: string;
    activeSubMenu: string | null;
}

// Load the activeMenu from localStorage, or default to 'Dashboard'
const initialState: MenuState = {
    activeMenu: localStorage.getItem("activeMenu") || 'Dashboard',
    activeSubMenu: null,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setActiveMenu: (state, action: PayloadAction<string>) => {
            state.activeMenu = action.payload;
            state.activeSubMenu = null;
            localStorage.setItem("activeMenu", action.payload); // Save to localStorage
        },
        setActiveSubMenu: (state, action: PayloadAction<string | null>) => {
            state.activeSubMenu = action.payload;
        },
    },
});

export const { setActiveMenu, setActiveSubMenu } = menuSlice.actions;
export default menuSlice.reducer;
