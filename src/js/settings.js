export const select = {
  templateOf: {
    coffeeProducts: '#template-products',
  },
  containerOf: {
    productList: '.products-list',
  },
};
 
export const settings = {
  db: {
    url: '//localhost:3131/el-tigre',
  },
};

export const templates = {
  productsTemplate: {
    coffeeList: Handlebars.compile(document.querySelector(select.templateOf.coffeeProducts).innerHTML),
  },
};