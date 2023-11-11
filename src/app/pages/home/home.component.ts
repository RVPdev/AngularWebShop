// Import the necessary Angular modules
import { Component, OnInit } from "@angular/core";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

// Component metadata
@Component({
  selector: "app-home", // Component's selector
  templateUrl: "./home.component.html", // Template URL
  styles: [], // Inline styles (currently empty)
})
// Component class definition
export class HomeComponent implements OnInit {
  // Number of columns to display
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];

  // Current category to show (can be undefined)
  category: string | undefined;

  // Constructor (currently empty)
  constructor() {}

  // OnInit lifecycle hook (currently empty)
  ngOnInit(): void {}

  // Method to update the number of columns
  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  // Method to update the category to show
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  onAddToCart(): void {
    
  }
}
