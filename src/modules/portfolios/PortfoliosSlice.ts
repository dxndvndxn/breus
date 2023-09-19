import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PortfoliosApiResponse, PortfoliosModel } from './types';
import { http } from '../../common/http';

export const name = 'portfolios';

export const fetchPortfolios = createAsyncThunk(
  `${name}/fetchPortfolios`,
  async (start: number, { rejectWithValue }) => {
    try {
      return await http({ api: 'portfolios-list', params: { start } });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const initialState: PortfoliosModel = {
  start: 0,
  count: 0,
  portfolios: [],
  canFetchMorePortfolios: true,
};

const portfoliosSlice = createSlice({
  name,
  initialState,
  reducers: {
    setStart(state, action: PayloadAction<number>) {
      state.start = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPortfolios.fulfilled,
      (
        state,
        action: PayloadAction<{
          count: number;
          portfolios: PortfoliosApiResponse['portfolios'];
        }>
      ) => {
        const { count = 0, portfolios } = action.payload;
        state.count = count;
        state.portfolios = [...state.portfolios, ...portfolios];
        state.canFetchMorePortfolios = !!portfolios.length;
      }
    );
  },
});

export const { reducer, actions: portfoliosActions } = portfoliosSlice;
