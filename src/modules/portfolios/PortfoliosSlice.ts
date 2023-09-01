import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PortfoliosApiResponse, PortfoliosModel } from './types';
import { http } from '../../common/http';
import { portfolios as portfoliosMock } from './components/portfolios/mock';

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
  portfolios: portfoliosMock,
};

const portfoliosSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPortfolios.fulfilled, (state, action) => {
      const { count = 0, portfolios = [] } = action.payload;
      state.count = count;
      state.portfolios = portfolios;
    });
  },
});

export const { reducer } = portfoliosSlice;
