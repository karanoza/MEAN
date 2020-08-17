import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "./products-model";
@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get("http://localhost:3000/api/products");
  }

  // . . . add Product . . .
  addProduct(newProduct) {
    return this.http.post("http://localhost:3000/api/product", newProduct);
  }

  // . . . delete method . . .
  deleteProduct(id) {
    return this.http.delete("http://localhost:3000/api/product/" + id);
  }
}
