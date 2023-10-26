// Import the necessary Angular modules
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

// Component metadata
@Component({
  selector: "app-filters", // Component's selector
  templateUrl: "filters.component.html", // Template URL
})
// Component class definition
export class FiltersComponent implements OnInit {

  // Output event emitter for showing categories
  @Output() showCategory = new EventEmitter<string>();

  // Array of categories to filter by
  categories = ["shoes", "sports"];

  // Constructor (currently empty)
  constructor() {}

  // OnInit lifecycle hook (currently empty)
  ngOnInit(): void {}

  // Method to emit the selected category
  onShowCategory(category: string): void {
    // Emit the selected category
    this.showCategory.emit(category);
  }
}
