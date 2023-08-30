import Cookies from "js-cookie";
import toast from "react-hot-toast";

export function AddCart(id) {
  if (typeof window !== "undefined") {
    if (Cookies.get("cart")) {
      let cart = Cookies.get("cart");

      Cookies.set("cart", cart + id + ",");
      toast.success("Product toegevoegd!");
    } else {
      Cookies.set("cart", id + ",");
    }
  }
}

export function RemoveItem(id) {
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

export function GetCart() {
  if (typeof window !== undefined) {
    if (Cookies.get("cart")) {
      let cart = Cookies.get("cart");
      return cart;
    } else {
      let cart = 0;
      return cart;
    }
  }
}
