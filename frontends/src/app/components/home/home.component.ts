// import { Component, inject } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { Category, CategoryService } from '../../services/category.service';
// import { CommonModule } from '@angular/common';
// import { NgModule } from '@angular/core';

// import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
// import { HttpErrorResponse } from '@angular/common/http';
// import { catchError, Observable, of, tap } from 'rxjs';
// import { Product, ProductService } from '../../services/product.service';

// @Component({
//   selector: 'app-home',
//   imports: [MatButtonModule, CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent {
//   categories: Category[] = [];
//   showCreateCategoryForm = false;
//   newCategoryName = '';

//   createCategoryForm!: FormGroup;
//   editForm!: FormGroup;
//   products: Product[] = [];
//   constructor(private categoryService: CategoryService, private productService: ProductService, private fb: FormBuilder) {}

//   activeTab: 'category' | 'product' = 'category'; // Initialize to 'category'

// toggleTab(tabName: 'category' | 'product') {
//   this.activeTab = tabName;
// }

//   ngOnInit() {
//     this.fetchCategory();
//     this.createCategoryForm = this.fb.group({
//       CategoryName: ['', Validators.required]
//     });

//   }

//   fetchCategory(): void {
//     this.categoryService.getCategories().subscribe({
//       next: (result: any) => {
//         // Assuming result is an array of categories
//         this.categories = result.map((category: Category) => ({
//           ...category,
//           isEditing: false // Add 'isEditing' property to each category
//         }));
//         console.log('Fetched categories:', this.products); // Debugging log to check fetched categories
//       },
//       error: (error: any) => {
//         console.error('Error fetching categories:', error); // Log any error that occurs
//         // Optionally, show an error message to the user
//       }
//     });
//   }

//   fetchProduct(): void {
//     this.productService.getProducts().subscribe({
//       next: (result: any) => {
//         // Assuming result is an array of categories
//         this.categories = result.map((products: Product) => ({
//           ...products,
//           isEditing: false // Add 'isEditing' property to each category
//         }));
//         console.log('Fetched categories:', this.products); // Debugging log to check fetched categories
//       },
//       error: (error: any) => {
//         console.error('Error fetching categories:', error); // Log any error that occurs
//         // Optionally, show an error message to the user
//       }
//     });
//   }

//   toggleEditCategory(category: Category) {
//     category.isEditing = !category.isEditing;
//   }

//   saveCategory(category: Category) {
//     if (category.CategoryName && category.CategoryName !== '') {
//       this.categoryService.updateCategory(category).subscribe({
//         next: (response) => {
//           category.isEditing = false;
//           this.fetchCategory(); // Optionally re-fetch after update
//         },
//         error: (error) => {
//           console.error('Error updating category:', error);
//         }
//       });
//     }
//   }

//   deleteCategory(categoryId: number | undefined) {
//     if (categoryId === undefined) {
//       console.error('Category ID is undefined!');
//       return;
//     }

//     const confirmDelete = confirm('Are you sure you want to delete this category?');
//     if (confirmDelete) {
//       this.categoryService.deleteCategory(categoryId).subscribe({
//         next: (response) => {
//           this.fetchCategory(); // Re-fetch after deletion (optional)
//         },
//         error: (error) => {
//           console.error('Error deleting category:', error);
//         }
//       });
//     }
//   }

//   openCreateCategoryForm() {
//     this.showCreateCategoryForm = true;
//     this.newCategoryName = '';
//   }

//   createCategory() {
//     if (this.newCategoryName.trim()) {
//       const newCategory: Category = { CategoryName: this.newCategoryName };

//       this.categoryService.createCategory(newCategory).subscribe({
//         next: (createdCategory: Category) => {
//           // Add the new category to the local array
//           this.categories.push(createdCategory);
//           this.newCategoryName = ''; // Clear the input
//           this.showCreateCategoryForm = false; // Hide the create form
//         },
//         error: (error: HttpErrorResponse) => {
//           console.error('Error creating category:', error);
//           alert(error.message); // Display error message to the user
//         }
//       });
//     }
//   }

// }

import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Category, CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  categories: Category[] = [];
  showCreateCategoryForm = false;
  newCategoryName = '';

  createCategoryForm!: FormGroup;
  editForm!: FormGroup;
  isCreateProductFormVisible = false;
  newProduct: { ProductName: string, CategoryName: string } = { ProductName: '', CategoryName: '' };
  products: Product[] = [];
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  activeTab: 'category' | 'product' = 'category'; // Initialize to 'category'

  toggleTab(tabName: 'category' | 'product') {
    this.activeTab = tabName;
  }

  ngOnInit() {
    this.fetchCategory();
    this.fetchProduct(); // Fetch products on initialization
    this.createCategoryForm = this.fb.group({
      CategoryName: ['', Validators.required],
    });
  }

  fetchCategory(): void {
    this.categoryService.getCategories().subscribe({
      next: (result: any) => {
        // Ensure 'result' is an array before mapping
        this.categories = Array.isArray(result)
          ? result.map((category: Category) => ({
              ...category,
              isEditing: false, // Add 'isEditing' property to each category
            }))
          : [];
        console.log('Fetched categories:', this.categories); // Debugging log to check fetched categories
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error); // Log any error that occurs
      },
    });
  }

  fetchProduct(): void {
    this.productService.getProducts().subscribe({
      next: (result: any) => {
        console.log('API response:', result);  // Check the data being returned
        if (result.data && Array.isArray(result.data.products)) {
          this.products = result.data.products.map((product: Product) => ({
            ...product,
            isEditing: false,
            Category: this.categories.find(category => category.CategoryId === product.CategoryId)
          }));
          console.log('Fetched products:', this.products);  // Check if duplicates exist here
        } else {
          console.error('Error: products data is not an array or not found.');
          this.products = [];
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
  
  

  toggleEditCategory(category: Category) {
    category.isEditing = !category.isEditing;
  }

  toggleEditProduct(productId: number): void {
    const product = this.products.find((p) => p.ProductId === productId);
    if (product) {
      product.isEditing = !product.isEditing;
    }
  }

  isValidCategory(categoryId: number | undefined): boolean {
    if (categoryId === undefined) {
      return false; // Return false if categoryId is undefined
    }
    return this.categories.some(category => category.CategoryId === categoryId);
  }
  
  

  deleteProduct(productId: number) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmDelete) {
      this.productService.deleteProduct(productId).subscribe({
        next: (response) => {
          // Remove the deleted product from the local products array
          this.products = this.products.filter(
            (p) => p.ProductId !== productId
          );
          console.log('Product deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        },
      });
    }
  }

  saveCategory(category: Category) {
    if (category.CategoryName && category.CategoryName !== '') {
      this.categoryService.updateCategory(category).subscribe({
        next: (response) => {
          category.isEditing = false;
          this.fetchCategory(); // Optionally re-fetch after update
        },
        error: (error) => {
          console.error('Error updating category:', error);
        },
      });
    }
  }

  saveProduct(product: Product): void {
    // Check if the product name is valid and CategoryId is defined
    if (product.ProductName && product.ProductName !== '' && product.CategoryId !== undefined && this.isValidCategory(product.CategoryId)) {
      this.productService.updateProduct(product).subscribe({
        next: () => {
          product.isEditing = false; // Exit editing mode
          this.fetchProduct(); // Optionally re-fetch after update
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
    } else {
      console.error('Invalid data: Product Name or Category is not valid');
    }
  }
  

  deleteCategory(categoryId: number | undefined) {
    if (categoryId === undefined) {
      console.error('Category ID is undefined!');
      return;
    }

    const confirmDelete = confirm(
      'Are you sure you want to delete this category?'
    );
    if (confirmDelete) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: (response) => {
          this.fetchCategory(); // Re-fetch after deletion (optional)
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        },
      });
    }
  }

  openCreateCategoryForm() {
    this.showCreateCategoryForm = true;
    this.newCategoryName = '';
  }

  createCategory() {
    if (this.newCategoryName.trim()) {
      const newCategory: Category = { CategoryName: this.newCategoryName };

      this.categoryService.createCategory(newCategory).subscribe({
        next: (createdCategory: Category) => {
          // Add the new category to the local array
          this.categories.push(createdCategory);
          this.newCategoryName = ''; // Clear the input
          this.showCreateCategoryForm = false; // Hide the create form
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error creating category:', error);
          alert(error.message); // Display error message to the user
        },
      });
    }
  }

  openCreateProductForm(): void {
    this.isCreateProductFormVisible = true;
  }

  cancelCreateProduct(): void {
    this.isCreateProductFormVisible = false;
    this.newProduct = { ProductName: '', CategoryName: '' }; // Reset the form
  }

  isCategoryValid(categoryName: string): boolean {
    return this.categories.some(category => category.CategoryName === categoryName);
  }
  createProduct(): void {
    console.log('Before adding new product:', this.products);  // Log the current state of products
    if (this.isCategoryValid(this.newProduct.CategoryName)) {
      const newProductData = {
        ProductName: this.newProduct.ProductName,
        CategoryName: this.newProduct.CategoryName
      };
  
      this.productService.createProduct(newProductData).subscribe({
        next: (product) => {
          // Check if the product is already in the list
          const productExists = this.products.some(p => p.ProductId === product.ProductId);
          console.log('Product exists:', productExists);  // Debug if the product is found
          if (!productExists) {
            this.products.push(product);  // Only add it if it's not already there
          }
          console.log('After adding new product:', this.products);  // Log the new products list
          this.cancelCreateProduct(); // Hide the form after submission
        },
        error: (error) => {
          console.error('Error creating product:', error);
        }
      });
    } else {
      alert('Category is not valid! Please choose an existing category.');
    }
  }
  
  
  
}
