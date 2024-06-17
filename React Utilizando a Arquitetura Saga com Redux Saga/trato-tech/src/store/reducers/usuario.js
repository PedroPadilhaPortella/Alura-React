import { createSlice } from '@reduxjs/toolkit';

const usuarioSlice = createSlice({
  name: 'usuarios',
  initialState: {},
  reducers: {
    addUser: (state, { payload }) => {
      return payload;
    }
  }
});

export const { addUser } = usuarioSlice.actions;

export default usuarioSlice.reducer;