// reduxSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 
  listOfMinyans: [],

};

const ReduxSlice = createSlice({
  name: 'slices',
  initialState,
  reducers: {
    setListOfMinyans: (state, action) => {
      state.listOfMinyans = action.payload;
    },
  
  },
});

export const { setListOfMinyans } = ReduxSlice.actions;

export default ReduxSlice.reducer;
