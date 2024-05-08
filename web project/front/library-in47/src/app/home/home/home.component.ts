import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  libros !: Product[];
  test: string = ''

  constructor(
    private productService:ProductService,
    private searchService: SearchService
  ){ }

  ngOnInit(): void {
    // this.productService.getAll().subscribe(
    //   libro => this.libros=libro
    //   );  
    this.searchService.textObservable.subscribe(text => 
      { this.productService.search(text).subscribe(
        libro => this.libros=libro
        );   });
  }
}
