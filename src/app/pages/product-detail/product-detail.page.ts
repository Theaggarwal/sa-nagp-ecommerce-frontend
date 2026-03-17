import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [NgFor, NgIf, NgClass, CurrencyPipe, RouterLink],
  templateUrl: './product-detail.page.html',
  styleUrl: './product-detail.page.scss'
})
export class ProductDetailPage implements OnInit, OnDestroy {
  product: Product | null = null;
  loading = true;
  error: string | null = null;

  quantity = 1;
  activeImageIndex = 0;
  zoomed = false;
  favourite = false;
  cartSuccess: string | null = null;
  wishlistSuccess: string | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.loading = true;
          this.error = null;
          this.product = null;
          this.activeImageIndex = 0;
          this.zoomed = false;
          const id = params.get('id') ?? '';
          return this.productService.getById(id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: product => {
          this.product = product;
          this.loading = false;
        },
        error: () => {
          this.error = 'Could not load product. Please try again.';
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get activeImage(): string {
    return this.product?.images[this.activeImageIndex] ?? '';
  }

  selectImage(index: number): void {
    this.activeImageIndex = index;
    this.zoomed = false;
  }

  toggleZoom(): void {
    this.zoomed = !this.zoomed;
  }

  incrementQty(): void {
    this.quantity += 1;
  }

  decrementQty(): void {
    if (this.quantity > 1) this.quantity -= 1;
  }

  toggleFavourite(): void {
    if (!this.product) return;
    this.wishlistSuccess = null;

    if (this.favourite) {
      this.productService
        .removeFromWishlist(this.product.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: res => {
            this.favourite = false;
            this.wishlistSuccess = res.message ?? 'Removed from wishlist';
          },
          error: () => { this.wishlistSuccess = 'Wishlist update failed'; }
        });
    } else {
      this.productService
        .addToWishlist(this.product.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: res => {
            this.favourite = true;
            this.wishlistSuccess = res.message ?? 'Added to wishlist';
          },
          error: () => { this.wishlistSuccess = 'Wishlist update failed'; }
        });
    }
  }

  addToCart(): void {
    if (!this.product) return;
    this.cartSuccess = null;
    this.productService
      .addToCart({ productId: this.product.id, quantity: this.quantity })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => { this.cartSuccess = res.message ?? 'Added to cart!'; },
        error: () => { this.cartSuccess = 'Failed to add to cart'; }
      });
  }
}
