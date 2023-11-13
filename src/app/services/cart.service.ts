// Import necessary Angular core modules and RxJS BehaviorSubject for state management
import { Injectable } from "@angular/core";
import { Cart, CartItem } from "../models/cart.model";
import { BehaviorSubject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

// @Injectable decorator indicates that this class can be injected as a dependency
@Injectable({
  providedIn: "root", // Indicates that this service is available in the root injector
})
export class CartService {
  // cart is a BehaviorSubject that keeps track of the cart's state
  cart = new BehaviorSubject<Cart>({ items: [] });

  // Constructor for the CartService class
  constructor(private _snackBar: MatSnackBar) {} // Injects MatSnackBar for showing notifications

  // Method to add an item to the cart
  addToCart(item: CartItem): void {
    // Creates a copy of the current cart items
    const items = [...this.cart.value.items];

    // Checks if the item already exists in the cart
    const itemInCart = items.find((_item) => _item.id === item.id);

    // If the item exists, increment its quantity
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      // If the item doesn't exist, add it to the cart
      items.push(item);
    }

    // Update the cart with the new list of items
    this.cart.next({ items });

    // Display a snack bar notification
    this._snackBar.open("1 item added to cart.", "Ok", { duration: 3000 });
  }

  getTotal(items: Array<CartItem>): number {
    // Method to calculate total of cart
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart is cleared", "Ok", { duration: 3000 });
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open("1 item removed from cart.", "Ok", {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }
    this.cart.next({ items: filteredItems });
    this._snackBar.open("1 item removed from cart.", "Ok", { duration: 3000 });
  }
}
