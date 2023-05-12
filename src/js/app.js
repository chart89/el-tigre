import utils from './utils.js';
import {select, settings, templates, className} from './settings.js';


class App {
  constructor(){
    const thisApp = this;
    thisApp.getElements();
    thisApp.initData();
  }

  getElements(){
    const thisApp = this;
    thisApp.productsList = document.querySelector(select.containerOf.productList);
  }

  initData(){
    const thisApp = this;

    const url = settings.db.url;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parasedResponse){
   
        thisApp.coffeeBean = parasedResponse;
        thisApp.initList();
      })
      .then(function(){
        thisApp.revDisplay();
      });
  }

  initList(){
    const thisApp = this;
    
    for(let product in thisApp.coffeeBean){
  
      const generatedHTML = templates.productsTemplate.coffeeList(thisApp.coffeeBean[product]); 
      const showProducts = utils.createDOMFromHTML(generatedHTML);
      thisApp.productsList.appendChild(showProducts);
      
    }
  }

  revDisplay(){
    const thisApp = this;
    thisApp.productsDetails = document.querySelectorAll(select.containerOf.productsDetails);
    for(let idProduct of thisApp.productsDetails){
      if (idProduct.getAttribute('id')%2 == 0){
        idProduct.classList.add(className.showProductsreverse.reverse);
      }
    }
  }
}
const app = new App();
console.log(app);







  