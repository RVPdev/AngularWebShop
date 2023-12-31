// Import necessary Angular core modules and custom models
import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

// @Component decorator defines metadata for the CartComponent
@Component({
  selector: "app-cart", // Specifies the custom HTML tag to be used for this component
  templateUrl: "./cart.component.html", // Path to the HTML template for this component
})
export class CartComponent implements OnInit {
  // cart: An object of type Cart, initialized with a single CartItem
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150", // URL of product image
        name: "sneakers", // Name of the product
        price: 150, // Price of the product
        quantity: 1, // Initial quantity of the product in the cart
        id: 1, // Unique identifier for the cart item
      },
    ],
  };

  // dataSource: An array to hold CartItem objects for display purposes
  dataSource: Array<CartItem> = [];

  // displayedColumns: Defines the columns to be displayed in the cart table
  displayedColumns: Array<string> = [
    "product", // Column for product image
    "name", // Column for product name
    "price", // Column for product price
    "quantity", // Column for product quantity (typo in 'quantity')
    "total", // Column for the total price of the item (price * quantity)
    "action", // Column for actions like remove or edit
  ];

  // Constructor function for the CartComponent class
  constructor(private cartService: CartService) {}

  // ngOnInit lifecycle hook to initialize component properties
  ngOnInit(): void {
    this.dataSource = this.cart.items; // Assigning the cart items to dataSource for rendering
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    // Method to calculate total of cart
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }
}
