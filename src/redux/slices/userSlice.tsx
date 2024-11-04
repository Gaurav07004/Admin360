// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface MenuState {
//     activeMenu: string;
//     activeSubMenu: string | null;
// }

// const initialState: MenuState = {
//     activeMenu: 'Dashboard',
//     activeSubMenu: null,
// };

// const menuSlice = createSlice({
//     name: 'menu',
//     initialState,
//     reducers: {
//         setActiveMenu: (state, action: PayloadAction<string>) => {
//             state.activeMenu = action.payload;
//             state.activeSubMenu = null;
//         },
//         setActiveSubMenu: (state, action: PayloadAction<string | null>) => {
//             state.activeSubMenu = action.payload;
//         },
//     },
// });

// export const { setActiveMenu, setActiveSubMenu } = menuSlice.actions;
// export default menuSlice.reducer;
