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

const shoppingIcon = document.querySelectorAll(".shopping__icon");

// added the onclick for add to  cart

window.addEventListener();

shoppingIcon.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (e.target.classList.contains("shopping__icon")) {
      sideBar.classList.add("show__sidebar");
      addToCart(e.target);
    }
  });
});

function addToCart(target) {
  //   console.log(
  //     target.parentElement.parentElement.querySelector(".product__main__image")
  //       .src
  //   );

  const price = target.parentElement
    .querySelector(".product__price")
    .innerHTML.split(" ")[1];
  const name =
    target.parentElement.parentElement.querySelector(
      ".product__name"
    ).innerHTML;
  const src = target.parentElement.parentElement.querySelector(
    ".product__main__image"
  ).src;

  const container = document.createElement("article");
  container.className = "cart__card";
  //   console.log(container);
  container.innerHTML = ` 
              <img
                src="${src}"
                alt="product 1"
                class="product__image"
              />
              <div class="cart__content">
                <h2 class="cart__name">${name}</h2>
                <h3 class="cart__price">${price}</h3>
                <input
                  type="number"
                  name="number"
                  id="number"
                  class="cart__number"
                />
              </div>
              <button class="btn btn--delete">
                <i class="fa-solid fa-trash"></i>
              </button>`;

  const containerCart = getElement(".cart__container");
  containerCart.appendChild(container);
}
