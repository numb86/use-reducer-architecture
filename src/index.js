import React, {useReducer, useEffect} from 'react';
import ReactDOM from 'react-dom';

import {reducer, initialState} from './modules/index';
import {
  createAsyncSupportDispatch,
  actionCreatorsConnectDispatch,
} from './modules/dispatch';
import products from './modules/products';

import App from './components/App';

const Container = () => {
  const [state, originalDispatch] = useReducer(reducer, initialState);
  const dispatch = createAsyncSupportDispatch(originalDispatch);

  const useFetchApi = () => {
    useEffect(() => {
      const executeActionCreators = actionCreators => {
        const connectedActionCreators = actionCreatorsConnectDispatch(
          actionCreators,
          dispatch
        );
        Object.values(connectedActionCreators).forEach(actionCreator => {
          actionCreator();
        });
      };

      executeActionCreators(products.onMountActionCreators);
    }, []);
  };

  const mapActionCreatorsToProps = actionCreators => ({
    ...actionCreatorsConnectDispatch(actionCreators, dispatch),
  });

  const {availableProductList, totalAmount} = products.extractComponentProps(
    state
  );

  return (
    <App
      useFetchApi={useFetchApi}
      availableProductList={availableProductList}
      totalAmount={totalAmount}
      {...mapActionCreatorsToProps({
        updateAmount: products.actionCreators.updateAmount,
      })}
    />
  );
};

ReactDOM.render(<Container />, document.querySelector('#app'));
