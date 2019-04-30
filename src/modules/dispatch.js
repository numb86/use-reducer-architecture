// 非同期処理にも対応した dispatch を作成して返す
export const createAsyncSupportDispatch = originalDispatch => action => {
  if (action instanceof Promise) {
    action.then(res => originalDispatch(res));
  } else {
    originalDispatch(action);
  }
};

export const actionCreatorsConnectDispatch = (actionCreators, dispatch) => {
  const obj = {};
  Object.entries(actionCreators).forEach(([key, value]) => {
    obj[key] = (...arg) => {
      dispatch(value(...arg));
    };
  });
  return obj;
};
