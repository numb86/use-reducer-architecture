import React from 'react';

import SelectBox from './SelectBox';

const MAX_AMOUNT = 5;

const App = ({
  useFetchApi,
  availableProductList,
  totalAmount,
  updateAmount,
}) => {
  useFetchApi();

  return (
    <>
      <h1>商品を選んでください</h1>

      {availableProductList.map(p => (
        <p key={p.id}>
          {p.name} {p.price}円{` `}
          <SelectBox
            list={[...Array(MAX_AMOUNT + 1)].map((i, index) => String(index))}
            selectedItem={String(p.orderAmount)}
            onChange={e => updateAmount(p, Number(e.target.value))}
          />
        </p>
      ))}

      <h1>注文内容</h1>
      <p>合計金額： {totalAmount}円</p>
    </>
  );
};
export default App;
