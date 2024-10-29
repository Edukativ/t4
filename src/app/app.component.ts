import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductService} from './product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  minPrice: number = 0;
  maxPrice: number = 1000;
  selectedCategory: string = '';
  searchTitle: string = '';
  selectedPrice: number = 500;
  selectedRating: number = 3;
  title: "AngularCLI" | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: any[]) => {
      this.products = products;
      this.filteredProducts = products;

      this.categories = this.productService.getUniqueCategories(products);

      const priceRange = this.productService.getPriceRange(products);
      this.minPrice = priceRange.min;
      this.maxPrice = priceRange.max;

      this.filterProducts();
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesTitle = product.name.toLowerCase().includes(this.searchTitle.toLowerCase());
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      const matchesPrice = product.price <= this.selectedPrice;
      const matchesRating = product.rating >= this.selectedRating;

      return matchesTitle && matchesCategory && matchesPrice && matchesRating;
    });
  }
}
