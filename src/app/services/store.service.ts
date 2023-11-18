import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

// Base URL of the store API
const STORE_BASE_URL = "https://fakestoreapi.com";

/**
 * Service to interact with the store's API.
 */
@Injectable({
  providedIn: "root", // This service is available in the root injector and can be injected anywhere in the app.
})
export class StoreService {
  /**
   * Constructor to inject HttpClient for making HTTP requests.
   * @param httpClient - The injected HttpClient for HTTP operations.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieves a list of products from the store API.
   * @param limit - The number of products to retrieve. Default is 12.
   * @param sort - The sorting order of products. Default is descending.
   * @returns An Observable of an array of Product objects.
   */
  getAllProducts(limit = "12", sort = "desc"): Observable<Array<Product>> {
    // Makes a GET request to the store API to fetch products with the specified limit and sorting order.
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`
    );
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    )
  }
}
