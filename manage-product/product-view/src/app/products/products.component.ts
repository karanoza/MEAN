import { Component, OnInit } from "@angular/core";

import { ProductService } from "../product.service";
import { Product } from "../products-model";
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
  providers: [ProductService],
})
export class ProductsComponent implements OnInit {
  // products: Product[];
  products: any;
  product: Product;
  prodId: String;
  prodName: String;
  price: String;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      console.log("Product Component -> ngOnInit -> products", products);

      this.products = products;
    });
  }

  addProduct() {
    const newProduct = {
      prodId: this.prodId,
      prodName: this.prodName,
      price: this.price,
    };
    this.productService.addProduct(newProduct).subscribe((product) => {
      console.log(" addProduct -> product : ", product);
      this.products.push(product);
      this.productService
        .getProducts()
        .subscribe((products) => (this.products = products));
    });
  }
}
