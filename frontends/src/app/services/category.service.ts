import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:10000/api/v1/category';

  // http=inject(HttpClient);
  constructor(private http : HttpClient ) { }

  // getCategories(){
  //   return this.http.get('http://localhost:10000/api/v1/category/get').pipe(
      
  //     map((response) => response.getCategory || [])
  //   );
  // }

  // getCategories(){
  //   return this.http.get<{ success: boolean, message: string, getCategory: any[] }>(`${this.apiUrl}/get`).pipe(
  //     map((response) => response.getCategory || [])  
  //   );
  // }

  getCategories(): Observable<any[]> {
    return this.http.get<{ success: boolean, message: string, getCategory: any[] }>(`${this.apiUrl}/get`).pipe(
      map((response) => response.getCategory || [])  
    );
  }

  updateCategory(category: any): Observable<any> {
    const categoryId = category.CategoryId; 
    return this.http.put<any>(`${this.apiUrl}/update/${categoryId}`, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${categoryId}`);
  }

}
