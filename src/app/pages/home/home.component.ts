// Import the necessary Angular modules
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

// Component metadata
@Component({
  selector: "app-home", // Component's selector
  templateUrl: "./home.component.html", // Template URL
  styles: [], // Inline styles (currently empty)
})
// Component class definition
export class HomeComponent implements OnInit, OnDestroy {
  // Number of columns to display
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];

  // Current category to show (can be undefined)
  category: string | undefined;

  // Declared as a array of products, or can be undefined
  products: Array<Product> | undefined;
  sort = "desc";
  count = "12";
  productSubscription: Subscription | undefined;

  // Constructor (currently empty)
  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  // OnInit lifecycle hook (currently empty)
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSubscription = this.storeService
      .getAllProducts(this.count, this.sort)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  // Method to update the number of columns
  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  // Method to update the category to show
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  ngOnDestroy(): void {
    if(this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
