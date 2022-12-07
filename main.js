import "./style.css";

const closeButton = document.querySelector(".close");

function getElement(selection) {
  const element = document.querySelector(selection);

  if (element) {
    return element;
  } else {
    throw Error("There no such " + selection + "element");
  }
}

const sideBar = getElement(".sidebar");
const icon = getElement(".icon");

closeButton.addEventListener("click", () => {
  sideBar.classList.remove("show__sidebar");
});

icon.addEventListener("click", () => {
  //   console.log("click");
  sideBar.classList.add("show__sidebar");
});

icon.addEventListener("click", () => {
  //   console.log("click");
  sideBar.classList.add("show__sidebar");
});

// added the onclick for add to  cart
const shop = document.querySelector(".products__container");
// console.log("🚀 ~ file: main.js:33 ~ shoppingIcon", shoppingIcon);

window.addEventListener("DOMContentLoaded", () => {
  displayShop();
  increment();
  decrement();
});

const shopData = [
  { id: 1, name: "a", image: "/images/product1.jpg", price: 3802 },
  { id: 2, name: "b", image: "/images/product2.jpg", price: 380 },
  { id: 3, name: "c", image: "/images/product3.jpg", price: 382 },
  { id: 4, name: "d", image: "/images/product4.jpg", price: 302 },
  { id: 5, name: "e", image: "/images/product5.jpg", price: 302 },
  { id: 6, name: "f", image: "/images/product6.jpg", price: 202 },
  { id: 7, name: "g", image: "/images/product7.jpg", price: 102 },
  { id: 8, name: "h", image: "/images/product8.jpg", price: 502 },
];

displayShop();
let cart = getLocalStorage("cart") || [];

const displayShop = () => {
  shop.innerHTML = shopData
    .map((data) => {
      const { name, image, price, id } = data;

      const search = cart.find((e) => e.id === id) || [];

      return `<article class="product__main__card">
          <img
            src="${image}"
            alt="product 1"
            class="product__main__image"
          />
          <h2 class="product__name">${name}</h2>
          <div class="product__footer">
            <span class="product__price">₹ ${price}</span>
            <div class="cart__quantity">
              <i class="fa-solid fa-plus plus  increment"   ></i>
              <div class="quantity"  id=${id} >${
        search.item === undefined ? 0 : search.item
      }</div>
              <i class="fa-solid fa-minus minus  decrement"></i>
            </div>
          </div>
        </article>`;
    })
    .join(" ");
};

function getLocalStorage(item) {
  const data = localStorage.getItem(item);
  if (data) {
    return JSON.parse(localStorage.getItem(item));
  }
  return [];
}

const increment = () => {
  document.querySelectorAll(".increment").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      // console.log("inc");
      // console.log(e.target.nextSibling.nextSibling.id);
      const id = e.target.nextSibling.nextSibling.id;

      const search = cart.find((item) => item.id === id);
      // console.log(
      //   "🚀 ~ file: main.js:88 ~ ele.addEventListener ~ search",
      //   search
      // );

      if (search === undefined) {
        cart.push({
          id: id,
          item: 1,
        });
      } else {
        search.item += 1;
      }
      update(id);

      // console.log(cart);
      // console.log(search);
    });
  });
};

const decrement = () => {
  document.querySelectorAll(".decrement").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      // console.log(e.target.previousSibling.previousSibling.id);

      const id = e.target.previousSibling.previousSibling.id;
      const search = cart.find((item) => item.id === id);
      // console.log(
      //   "🚀 ~ file: main.js:88 ~ ele.addEventListener ~ search",
      //   search
      // );

      if (search.item === 0) {
        return;
      } else {
        search.item -= 1;
      }

      // console.log(cart);
      // console.log(search);
      update(id);
    });
  });
};
const update = (id) => {
  const searchId = cart.find((ele) => ele.id === id);

  // console.log("🚀 ~ file: main.js:135 ~ update ~ searchId", searchId.item);
  document.getElementById(id).innerHTML = searchId.item;
  // console.log("update", id);

  calculate();
  localStorage.setItem("cart", JSON.stringify(cart));
};

function calculate() {
  const total = document.querySelector(".total__cart__quantity");
  total.innerHTML = cart
    .map((e) => e.item)
    .reduce((acc, curr) => acc + curr, 0);
  // console.log("🚀 ~ file: main.js:152 ~ calculate ~ totalItems", totalItems);

  // total.innerHTML =
}
