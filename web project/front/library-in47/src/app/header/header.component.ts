import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') inputSearch?: ElementRef;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.textObservable.subscribe();
  }

  ngAfterViewInit() {
    fromEvent<any>(this.inputSearch?.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        startWith(''),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(text => this.searchService.emitText(text));
  }
}