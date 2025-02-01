import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [MatButtonModule,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
    
    categories: any = [];
    showCategorySection = true;

    // categoryService=inject(CategoryService)

    constructor(private categoryService: CategoryService) {}    

    ngOnInit(){
      this.fetchCategory()
    }

    fetchCategory(){
      this.categoryService.getCategories().subscribe((result : any) => {
        console.log(result)
        this.categories = result
      })
    }

    toggleEditCategory(category: any) {
      category.isEditing = !category.isEditing;
    }
  
    saveCategory(category: any) {
      if (category.CategoryName && category.CategoryName !== '') {
        this.categoryService.updateCategory(category).subscribe({
          next: (response) => {
            category.isEditing = false;
            this.fetchCategory(); // Refetch categories after successful update
          },
          error: (error) => {
            console.error('Error updating category:', error);            
          },
        });
      }
    }
  
    deleteCategory(categoryId: number) {
      const confirmDelete = confirm('Are you sure you want to delete this category?');
      if (confirmDelete) {
        this.categoryService.deleteCategory(categoryId).subscribe({
          next: (response) => {
            this.fetchCategory(); // Refetch categories after deletion
          },
          error: (error) => {
            console.error('Error deleting category:', error);
          },
        });
      }
    }
    


}
