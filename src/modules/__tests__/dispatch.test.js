import {
  createAsyncSupportDispatch,
  actionCreatorsConnectDispatch,
} from '../dispatch';

const assert = require('assert');

describe('createAsyncSupportDispatch', () => {
  it('作成した関数に Promise オブジェクト以外を渡すと、それを引数にしてオリジナルの dispatch を実行する', done => {
    const originalDispatch = res => {
      assert.deepStrictEqual(res, 3);
      done();
    };
    const asycnSupportDispatch = createAsyncSupportDispatch(originalDispatch);
    asycnSupportDispatch(3);
  });

  it('作成した関数に Promise オブジェクトを渡すと、それを解決した値を引数にしてオリジナルの dispatch を実行する', done => {
    const originalDispatch = res => {
      assert.deepStrictEqual(res, 5);
      done();
    };
    const asycnSupportDispatch = createAsyncSupportDispatch(originalDispatch);
    asycnSupportDispatch(Promise.resolve(5));
  });
});

describe('actionCreatorsConnectDispatch', () => {
  it('actionCreators に入っている全てのメソッドを dispatch でラップする', () => {
    const actionCreators = {
      double: x => x * 2,
      plus: (x, y) => x + y,
    };
    const mock = jest.fn();
    const connectedActionCreators = actionCreatorsConnectDispatch(
      actionCreators,
      mock
    );

    expect(mock).not.toHaveBeenCalled();
    connectedActionCreators.double(3);
    expect(mock).toHaveBeenNthCalledWith(1, 6);
    connectedActionCreators.plus(3, 4);
    expect(mock).toHaveBeenNthCalledWith(2, 7);
  });
});
