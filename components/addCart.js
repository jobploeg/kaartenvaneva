export function addCart(id) {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      let cart = localStorage.cart + ",";
      let product = JSON.stringify(id);

      localStorage.cart = cart + product;

      //make array from string
      //gone need that later, not important now!!!
      cart = cart.split(",");
    } else {
      localStorage.setItem("cart", JSON.stringify(id));
    }
  }
}

export function removeCart() {}

export function getCart() {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      let cart = localStorage.getItem("cart");
      return cart;
    } else {
      return;
    }
  }
}
