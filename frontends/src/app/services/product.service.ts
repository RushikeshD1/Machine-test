import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
export interface Category {
  CategoryId: number;
  CategoryName: string;
}
export interface Product {
  ProductId: number;
  CategoryId?: number;
  CategoryName: string;
  // ProductId?:number,
  ProductName: String;
  isEditing?: boolean;
  Category: Category;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:10000/api/v1/product'; // Your product API URL

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/get`).pipe(
      tap(products => console.log("Products from server:", products)),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }


  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${productId}`).pipe(
      tap(response => {
        console.log(`Deleted product with ID: ${productId}`, response);
      }),
      catchError(this.handleError('deleteProduct'))
    );
  }
  
  updateProduct(product: Product): Observable<Product> {
      const productId = product.ProductId;
      return this.http.put<Product>(`${this.apiUrl}/update/${productId}`, product).pipe(
        tap(updatedCategory => console.log('Updated Product:', updatedCategory)),
        catchError(this.handleError<Product>('updateProduct')));
    }

    // ProductService
createProduct(productData: { ProductName: string, CategoryName: string }): Observable<Product> {
  return this.http.post<Product>(`${this.apiUrl}/create`, productData).pipe(
    catchError(this.handleError<Product>('createProduct'))
  );
}


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message : `Server returned code ${error.status}, body was: ${error.error}`;
      console.log(`${operation} failed: ${message}`);
      return throwError(() => new Error(message));
    };
  }

}