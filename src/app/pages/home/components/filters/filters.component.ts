// Import the necessary Angular modules
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

// Component metadata
@Component({
  selector: "app-filters", // Component's selector
  templateUrl: "filters.component.html", // Template URL
})
// Component class definition
export class FiltersComponent implements OnInit, OnDestroy {
  // Output event emitter for showing categories
  @Output() showCategory = new EventEmitter<string>();

  categoriesSubscription: Subscription | undefined;

  // Array of categories to filter by
  categories: Array<string> | undefined;

  // Constructor (currently empty)
  constructor(private storeService: StoreService) {}

  // OnInit lifecycle hook (currently empty)
  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((response) => {
        this.categories = response;
      });
  }

  // Method to emit the selected category
  onShowCategory(category: string): void {
    // Emit the selected category
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
