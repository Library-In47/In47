import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  libros!: Product[];
  categories!: Category[];
  selectedCategory: number | null = null;
  test: string = '';

  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.productService.getAll().subscribe(libro => {
      this.libros = libro;
    });

    this.searchService.textObservable.subscribe(text => {
      this.productService.search(text).subscribe(libro => {
        this.libros = libro;
      });
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  filterByCategory(categoryId: number): void {
    this.selectedCategory = categoryId;
    this.productService.getAll().subscribe(libros => {
      this.libros = libros.filter(libro => libro.id_categoria === categoryId);
      if (this.libros.length === 0) {
        this.test = 'No se encontraron libros que coincidan con la búsqueda.';
      } else {
        this.test = '';
      }
    });
  }

  clearFilters(): void {
    this.selectedCategory = null;
    this.productService.getAll().subscribe(libros => {
      this.libros = libros;
      this.test = '';
    });
  }
}