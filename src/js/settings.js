export const select = {
  templateOf: {
    coffeeProducts: '#template-products',
  },
  containerOf: {
    productList: '.products-list',
    productsDetails: '.products-details',
    pages: '#pages',
  },
  nav: {
    links: '.rh-menu a',
  },
  cart: {
    form: '.send-form',
    name: '[name="name"]',
    title: '[name="title"]',
    message: '[name="message"]',
  },
};
 
export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    products: 'products',
    form: 'form',
  },
};

export const templates = {
  productsTemplate: {
    coffeeList: Handlebars.compile(document.querySelector(select.templateOf.coffeeProducts).innerHTML),
  },
};

export const className = {
  showProductsreverse: {
    reverse: 'reverse',
  },
  pages: {
    active: 'active',
  },
  nav: {
    active: 'active',
  },
  pageId: {
    home: 'home',
  },
};