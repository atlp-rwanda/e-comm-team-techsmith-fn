const orderDetails = {
  id: 551,
  productId: 1346,
  userId: 692,
  status: 'Paid',
  quantity: 1,
  amount: 120,
  createdAt: '2023-06-25T16:20:21.571Z',
  updatedAt: '2023-06-25T16:20:32.221Z',
  user: {
    name: 'Kevine Karenzi'
  },
  product: {
    name: 'producthbloaducit',
    image: [
      'http://res.cloudinary.com/nishimweprince/image/upload/v1687707495/products/pexels-photo-376464_opmwxp_qlrwhy.jpg',
      'http://res.cloudinary.com/nishimweprince/image/upload/v1687707495/products/qpww5y9guwavcx29bl3p_buiu6n.jpg',
      'http://res.cloudinary.com/nishimweprince/image/upload/v1687707495/products/rbsfje0ufqchiwptioi0_tcdtgk.jpg',
      'http://res.cloudinary.com/nishimweprince/image/upload/v1687707495/products/pexels-photo-1139556_ss8bv5_y4oz4y.jpg'
    ],
    price: 120,
    quantity: 18
  }
};

const ordersToPay = {
  ids: [551, 553, 550],
  amount: 85630,
  user: {
    email: 'Kevine440@gmail.com',
    name: 'Kevine Karenzi',
    telephone: 'null'
  }
};

export { orderDetails, ordersToPay };
