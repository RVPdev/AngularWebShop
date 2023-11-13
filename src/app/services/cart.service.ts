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

  /**
   * Calculates the total price of all items in the cart.
   * @param items - Array of CartItem objects.
   * @returns The total price as a number.
   */
  getTotal(items: Array<CartItem>): number {
    // Maps each item to its total price (price * quantity), then reduces the array to a single total sum
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  /**
   * Clears all items from the cart.
   */
  clearCart(): void {
    // Sets the cart's items to an empty array
    this.cart.next({ items: [] });
    // Displays a snack bar notification that the cart has been cleared
    this._snackBar.open("Cart is cleared", "Ok", { duration: 3000 });
  }

  /**
   * Removes a specific item from the cart.
   * @param item - The item to be removed.
   * @param update - Boolean to indicate whether to update the cart and show notification.
   * @returns The updated array of CartItem objects.
   */
  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    // Filters out the item to be removed from the cart's items
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    // Updates the cart and shows a snack bar notification if 'update' is true
    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open("1 item removed from cart.", "Ok", {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  /**
   * Decreases the quantity of a specific item in the cart. If quantity reaches 0, removes the item.
   * @param item - The item for which the quantity needs to be decreased.
   */
  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;

    // Iterates through each item, decreasing its quantity if it matches the specified item
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        // Mark the item for removal if quantity reaches 0
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    // If an item is marked for removal, remove it from the cart
    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }
    // Update the cart with the new list of items
    this.cart.next({ items: filteredItems });
    // Display a notification about the item removal
    this._snackBar.open("1 item removed from cart.", "Ok", { duration: 3000 });
  }
}
