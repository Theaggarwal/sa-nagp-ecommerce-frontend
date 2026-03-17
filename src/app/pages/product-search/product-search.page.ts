import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { ProductSummary, SearchResult } from '../../core/models/product.model';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-product-search-page',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass, AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './product-search.page.html',
  styleUrl: './product-search.page.scss'
})
export class ProductSearchPage implements OnInit, OnDestroy {
  searchQuery = '';
  products: ProductSummary[] = [];
  total = 0;
  page = 0;
  readonly pageSize = 12;
  loading = false;
  error: string | null = null;

  private readonly searchTrigger$ = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly searchService: SearchService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.searchTrigger$
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        switchMap(query => {
          this.loading = true;
          this.error = null;
          this.page = 0;
          return this.searchService.search(query, 0, this.pageSize);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result: SearchResult) => {
          this.products = result.hits;
          this.total = result.total;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load products. Please try again.';
          this.loading = false;
        }
      });

    // Fetch initial product listing on page load
    this.searchTrigger$.next('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQueryChange(): void {
    this.searchTrigger$.next(this.searchQuery.trim());
  }

  loadPage(newPage: number): void {
    if (newPage < 0) return;
    this.page = newPage;
    this.loading = true;
    this.error = null;
    this.searchService
      .search(this.searchQuery.trim(), newPage * this.pageSize, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: SearchResult) => {
          this.products = result.hits;
          this.total = result.total;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load products. Please try again.';
          this.loading = false;
        }
      });
  }

  openDetail(id: string): void {
    this.router.navigate(['/product', id]);
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
