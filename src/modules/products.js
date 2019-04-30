import fetchAvailabeProductListApi from '../api';

const FETCH_AVAILABLE_PRODUCT_LIST = 'FETCH_AVAILABLE_PRODUCT_LIST';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const initialState = {
  availableProductList: {},
};

const reducer = (state, action) => {
  const {type, payload} = action;
  const mergeNewObjectInProducts = newObject => ({
    ...state,
    products: {
      ...state.products,
      ...newObject,
    },
  });

  switch (type) {
    case FETCH_AVAILABLE_PRODUCT_LIST:
      return mergeNewObjectInProducts({availableProductList: payload.products});

    case UPDATE_PRODUCT: {
      const {key, product} = payload;

      const availableProductList = {
        ...state.products.availableProductList,
      };
      availableProductList[key] = product;

      return mergeNewObjectInProducts({availableProductList});
    }

    default:
      return null;
  }
};

const updateAmount = (product, amount) => {
  const {id, name, price} = product;
  return {
    type: UPDATE_PRODUCT,
    payload: {
      key: id,
      product: {
        name,
        price,
        orderAmount: amount,
      },
    },
  };
};

const actionCreators = {
  updateAmount,
};

const fetchAvailabeProductList = async () => {
  const res = await fetchAvailabeProductListApi();

  const result = {};
  res.products.forEach(p => {
    result[p.id] = {
      ...p,
      orderAmount: 0,
    };
    delete result[p.id].id;
  });

  return {
    type: FETCH_AVAILABLE_PRODUCT_LIST,
    payload: {
      products: result,
    },
  };
};

const onMountActionCreators = {
  fetchAvailabeProductList,
};

const extractComponentProps = state => {
  const availableProductList = Object.entries(
    state.products.availableProductList
  ).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const totalAmount = availableProductList.reduce(
    (acc, product) => acc + product.price * product.orderAmount,
    0
  );

  return {availableProductList, totalAmount};
};

const products = {
  initialState,
  reducer,
  actionCreators,
  onMountActionCreators,
  extractComponentProps,
};
export default products;
