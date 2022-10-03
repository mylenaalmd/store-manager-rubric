const getSalesTest = [
  {
    "saleId": 1,
    "date": "2022-10-02T21:58:37.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-10-02T21:58:37.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-10-02T21:58:37.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const getSalesIdTest = [
  {
    "date": "2022-10-02T21:58:37.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-10-02T21:58:37.000Z",
    "productId": 2,
    "quantity": 10
  }
]

const returnAddSaleTest =  {
    "id": 5,
    "itemsSold": [
      {
        "productId": 3,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
}
  
const addSaleTest =  [
  {
    "productId": 3,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

module.exports = {
  getSalesTest,
  getSalesIdTest,
  addSaleTest,
  returnAddSaleTest,
}