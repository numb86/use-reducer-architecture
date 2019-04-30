const fetchAvailabeProductListApi = () =>
  Promise.resolve({
    products: [
      {
        id: 1,
        name: 'ボックスティッシュ',
        price: 300,
      },
      {
        id: 2,
        name: '衣類用洗剤',
        price: 400,
      },
      {
        id: 3,
        name: '歯ブラシ',
        price: 100,
      },
    ],
  });
export default fetchAvailabeProductListApi;
