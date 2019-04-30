import products from './products';

export const initialState = {
  products: products.initialState,
};

export const reducer = (state, action) =>
  products.reducer(state, action) || state;
