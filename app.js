const openCart = document.querySelector(".cart__icon");
const closeCart = document.querySelector(".close__cart");
const productDOM = document.querySelector(".product__center");
const cartDOM = document.querySelector(".cart__center");
const itemsTotal = document.querySelector(".item__total");
const cartTotal = document.querySelector(".cart__total");

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
    const buttons = [...document.querySelectorAll(".addToCart")];

    buttonDOM = buttons;
    buttons.forEach((button) => {
      const id = button.dataset.id;
      const inCart = cart.find((item) => item.id === id);

      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }

      //when click, passing callback function
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.innerText = "In Cart";
        e.target.disabled = true;

        //get product from products
        const cartItem = { ...Storage.getProducts(id), amount: 1 }; //add spread operator and amount property
        console.log(cartItem);
        //add the product to cart
        cart = [...cart, cartItem]; //iterate cart and show cartItem
        //store the product in local storage
        Storage.saveCart(cart);
        //setItemValues
        this.setItemValues(cart);
        //display the items in the cart
        this.addToCart(cartItem);
      });
    });
  }
  setItemValues(cart) {
    let tempTotal = 0;
    let itemTotal = 0;

    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemTotal += item.amount;
    });

    itemsTotal.innerText = itemTotal;
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2)); //2 decimal places
  }

  addToCart({ title, price, image, id }) {
    let div = document.createElement('div');
    div.classList.add('cart__item');

    div.innerHTML = `<img src=${image} alt="">
    <div>
      <h3>${title}</h3>
      <h3 class="price">$${price}</h3>
    </div>
    <div>
      <span data-id=${id}>
        <svg>
          <use xlink:href="./images/sprite.svg#icon-angle-up"></use>
        </svg>
      </span>
      <p>3</p>
      <span data-id=${id}>
        <svg>
          <use xlink:href="./images/sprite.svg#icon-angle-down"></use>
        </svg>
      </span>
    </div>

    <div>
      <span class="remove__item">
        <svg>
          <use xlink:href="./images/sprite.svg#icon-trash"></use>
        </svg>
      </span>
    </div>`;

    cartDOM.appendChild(div);
  }
}

//storage
//use static method
class Storage {
  static saveProducts(obj) {
    localStorage.setItem("products", JSON.stringify(obj));
  }

  static saveCart(cart) {
    localStorage.setItem("carts", JSON.stringify(cart));
  }
  static getProducts(id) {
    const products = JSON.parse(localStorage.getItem("products"));
    return products.find((item) => item.id === parseInt(id));
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
