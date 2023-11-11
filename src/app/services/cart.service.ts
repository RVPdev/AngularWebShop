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
    this._snackBar.open('1 item added to cart.', 'Ok', {duration: 3000});

    // Logging the current state of the cart to the console (useful for debugging)
    console.log(this.cart.value);
  }
}
