import Cookies from "js-cookie";

export function addCart(id) {
  if (typeof window !== "undefined") {
    if (Cookies.get("cart")) {
      let cart = Cookies.get("cart");

      Cookies.set("cart", cart + id + ",");
    } else {
      Cookies.set("cart", id + ",");
    }
  }
}

export function removeItem(id) {
  if (typeof window !== "undefined") {
    if (Cookies.get("cart")) {
      let newCart;
      let cart = Cookies.get("cart");
      Cookies.remove("cart");

      newCart = cart.replace(id + ",", "");

      Cookies.set("cart", newCart);
    } else {
      return;
    }
  }
}

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
