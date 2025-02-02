import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

export interface Category {
  CategoryId?: number;
  CategoryName: string;
  isEditing?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private apiUrl = 'http://localhost:10000/api/v1/category';

  // http=inject(HttpClient);
  constructor(private http : HttpClient ) { }

  
  getCategories(): Observable<Category[]> {
    return this.http.get<{ success: boolean, message: string, getCategory: Category[] }>(`${this.apiUrl}/get`).pipe(
      map(response => response.getCategory || []), // Extract categories or return empty array
      catchError(this.handleError<Category[]>('getCategories', [])) // Error handling
    );
  }

  // getCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(`${this.apiUrl}/getCategories`).pipe(
  //     tap(response => {
  //       console.log('API Response: ', response);  // Check the API response
  //     }),
  //     catchError(this.handleError('getCategories', [])) // Handle error with an empty array fallback
  //   );
  // }
  
  updateCategory(category: Category): Observable<Category> {
    const categoryId = category.CategoryId;
    return this.http.put<Category>(`${this.apiUrl}/update/${categoryId}`, category).pipe(
      tap(updatedCategory => console.log('Updated category:', updatedCategory)),
      catchError(this.handleError<Category>('updateCategory')) // Error handling
    );
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${categoryId}`).pipe(
      tap(response => {
        console.log(`Deleted category with ID: ${categoryId}`, response);
      }),
      catchError(this.handleError('deleteCategory'))
    );
  }
    
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/create`, category).pipe(
      tap(createdCategory => console.log('Created category:', createdCategory)), // Logs the created category
      catchError(this.handleError<Category>('createCategory')) // Handles errors if any
    );
  }
  
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: HttpErrorResponse): Observable<T> => {
  //     const message = (error.error instanceof ErrorEvent)
  //       ? error.error.message
  //       : `Server returned code ${error.status}, body was: ${error.error}`;
  
  //     // Log the error to the console
  //     console.error(`${operation} failed: ${message}`);
  
  //     // Let the app keep running by returning a safe result
  //     return of(result as T);  // Default result (void in case of delete)
  //   };
  // }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      // Check if the error is a client-side or network error
      let message = '';
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        message = error.error.message;
      } else {
        // Server-side error
        message = `Server returned code ${error.status}, body was: ${JSON.stringify(error.error)}`;
      }
  
      // Log the error in the console
      console.error(`${operation} failed: ${message}`);
  
      // Return a safe result (e.g., an empty array for GET operations)
      return of(result as T);
    };
  }
  
  

  // getCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(`${this.apiUrl}/get`).pipe(
  //     tap(categories => {
  //       console.log("Categories from server:", categories);
  //       console.log("Type of categories:", typeof categories);
  //     }),
  //     catchError(this.handleError<Category[]>('getCategories', []))
  //   );
  // }

  // updateCategory(category: Category): Observable<Category> {
  //   return this.http.put<Category>(`${this.apiUrl}/update/${category.CategoryId}`, category).pipe(
  //     tap(updatedCategory => console.log("Updated category:", updatedCategory)),
  //     catchError(this.handleError<Category>('updateCategory'))
  //   );
  // }

  // deleteCategory(categoryId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/delete/${categoryId}`).pipe(
  //     tap(() => console.log(`Deleted category with ID: ${categoryId}`)),
  //     catchError(this.handleError('deleteCategory'))
  //   );
  // }

  // createCategory(category: Category): Observable<Category> {
  //   return this.http.post<Category>(`${this.apiUrl}/create`, category).pipe(
  //     tap(createdCategory => console.log("Created category:", createdCategory)),
  //     catchError(this.handleError<Category>('createCategory'))
  //   );
  // }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: HttpErrorResponse): Observable<T> => {
  //     console.error(error);

  //     const message = (error.error instanceof ErrorEvent) ?
  //       error.error.message : `Server returned code ${error.status}, body was: ${error.error}`;

  //     console.log(`${operation} failed: ${message}`);

  //     return throwError(() => new Error(message));
  //   };
  // }
}
