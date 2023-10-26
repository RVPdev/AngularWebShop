// Import necessary Angular modules
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

// Component metadata
@Component({
  selector: "app-products-header", // Component selector
  templateUrl: "products-header.component.html", // Template URL
})
// Component class definition
export class ProductsHeaderComponent implements OnInit {
  
  // Output event emitter for column count changes
  @Output() columsCountChange = new EventEmitter<number>();

  // Default sorting order
  sort = "desc";
  
  // Default number of items to show
  itemShowCount = 12;

  // Constructor (currently empty)
  constructor() {}

  // OnInit lifecycle hook (currently empty)
  ngOnInit(): void {}

  // Method to update sorting order
  onSortUpdate(newSort: string): void {
    this.sort = newSort;
  }

  // Method to update the number of items to show
  onItemsUpdated(count: number): void {
    this.itemShowCount = count;
  }

  // Method to update the number of columns to display
  onColumnsUpdated(colsNumber: number): void {
    // Emit the new column count
    this.columsCountChange.emit(colsNumber);
  }
}
