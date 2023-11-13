import { Component, OnInit, Input } from "@angular/core";
import { Cart } from "src/app/models/cart.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = { items: [] };

  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, cur) => prev + cur, 0);
  }

  constructor() {}

  ngOnInit(): void {}
}
