import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppModel } from './types';

export const name = 'app';

const initialState: AppModel = {
  firstLoad: true,
};

const AppSlice = createSlice({
  name,
  initialState,
  reducers: {
    setFirstLoad(state, action: PayloadAction<boolean>) {
      state.firstLoad = action.payload;
    },
  },
});

export const { reducer: appReducer, actions: appActions } = AppSlice;
