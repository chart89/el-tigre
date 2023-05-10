import utils from './utils.js';
import {select, settings, templates} from './settings.js';


class coffeeProducts {
  constructor(){
    const thisCoffeeProducts = this;
    thisCoffeeProducts.getElements();
    thisCoffeeProducts.initData();
  }

  getElements(){
    const thisCoffeeProducts = this;
    thisCoffeeProducts.productsList = document.querySelector(select.containerOf.productList);

  }

  initData(){
    const thisCoffeeProducts = this;

    const url = settings.db.url;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parasedResponse){
   
        thisCoffeeProducts.books = parasedResponse;
    
    
        for(let product in thisCoffeeProducts.books){
          const generatedHTML = templates.productsTemplate.coffeeList(thisCoffeeProducts.books[product]); 
          const showProducts = utils.createDOMFromHTML(generatedHTML);
          thisCoffeeProducts.productsList.appendChild(showProducts);
        }
      });
  }
}
const app = new coffeeProducts();







  