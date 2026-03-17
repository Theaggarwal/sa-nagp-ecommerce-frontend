import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ApiMessage {
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly productUrl = environment.apis.productDetail;
  private readonly cartUrl = environment.apis.cart;
  private readonly wishlistUrl = environment.apis.wishlist;

  constructor(private readonly http: HttpClient) {}

  /** Fetch full product from Azure Container Apps backend */
  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }

  /** Add item to cart */
  addToCart(item: CartItem): Observable<ApiMessage> {
    return this.http.post<ApiMessage>(this.cartUrl, item);
  }

  /** Add product to wishlist */
  addToWishlist(productId: string): Observable<ApiMessage> {
    return this.http.post<ApiMessage>(this.wishlistUrl, { productId });
  }

  /** Remove product from wishlist */
  removeFromWishlist(productId: string): Observable<ApiMessage> {
    return this.http.delete<ApiMessage>(`${this.wishlistUrl}/${productId}`);
  }
}
