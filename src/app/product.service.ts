import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('https://dummyjson.com/products?limit=50');
  }

  getUniqueCategories(products: any[]): string[] {
    return [...new Set(products.map(product => product.category))];
  }

  getPriceRange(products: any[]): { min: number, max: number } {
    const prices = products.map(product => product.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }
}
