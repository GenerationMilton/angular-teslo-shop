import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';


const baseUrl = environment.baseUrl;

interface Options{
    limit?: number;
    offset?: number;
    gender?:string;
}


@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  //cache
  private productsCache = new Map<string,ProductsResponse>();
    //cache
  private productCache = new Map<string,Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    console.log(this.productsCache.entries());
    const key = `${limit}-${offset}-${gender}`;
    if(this.productsCache.has(key)){
      return of(this.productsCache.get(key)!);
    }


    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
        tap((resp) => this.productsCache.set(key, resp))
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {

    if(this.productCache.has(idSlug)){
      return of(this.productCache.get(idSlug)!);
    }
    return this.http
      .get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(
        delay(2000),
        tap((product)=> this.productCache.set(idSlug, product)));
    ;
  }
}