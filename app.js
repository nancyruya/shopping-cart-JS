const openCart = document.querySelector(".cart__icon");
const closeCart = document.querySelector(".close__cart");
const productDOM = document.querySelector(".product__center");
const cartDOM = document.querySelector(".cart__center");

let cart = [];

let buttonDOM = [];

//UI
class UI {
    displayProducts(obj) {
        let results = "";
        obj.forEach(({ title, image, id, price }) => {
            results += `<div class="product">
            <div class="image__container">
              <img src=${image} alt="" />
            </div>
            <div class="product__footer">
              <h1>${title}</h1>
              <div class="rating">
                <span>
                  <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                  </svg>
                </span>
                <span>
                  <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                  </svg>
                </span>
                <span>
                  <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                  </svg>
                </span>
                <span>
                  <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                  </svg>
                </span>
                <span>
                  <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-empty"></use>
                  </svg>
                </span>
              </div>
              <div class="bottom">
                <div class="btn__group">
                  <a href="#" class="btn addToCart" data-id=${id}>Add to Cart</a>
                  <a href="#" class="btn view">View</a>
                </div>
                <div class="price">$${price}</div>
              </div>
            </div>
          </div>`;
        });

        productDOM.innerHTML = results;
    }

    getButtons() {
        const buttons = [...document.querySelectorAll('.addToCart')]
        
        buttonDOM = buttons
        buttons.forEach(button=>{
            const id = button.dataset.id;
            console.log(id);
        })
    }
}

//storage
//use static method
class Storage {
    static saveProducts(obj){
        localStorage.setItem("products", JSON.stringify(obj));
    }
}

//products
//using fetch api so using async, await the result
class Products {
  async getProducts() {
    try {
      const results = await fetch("products.json");
      const data = await results.json();
      const products = data.items;
      return products;
    } catch (err) {
      console.log(err);
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const ui = new UI();
  const products = new Products();

  const productsObj = await products.getProducts();
  ui.displayProducts(productsObj);
  ui.getButtons();
  Storage.saveProducts(productsObj);
});
