// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  libros: Product[] = [];
  librosFiltrados: Product[] = [];
  searchText: string = '';
  private searchTextSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {
    this.searchTextSubscription = new Subscription(); // Inicialización en el constructor
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      libros => {
        this.libros = libros;
        this.filterBooks();
      }
    );

    this.searchTextSubscription = this.searchService.searchText$.subscribe(
      searchText => {
        this.searchText = searchText;
        this.filterBooks();
      }
    );
  }

  ngOnDestroy(): void {
    this.searchTextSubscription.unsubscribe();
  }

  filterBooks(): void {
    this.librosFiltrados = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(this.searchText.toLowerCase()) ||
      libro.subtitulo.toLowerCase().includes(this.searchText.toLowerCase()) ||
      libro.isbn.toLowerCase().includes(this.searchText.toLowerCase()) ||
      libro.resenia.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
