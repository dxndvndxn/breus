import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PortfoliosApiResponse, PortfoliosModel } from './types';
import { http } from '../../common/http';

export const name = 'portfolios';

export const fetchPortfolios = createAsyncThunk(
  `${name}/fetchPortfolios`,
  async (_, { rejectWithValue }) => {
    try {
      return await http({ api: 'portfolios-list' });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const initialState: PortfoliosModel = {
  count: 0,
  portfolios: [],
};

const portfoliosSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [fetchPortfolios.fulfilled]: (
      state: PortfoliosModel,
      action: PayloadAction<PortfoliosApiResponse>
    ) => {
      const { count, portfolios } = action.payload;
      state.count = count;
      state.portfolios = portfolios;
    },
  },
});

export const { reducer } = portfoliosSlice;
