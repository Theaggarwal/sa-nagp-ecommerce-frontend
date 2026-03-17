import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ElasticSearchResponse, SearchResult } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly url = environment.apis.elasticSearch;

  constructor(private readonly http: HttpClient) {}

  /**
   * Full-text search against ElasticSearch.
   * Matches across name (boosted 3x), brand, and description fields.
   * Falls back to match_all when the query is empty.
   */
  search(query: string, from = 0, size = 12): Observable<SearchResult> {
    const body = {
      from,
      size,
      query: query.trim()
        ? {
            multi_match: {
              query,
              fields: ['name^3', 'brand', 'description'],
              fuzziness: 'AUTO'
            }
          }
        : { match_all: {} }
    };

    return this.http.post<ElasticSearchResponse>(this.url, body).pipe(
      map(res => ({
        total:
          typeof res.hits.total === 'number'
            ? res.hits.total
            : (res.hits.total as { value: number }).value,
        hits: res.hits.hits.map(h => ({ ...h._source, id: h._source.id ?? h._id }))
      }))
    );
  }
}
