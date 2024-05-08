// header.component.ts
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounce, debounceTime, distinctUntilChanged, fromEvent, map, pipe, startWith } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput')
  inputSearch? : ElementRef
  
   constructor(private searchService: SearchService) { }

  ngAfterViewInit() {
    fromEvent<any>(this.inputSearch?.nativeElement, 'keyup')
    .pipe(map(event => event.target.value),
    startWith(''),
    debounceTime(400),
    distinctUntilChanged()
    ).subscribe(text => this.searchService.emitText(text))
  }

  ngOnInit(): void {
    this.searchService.textObservable.subscribe()

  }
  

  // search(): void {
  //   this.searchService.setSearchText(this.searchText);
  // }
}
