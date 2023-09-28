import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppModel } from './types';

export const name = 'app';

const initialState: AppModel = {
  animationComplete: false,
};

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAnimationComplete(state, action: PayloadAction<boolean>) {
      state.animationComplete = action.payload;
    },
  },
});

export const { reducer: appReducer, actions: appActions } = appSlice;
