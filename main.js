const { preview } = require("vite");

const closeButton = document.querySelector(".close");
const sideBar = document.querySelector(".sidebar");
const bagIcon = document.querySelector(".bag__icon");

const cartContainer = document.querySelector(".cart__container");
// const price = document.querySelectorAll(".cart__price");
// const quantity = document.querySelectorAll(".cart__number");

// variable

let total = 0;
let priceValue;
let quantityValue;

closeButton.addEventListener("click", () => {
  // console.log("click");
  sideBar.classList.add("show__sidebar");
});

bagIcon.addEventListener("click", () => {
  console.log("click");
  sideBar.classList.remove("show__sidebar");
});

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  //   console.log("loaded");
  const btnDelete = document.querySelectorAll(".btn--delete");

  for (const del of btnDelete) {
    del.addEventListener("click", (e) => {
      //   console.log("click");
      const buttonDelete = e.target.parentElement;
      //   console.log(`buttonDelete`, buttonDelete);

      if (buttonDelete.classList.contains("btn--delete")) {
        // console.log("delete");
        buttonDelete.parentElement.remove();
      }
    });
  }
}

// updateTotal();

// function updateTotal() {
//   const cartContainer = document.querySelector(".cart__container");

//   const priceDOM = cartContainer.querySelectorAll(".cart__price");
//   const quantityDOM = cartContainer.querySelectorAll(".cart__number");

//   let priceValue;
//   let quantityValue;

//   for (const pd of priceDOM) {
//     priceValue = parseFloat(pd.textContent.split(" ")[1]);
//   }
//   for (const qd of quantityDOM) {
//     quantityValue = parseFloat(qd.value);
//   }

//   total = total + priceValue * quantityValue;
//   console.log(`total`, total);
// }
