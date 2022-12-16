const closeButton = document.querySelector(".close");
const sideBar = document.querySelector(".sidebar");
const bagIcon = document.querySelector(".bag__icon");
const totalCartQuantity = document.querySelector(".total__cart__quantity");

// const cartContainer = document.querySelector(".cart__container");
// const price = document.querySelectorAll(".cart__price");
// const quantity = document.querySelectorAll(".cart__number");

// variable

let total = 0;
let priceValue;
let quantityValue;
sideBar.classList.add("show__sidebar");

function openSide() {
  sideBar.classList.remove("show__sidebar");
}

closeButton.addEventListener("click", () => {
  // console.log("click");
  sideBar.classList.add("show__sidebar");
});
// openSide();

function closeSidebar() {
  bagIcon.addEventListener("click", () => {
    // console.log("click");
    sideBar.classList.remove("show__sidebar");
  });
}

closeSidebar();

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  const btnDelete = document.querySelectorAll(".btn--delete");

  for (const del of btnDelete) {
    del.addEventListener("click", deleteButtonFunction());
  }

  const buttonChange = document.querySelectorAll(".cart__number");

  for (const bc of buttonChange) {
    bc.addEventListener("change", (e) => {
      // console.log("click input");

      const targetValue = e.target.value;
      // console.log(`targetValue`, targetValue);

      if (targetValue < 1) {
        e.target.value = 1;
        return;
      } else {
        updateTotal();
      }
    });
  }

  const addCart = document.querySelectorAll(".add__to__cart");

  for (const ac of addCart) {
    ac.addEventListener("click", (e) => {
      const target = e.target.parentElement.parentElement.parentElement;
      // console.log(`target`, target);
      const image = target.querySelector(".product__main__image").src;
      // console.log(`image`, image);
      const title = target.querySelector(".product__name").textContent;
      const price = target.querySelector(".product__price").textContent;
      // console.log(`price`, price);

      openSide();
      addToCart(image, title, price);
    });
  }
}

const buyNow = document.querySelector(".btn--buy");

buyNow.addEventListener("click", removeAllItems);

function removeAllItems(e) {
  if (e.target.classList.contains("btn--buy")) {
    // console.log(e.target);
    const parentElement = e.target.parentElement;
    // console.log(`parentElement`, parentElement);

    const items = parentElement.querySelector(".cart__container");
    // console.log(`items`, items.hasChildNodes());
    // console.log(`items`, items.childNodes.length);

    if (items.childNodes.length === 3 || items.childNodes.length === 0) {
      alert("You cart is empty");
      // console.log("order empty");
      return;
    } else {
      alert("You order is placed");

      while (items.hasChildNodes()) {
        items.removeChild(items.firstChild);
      }

      updateTotal();
    }
  }
}

function deleteButtonFunction() {
  return (e) => {
    const buttonDelete = e.target.parentElement;
    // console.log(buttonDelete.parentElement);

    if (buttonDelete.classList.contains("btn--delete")) {
      buttonDelete.parentElement.remove();
      updateTotal();
    }
  };
}

function addToCart(image, title, price) {
  const cartContainer = document.querySelector(".cart__container");

  const article = document.createElement("article");
  article.className = "cart__card";

  const cartItemName = document.querySelectorAll(".cart__name");
  // console.log(`cartItemName`, cartItemName);

  for (const cIN of cartItemName) {
    if (cIN.textContent == title) {
      alert("item already added");
      sideBar.classList.add("show__sidebar");
      return;
    }
  }

  article.innerHTML = ` <img
                src=${image}
                alt="product 1"
                class="product__cart__image"
              />
              <div class="cart__content">
                <h2 class="cart__name">${title}</h2>
                <h3 class="cart__price">${price}</h3>
                <input
                  type="number"
                  name="number"
                  id="number"
                  class="cart__number"
                  value="1"
                />
              </div>
              <button class="btn btn--delete">
                <i class="fa-solid fa-trash"></i>
              </button>`;
  cartContainer.appendChild(article);

  cartContainer.addEventListener("click", (e) => {
    const buttonDelete = e.target.parentElement;

    if (buttonDelete.classList.contains("btn--delete")) {
      buttonDelete.parentElement.remove();
      updateTotal();
    }

    // console.log(e.target);

    if (e.target.classList.contains("cart__number")) {
      const targetValue = e.target.value;
      // console.log(`targetValue`, targetValue);

      if (targetValue <= 0 || isNaN(targetValue)) {
        e.target.value = 1;
        return;
      } else {
        updateTotal();
      }
    }
  });

  updateTotal();
}

function updateTotal() {
  const cartCard = document.querySelectorAll(".cart__card");
  const totalDOM = document.querySelector(".total");
  let priceValue;
  let quantityValue;
  let total = 0;
  let totalQuantity = 0;
  for (const cc of cartCard) {
    // console.log(`cc`, cc);
    priceValue = parseFloat(
      cc.querySelector(".cart__price").textContent.split(" ")[1]
    );

    // console.log(`priceValue`, priceValue);
    quantityValue = parseFloat(cc.querySelector(".cart__number").value);
    // console.log(`quantityValue`, quantityValue);

    total = total + priceValue * quantityValue;
    totalQuantity = totalQuantity + quantityValue;
    // console.log(`total`, total);
  }

  totalCartQuantity.textContent = totalQuantity;

  totalDOM.innerHTML = total;
}
