import utils from './utils.js';
import {select, settings, templates, className} from './settings.js';


class App {
  constructor(){
    const thisApp = this;
    thisApp.getElements();
    thisApp.initData();
    thisApp.initPages();
    thisApp.initActions();
  }

  getElements(){
    const thisApp = this;
    thisApp.productsList = document.querySelector(select.containerOf.productList);
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    thisApp.name = document.querySelector(select.cart.name);
    thisApp.title = document.querySelector(select.cart.title);
    thisApp.message = document.querySelector(select.cart.message);
    thisApp.form = document.querySelector(select.cart.form);
  }

  initData(){
    const thisApp = this;

    const url = settings.db.url + '/' + settings.db.products;
    
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

  initPages(){
    const thisApp = this;

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[1].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        /*get page id from href attributr */
        const id = clickedElement.getAttribute('href').replace('#', '');
        /*run thisApp.activatePage with that id */
        thisApp.activatePage(id);

        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  }

  activatePage(pageId){
    const thisApp = this;

    /* add class "active" to matching pages ,remove from non-matching */
    for(let page of thisApp.pages){
      page.classList.toggle(className.pages.active, page.id == pageId);
      
    }
    if(pageId == className.pageId.home){
      thisApp.pages[0].classList.add(className.pages.active);
    }
    /* add class "active" to matching links ,remove from non-matching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        className.nav.active, 
        link.getAttribute('href') == '#' + pageId
      );
    }
  }

  initActions(){
    const thisApp = this;

    thisApp.form.addEventListener('submit', function(){
      event.preventDefault();
      thisApp.sendForm();
    });
  }

  sendForm(){
    const thisApp = this;
    const url = settings.db.url + '/' + settings.db.form;

    const payload = {
      name: thisApp.name.value,
      title: thisApp.title.value,
      message: thisApp.message.value,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
      
    fetch(url, options)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });

  }
}
const app = new App();
console.log(app);







  