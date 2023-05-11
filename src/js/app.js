import utils from './utils.js';
import {select, settings, templates, className} from './settings.js';


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
        thisCoffeeProducts.initList();
      })
      .then(function(){
        thisCoffeeProducts.revDisplay();
      });
  }

  initList(){
    const thisCoffeeProducts = this;
    
    for(let product in thisCoffeeProducts.books){
  
      const generatedHTML = templates.productsTemplate.coffeeList(thisCoffeeProducts.books[product]); 
      const showProducts = utils.createDOMFromHTML(generatedHTML);
      thisCoffeeProducts.productsList.appendChild(showProducts);
      
    }
  }

  revDisplay(){
    const thisCoffeeProducts = this;
    thisCoffeeProducts.productsDetails = document.querySelectorAll(select.containerOf.productsDetails);
    for(let idProduct of thisCoffeeProducts.productsDetails){
      if (idProduct.getAttribute('id')%2 == 0){
        idProduct.classList.add(className.showProductsreverse.reverse);
      }
    }
  }
}
const app = new coffeeProducts();
console.log(app);







  